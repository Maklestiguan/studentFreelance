# Generated by Django 2.2.6 on 2020-06-11 19:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_freelancer_active'),
    ]

    operations = [
        migrations.AddField(
            model_name='freelancer',
            name='hour_rate',
            field=models.CharField(blank=True, default='Не указано', max_length=50, null=True),
        ),
    ]
