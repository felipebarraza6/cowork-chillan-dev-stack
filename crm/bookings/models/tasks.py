"""Task Model."""

# Django
from django.db import models

# Utils
from crm.utils.models import ApiModel

class Task(ApiModel):

    user = models.ForeignKey("users.User", verbose_name=("task_user"), on_delete=models.CASCADE)

    date = models.DateTimeField()

    task = models.TextField(max_length=250)

    is_warning = models.BooleanField(
        'warning',
        default=False
    )

    is_notification = models.BooleanField(
        'notification',
        default=False
    )

    is_alert = models.BooleanField(
        'alert',
        default=False
    )

    def __str__(self):

        return ('{} {} {}').format(self.user, self.date, self.task)
