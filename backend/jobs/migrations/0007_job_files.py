# Generated by Django 2.2.6 on 2020-06-26 14:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0006_supportticket'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='files',
            field=models.FileField(blank=True, upload_to=''),
        ),
    ]
