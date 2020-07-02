# Generated by Django 2.2.6 on 2020-07-02 18:04

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('support', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='supportticket',
            name='description',
            field=models.TextField(blank=True, validators=[django.core.validators.MaxLengthValidator(1000)]),
        ),
    ]