# Generated by Django 3.2.8 on 2021-11-09 14:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clients', '0016_rename_nombre_servicerequests_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='business',
            name='fantasy_name',
            field=models.CharField(blank=True, max_length=120, null=True),
        ),
        migrations.AddField(
            model_name='client',
            name='fantasy_name',
            field=models.CharField(blank=True, max_length=120, null=True),
        ),
    ]
