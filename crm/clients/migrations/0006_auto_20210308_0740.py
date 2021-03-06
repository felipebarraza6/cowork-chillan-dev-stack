# Generated by Django 3.1.5 on 2021-03-08 07:40

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('clients', '0005_auto_20210308_0657'),
    ]

    operations = [
        migrations.CreateModel(
            name='AlternativeQuestionPoll',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, help_text='Date time on wich the object was created.', verbose_name='created at')),
                ('modified', models.DateTimeField(auto_now_add=True, help_text='Date time on wich the object was last modified.', verbose_name='modified at')),
                ('title', models.CharField(max_length=250)),
                ('has_score', models.BooleanField(default=False)),
                ('points', models.IntegerField(blank=True, default=0, null=True)),
            ],
            options={
                'ordering': ['-created', '-modified'],
                'get_latest_by': ('created',),
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='AnswerQuestionPoll',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, help_text='Date time on wich the object was created.', verbose_name='created at')),
                ('modified', models.DateTimeField(auto_now_add=True, help_text='Date time on wich the object was last modified.', verbose_name='modified at')),
                ('answer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='clients.alternativequestionpoll')),
            ],
            options={
                'ordering': ['-created', '-modified'],
                'get_latest_by': ('created',),
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Poll',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, help_text='Date time on wich the object was created.', verbose_name='created at')),
                ('modified', models.DateTimeField(auto_now_add=True, help_text='Date time on wich the object was last modified.', verbose_name='modified at')),
                ('title', models.CharField(max_length=120)),
                ('description', models.TextField(blank=True, max_length=250, null=True)),
            ],
            options={
                'ordering': ['-created', '-modified'],
                'get_latest_by': ('created',),
                'abstract': False,
            },
        ),
        migrations.AlterField(
            model_name='profilecertb',
            name='waste_management_plan',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='profilecertb',
            name='waste_site',
            field=models.TextField(max_length=250),
        ),
        migrations.CreateModel(
            name='QuestionPoll',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, help_text='Date time on wich the object was created.', verbose_name='created at')),
                ('modified', models.DateTimeField(auto_now_add=True, help_text='Date time on wich the object was last modified.', verbose_name='modified at')),
                ('title', models.CharField(max_length=250)),
                ('poll', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='clients.poll')),
            ],
            options={
                'ordering': ['-created', '-modified'],
                'get_latest_by': ('created',),
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ContestPoll',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, help_text='Date time on wich the object was created.', verbose_name='created at')),
                ('modified', models.DateTimeField(auto_now_add=True, help_text='Date time on wich the object was last modified.', verbose_name='modified at')),
                ('total_points', models.IntegerField(blank=True, default=0, null=True)),
                ('answers', models.ManyToManyField(related_name='answers_user', to='clients.AnswerQuestionPoll')),
                ('poll', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='clients.poll')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-created', '-modified'],
                'get_latest_by': ('created',),
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='answerquestionpoll',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='clients.questionpoll'),
        ),
        migrations.AddField(
            model_name='answerquestionpoll',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='alternativequestionpoll',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='clients.questionpoll'),
        ),
        migrations.AddField(
            model_name='profilecertb',
            name='satisfaction_test',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='clients.contestpoll'),
        ),
    ]
