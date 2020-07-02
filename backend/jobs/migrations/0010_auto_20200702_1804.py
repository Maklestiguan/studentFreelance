# Generated by Django 2.2.6 on 2020-07-02 18:04

from django.db import migrations
import multiselectfield.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0009_delete_supportticket'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='cities',
            field=multiselectfield.db.fields.MultiSelectField(blank=True, choices=[('Moscow', 'Москва'), ('SaintPetersburg', 'Санкт-Петербург'), ('Novosibirsk', 'Новосибирск'), ('Tomsk', 'Томск'), ('Tumen', 'Тюмень'), ('Barnaul', 'Барнаул'), ('Kemerovo', 'Кемерово'), ('Novokuznetsk', 'Новокузнецк'), ('Omsk', 'Омск')], max_length=81),
        ),
        migrations.AddField(
            model_name='job',
            name='universities',
            field=multiselectfield.db.fields.MultiSelectField(blank=True, choices=[('Tomsk GU', 'Томский ГУ'), ('Tomsk USUR', 'ТУСУР'), ('Tomsk PT', 'Томский Политехнический'), ('Tomsk GASU', 'ТГАСУ'), ('Tomsk GPU', 'ТГПУ'), ('Nsk GU', 'Новосибирский ГУ')], max_length=56),
        ),
        migrations.AlterField(
            model_name='job',
            name='technologies',
            field=multiselectfield.db.fields.MultiSelectField(blank=True, choices=[('physics', 'Физика'), ('math', 'Мат. анализ'), ('prog', 'Программирование'), ('manage', 'Менеджмент'), ('rights', 'Право')], max_length=31),
        ),
    ]
