# Generated by Django 2.2.6 on 2020-07-06 15:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0015_auto_20200706_2126'),
    ]

    operations = [
        migrations.AlterField(
            model_name='freelancer',
            name='hour_rate',
            field=models.CharField(blank=True, default='0', max_length=50, null=True),
        ),
    ]
