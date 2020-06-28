import stripe
from django.conf import settings
from django.core.exceptions import PermissionDenied
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from .models import Job
from .permissions import IsOwnerOrReadOnly
from .serializers import JobSerializer

stripe.api_key = settings.STRIPE_SECRET_KEY


class JobListCreateView(generics.ListCreateAPIView):
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self,):
        jobs = Job.objects.filter(taken=False).order_by('-timestamp')
        disciplines = self.request.query_params.get('disciplines', None)
        # cities = self.request.query_params.get('cities', None)
        # univercities = self.request.query_params.get('univercities', None)

        results = []
        
        for job in jobs:
            if disciplines is not None:
                disciplines = disciplines.split('/')
                for entry in job.__str__().split(','):
                    if entry in disciplines:
                        results.append(job)
            else:
                return jobs
        
        return list(set(results))

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class JobDetailEditDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def put(self, request, *args, **kwargs):
        job = Job.objects.get(pk=self.kwargs['pk'])
        if job.freelancer:
            raise PermissionDenied
        else:
            return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        job = Job.objects.get(pk=self.kwargs['pk'])
        if job.freelancer:
            raise PermissionDenied
        else:
            return self.destroy(request, *args, **kwargs)


class ApplyForJobView(generics.RetrieveAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        job = Job.objects.get(pk=self.kwargs['pk'])

        if hasattr(user.profile, 'freelancer') and not user == job.freelancer:
            if user in job.applicants.all():
                job.applicants.remove(user)
            else:
                job.applicants.add(user)
            return self.retrieve(request, *args, **kwargs)
        raise PermissionDenied
