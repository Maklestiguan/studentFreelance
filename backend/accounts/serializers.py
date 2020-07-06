from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Profile, Freelancer


class UserSerializer(serializers.ModelSerializer):
    is_freelancer = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'is_freelancer')

    def get_is_freelancer(self, obj):
        return hasattr(obj.profile, 'freelancer')


# since JobSerializer uses UserSerializer then JobSerializer should be imported after UserSerializer definition
from jobs.serializers import JobSerializer


class FreelancerSerializer(serializers.ModelSerializer):
    technologies_display = serializers.CharField(source='get_technologies_display', required=False)
    univercities_display = serializers.CharField(source='get_univercities_display', required=False)
    cities_display = serializers.CharField(source='get_cities_display', required=False)
    
    class Meta:
        model = Freelancer
        fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    freelancer = FreelancerSerializer()
    time_zone_display = serializers.CharField(source='get_time_zone_display', required=False)
    languages_display = serializers.CharField(source='get_languages_display')
    technologies_display = serializers.CharField(source='get_technologies_display', required=False)
    univercities_display = serializers.CharField(source='get_univercities_display', required=False)
    cities_display = serializers.CharField(source='get_cities_display', required=False)
    # city_display = serializers.CharField(source='get_city_display', required=False)
    age_display = serializers.CharField(source='get_age_display', required=False)
    gender_display = serializers.CharField(source='get_gender_display', required=False)
    # univercity_display = serializers.CharField(source='get_univercity_display', required=False)
    job_requests = serializers.SerializerMethodField()
    taken_jobs = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        exclude = ['stripe_customer_id']

    def get_job_requests(self, obj):
        return JobSerializer(obj.user.job_set.all(), many=True).data

    def get_taken_jobs(self, obj):
        return JobSerializer(obj.user.jobs.all(), many=True).data
