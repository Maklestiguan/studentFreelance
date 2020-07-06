# Generated by Django 2.2.6 on 2020-07-06 15:58

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0016_auto_20200706_2254'),
    ]

    operations = [
        migrations.AlterField(
            model_name='freelancer',
            name='bio',
            field=models.TextField(blank=True, max_length=1000, validators=[django.core.validators.MaxLengthValidator(1000)]),
        ),
    ]
