# Generated by Django 3.1.5 on 2021-02-11 04:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('services', '0001_initial'),
        ('bookings', '0001_initial'),
        ('clients', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='task_user'),
        ),
        migrations.AddField(
            model_name='calendar',
            name='service',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='services.service', verbose_name='calendar_service'),
        ),
        migrations.AddField(
            model_name='book',
            name='business',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='clients.business', verbose_name='book_business'),
        ),
        migrations.AddField(
            model_name='book',
            name='calendar',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='bookings.calendar', verbose_name='book_calendar'),
        ),
        migrations.AddField(
            model_name='book',
            name='client',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='clients.client', verbose_name='book_client'),
        ),
    ]
