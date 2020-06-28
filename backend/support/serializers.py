from rest_framework import fields, serializers
from .models import SupportTicket


class SupportTicketSerializer(serializers.ModelSerializer):

    class Meta:
        model = SupportTicket
        fields = '__all__'