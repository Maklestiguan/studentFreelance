from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework import status
from rest_framework import views
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, ValidationError

from choices import LANGUAGES, TECHNOLOGIES, TIME_ZONES, CITIES, AGES, GENDERS, UNIVERSITIES
from jobs.models import Job
from jobs.permissions import IsOwnerOrReadOnly, IsOwner
from .models import Profile, Freelancer
from .serializers import UserSerializer, ProfileSerializer

class UserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class ProfileView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsOwnerOrReadOnly, IsAuthenticatedOrReadOnly]

    def put(self, request, *args, **kwargs):
        data = request.data
        if data.get('photo').size > 5242880:
            raise ValidationError("This file's size is more than 5mb")
        if not str(data.get('photo')).endswith(('.png', '.jpg', '.jpeg')):
            raise ValidationError("Unallowed content type")
        user = request.user
        # user.username = user.username
        user.email = data.get('email', user.email)
        user.first_name = data.get('first_name', user.first_name)
        user.last_name = data.get('last_name', user.last_name)
        user.save()

        profile = user.profile
        profile.photo = data.get('photo', profile.photo)
        if len(data.get('social_accounts', profile.social_accounts)) > 100:
            raise ValidationError("No more than 100 characters")
        profile.social_accounts = data.get('social_accounts', profile.social_accounts)
        profile.time_zone = data.get('time_zone', profile.time_zone)
        profile.languages = data.get('languages', profile.languages)
        # profile.city = data.get('city', profile.city)
        # profile.age = data.get('age', profile.age)
        profile.gender = data.get('gender', profile.gender)
        profile.save()

        if hasattr(profile, 'freelancer'):
            if len(data.get('bio', profile.freelancer.bio)) > 1000:
                raise ValidationError("No more than 1000 characters")
            profile.freelancer.bio = data.get('bio', profile.freelancer.bio)
            profile.freelancer.technologies = data.get('technologies', profile.freelancer.technologies)
            profile.freelancer.cities = data.get('cities', profile.freelancer.cities)
            profile.freelancer.univercities = data.get('univercities', profile.freelancer.univercities)
            if len(data.get('hour_rate')) > 15:
                raise ValidationError("No more than 15 characters")
            profile.freelancer.hour_rate = data.get('hour_rate', profile.freelancer.hour_rate)
            profile.freelancer.save()

        return Response(ProfileSerializer(profile, context=self.get_serializer_context()).data, status.HTTP_200_OK)


class FreelancerListView(generics.ListAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        profiles = Profile.objects.filter(freelancer__isnull=False)
        disciplines = self.request.query_params.get('disciplines', None)
        cities = self.request.query_params.get('cities', None)
        univercities = self.request.query_params.get('univercities', None)


        if disciplines is None and cities is None and univercities is None:
            return profiles
        else:
            results = []
            for profile in profiles:
                fields = profile.freelancer.__getFilteredFields__()
                to_be_added = True

                if disciplines is not None:
                    if not any(d in fields[0] for d in disciplines.split('/')):
                        to_be_added = False

                if cities is not None and to_be_added:
                    if not any(c in fields[1] for c in cities.split('/')):
                        to_be_added = False

                if univercities is not None and to_be_added:
                    if not any(u in fields[2] for u in univercities.split('/')):
                        to_be_added = False

                if to_be_added:
                    results.append(profile)

            return list(set(results))


class BecomeFreelancerView(generics.GenericAPIView):
    permission_classes = [IsOwner]

    def post(self, request, *args, **kwargs):
        pk = self.request.user.id
        profile = Profile.objects.get(pk=pk)
        Freelancer.objects.create(profile=profile, **request.data)

        # without context image url doesn't have domain name since serializer needs access to request object
        # https://www.django-rest-framework.org/api-guide/serializers/#including-extra-context
        return Response(ProfileSerializer(profile, context=self.get_serializer_context()).data)


class UnbecomeFreelancerView(generics.GenericAPIView):
    permission_classes = [IsOwner]

    def get(self, request, *args, **kwargs):
        pk = self.request.user.id
        profile = Profile.objects.get(pk=pk)
        profile.freelancer.delete()

        return Response(ProfileSerializer(profile, context=self.get_serializer_context()).data, status.HTTP_200_OK)


class HireFreelancerView(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = User.objects.get(id=self.kwargs['pk'])
        job = Job.objects.get(pk=self.kwargs['id'])

        if user == job.freelancer:
            job.freelancer = None
            job.taken = False
            job.save()
        else:
            job.freelancer = user
            job.taken = True
            job.save()
        return self.retrieve(request, *args, **kwargs)


class LanguageListView(views.APIView):
    def get(self, request, *args, **kwargs):
        return Response(LANGUAGES, status.HTTP_200_OK)


class TechnologyListView(views.APIView):
    def get(self, request, *args, **kwargs):
        return Response(TECHNOLOGIES, status.HTTP_200_OK)


class TimeZoneListView(views.APIView):
    def get(self, request, *args, **kwargs):
        return Response(TIME_ZONES, status.HTTP_200_OK)


class CitiesListView(views.APIView):
    def get(self, request, *args, **kwargs):
        return Response(CITIES, status.HTTP_200_OK)


class GendersListView(views.APIView):
    def get(self, request, *args, **kwargs):
        return Response(GENDERS, status.HTTP_200_OK)


class UnivercitiesListView(views.APIView):
    def get(self, request, *args, **kwargs):
        return Response(UNIVERSITIES, status.HTTP_200_OK)
