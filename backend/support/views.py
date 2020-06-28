from django.conf import settings
from rest_framework import generics

from .models import SupportTicket
from .serializers import SupportTicketSerializer


class SupportTicketCreateView(generics.CreateAPIView):
    serializer_class = SupportTicketSerializer

    def perform_create(self, serializer):
        serializer.save()