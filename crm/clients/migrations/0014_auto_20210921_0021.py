# Generated by Django 3.2.7 on 2021-09-21 00:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clients', '0013_auto_20210920_1404'),
    ]

    operations = [
        migrations.AddField(
            model_name='servicerequests',
            name='email',
            field=models.TextField(blank=True, max_length=1800, null=True),
        ),
        migrations.AddField(
            model_name='servicerequests',
            name='nombre',
            field=models.TextField(blank=True, max_length=1800, null=True),
        ),
        migrations.AddField(
            model_name='servicerequests',
            name='phone',
            field=models.TextField(blank=True, max_length=1800, null=True),
        ),
        migrations.AddField(
            model_name='servicerequests',
            name='username',
            field=models.TextField(blank=True, max_length=1800, null=True),
        ),
    ]
