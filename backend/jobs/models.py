from django.contrib.auth import get_user_model
from django.db import models
from multiselectfield import MultiSelectField

from choices import TECHNOLOGIES, CITIES, UNIVERSITIES

User = get_user_model()


class Job(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    applicants = models.ManyToManyField(User, related_name='applications', blank=True)
    freelancer = models.ForeignKey(User, related_name='jobs', blank=True, null=True, on_delete=models.SET_NULL)
    summary = models.CharField(max_length=50)
    details = models.TextField()
    technologies = MultiSelectField(choices=TECHNOLOGIES)
    cities = MultiSelectField(choices=CITIES, blank=True)
    universities = MultiSelectField(choices=UNIVERSITIES, blank=True)
    deadline = models.DateField()
    budget = models.PositiveIntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)
    taken = models.BooleanField(default=False)
    done = models.BooleanField(default=False)
    files = models.FileField(blank=True, upload_to='documents/%Y/%m/%d/')

    def __str__(self):
        return self.summary
    
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

        for u in self.universities:
            univ.append(u)

        if univ:
            result.append(univ)
        else:
            result.append([])

        return result