# Generated by Django 3.2.8 on 2021-11-15 15:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clients', '0018_profilecertb_linked_enterprises'),
    ]

    operations = [
        migrations.AddField(
            model_name='profilecertb',
            name='cowork_provider',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='profilecertb',
            name='you_have_certification',
            field=models.TextField(blank=True, max_length=800, null=True),
        ),
    ]
