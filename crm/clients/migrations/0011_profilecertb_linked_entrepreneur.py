# Generated by Django 3.2.7 on 2021-09-08 23:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clients', '0010_auto_20210908_2258'),
    ]

    operations = [
        migrations.AddField(
            model_name='profilecertb',
            name='linked_entrepreneur',
            field=models.TextField(blank=True, max_length=800, null=True),
        ),
    ]
