from  django.db import models
from crm.utils.models import ApiModel

class Task(ApiModel):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='task_user')
    operator = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='task_operator')

    message = models.TextField(max_length=600, blank=True, null=True)
    response = models.TextField(max_length=600, blank=True, null=True)
    reference = models.CharField(max_length=200, blank=True, null=True)

    payment = models.ForeignKey('memberships.Payment', on_delete=models.CASCADE, blank=True, null=True, related_name='task_payment')
    membership = models.ForeignKey('memberships.Membership', on_delete=models.CASCADE, blank=True, null=True, related_name='task_membership')
    person = models.ForeignKey('clients.Client', on_delete=models.CASCADE, blank=True, null=True, related_name='task_client')
    business = models.ForeignKey('clients.Business', on_delete=models.CASCADE, blank= True, null=True, related_name='task_business')

    is_active = models.BooleanField(default=True)
    is_response = models.BooleanField(default=False)
    is_finish = models.BooleanField(default=False)


    def __str__(self):
        return str(self.user)
    

