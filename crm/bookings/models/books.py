"""Books Model."""

# Django
from django.db import models

# Utils
from crm.utils.models import ApiModel

# Models
from .calendars import Calendar


class Book(ApiModel):

    client = models.ForeignKey("clients.Client", verbose_name=("book_client"), on_delete=models.CASCADE, blank=True, null=True)

    business = models.ForeignKey("clients.Business", verbose_name=("book_business"), on_delete=models.CASCADE, blank=True, null=True)

    calendar = models.ForeignKey("Calendar", verbose_name=("book_calendar"), on_delete=models.PROTECT)

    date_reservation = models.DateTimeField()

    date_out = models.DateTimeField()

    def date_reserved(self):
        return self.date_reservation

    def date_finish(self):
        return self.date_finish

    def __str__(self):
        if self.client:
            return ('Cliente:{} ').format(self.client)
        elif self.business:
            return ('Cliente:{} ').format(self.business)
        elif self.person:
            return ('Cliente:{} ').format(self.person)

    
