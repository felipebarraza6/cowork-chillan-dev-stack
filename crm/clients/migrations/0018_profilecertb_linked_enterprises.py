# Generated by Django 3.2.8 on 2021-11-15 14:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clients', '0017_auto_20211109_1430'),
    ]

    operations = [
        migrations.AddField(
            model_name='profilecertb',
            name='linked_enterprises',
            field=models.JSONField(blank=True, null=True),
        ),
    ]
