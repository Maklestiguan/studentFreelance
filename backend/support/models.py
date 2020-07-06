from django.db import models
from django.core.validators import MaxLengthValidator


class SupportTicket(models.Model):
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    description = models.TextField(
        max_length=1000,
        blank=True,
        validators=[
        MaxLengthValidator(1000),
        ]
    )

    def __str__(self):
        return self.email