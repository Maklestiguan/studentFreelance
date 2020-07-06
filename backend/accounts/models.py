import stripe
from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from multiselectfield import MultiSelectField
from django.core.validators import MaxValueValidator, MinValueValidator, validate_image_file_extension, MaxLengthValidator
from upload_validator import FileTypeValidator
from choices import LANGUAGES, TIME_ZONES, TECHNOLOGIES, UNIVERSITIES, CITIES, GENDERS

stripe.api_key = settings.STRIPE_SECRET_KEY


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    photo = models.ImageField(default='profile_default.jpg', upload_to='profile_images')
    social_accounts = models.TextField(blank=True)
    time_zone = models.CharField(max_length=5, choices=TIME_ZONES, blank=True)
    languages = MultiSelectField(choices=LANGUAGES, blank=True)
    city = models.CharField(max_length=25, choices=CITIES, blank=True, default='Не указано')
    age = models.PositiveIntegerField(
        blank=True, null=True,
        validators=[
        MaxValueValidator(100),
        MinValueValidator(14)
        ]
    )
    gender = models.CharField(max_length=25, choices=GENDERS, blank=True, null=True, default='Не указано')
    university = models.CharField(max_length=25, choices=UNIVERSITIES, blank=True, default='Не указано')
    stripe_customer_id = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return f'{self.user} profile'


class Freelancer(models.Model):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)
    bio = models.TextField(
        blank=True,
        validators=[
        MaxLengthValidator(1000),
        ]
    )
    technologies = MultiSelectField(choices=TECHNOLOGIES, blank=True)
    cities = MultiSelectField(choices=CITIES, blank=True)
    univercities = MultiSelectField(choices=UNIVERSITIES, blank=True)
    hour_rate = models.CharField(max_length=50, blank=True, null=True, default='Не указано')
    stripe_account_id = models.CharField(max_length=50, blank=True, null=True)
    active = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.profile.user} freelancer'

    def __getFilteredFields__(self):
        result = []
        tech = []
        cts = []
        univ = []
        for t in self.technologies:
            tech.append(t)

        if tech:
            result.append(tech)
        else:
            result.append([])

        for c in self.cities:
            cts.append(c)

        if cts:
            result.append(cts)
        else:
            result.append([])

        for u in self.univercities:
            univ.append(u)

        if univ:
            result.append(univ)
        else:
            result.append([])

        return result
