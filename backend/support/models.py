from django.db import models


class SupportTicket(models.Model):
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    description = models.CharField(max_length=255)

    def __str__(self):
        return self.email