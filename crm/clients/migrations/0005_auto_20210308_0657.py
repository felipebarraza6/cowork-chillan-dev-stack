# Generated by Django 3.1.5 on 2021-03-08 06:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clients', '0004_profilecertb'),
    ]

    operations = [
        migrations.AddField(
            model_name='profilecertb',
            name='access_financing',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AddField(
            model_name='profilecertb',
            name='accumulated_sales',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='profilecertb',
            name='branding_packaging',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AddField(
            model_name='profilecertb',
            name='certifications',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AddField(
            model_name='profilecertb',
            name='circular_economy_advice',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AddField(
            model_name='profilecertb',
            name='community_manager',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AddField(
            model_name='profilecertb',
            name='company_digitization',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AddField(
            model_name='profilecertb',
            name='constructions_infrastructure_qualification',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AddField(
            model_name='profilecertb',
            name='finance_accounting_consulting',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AddField(
            model_name='profilecertb',
            name='how_help_you',
            field=models.TextField(blank=True, max_length=400, null=True),
        ),
        migrations.AddField(
            model_name='profilecertb',
            name='impact_innovation_projects',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AddField(
            model_name='profilecertb',
            name='international_trade_advice',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AddField(
            model_name='profilecertb',
            name='legal_advice',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AddField(
            model_name='profilecertb',
            name='marketing_advice',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AddField(
            model_name='profilecertb',
            name='only_family_income',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='profilecertb',
            name='organizational_activities',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AddField(
            model_name='profilecertb',
            name='percentage_variation',
            field=models.FloatField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='profilecertb',
            name='purpose',
            field=models.TextField(default='asdasd', max_length=400),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='profilecertb',
            name='socio_environmental_benefits',
            field=models.TextField(blank=True, max_length=400, null=True),
        ),
        migrations.AddField(
            model_name='profilecertb',
            name='strategic_advice',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AddField(
            model_name='profilecertb',
            name='suppliers_commune',
            field=models.CharField(default='asdas', max_length=250),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='profilecertb',
            name='suppliers_province',
            field=models.CharField(default='asdasd', max_length=250),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='profilecertb',
            name='suppliers_region',
            field=models.CharField(default='asdasdas', max_length=250),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='profilecertb',
            name='territorial_sustainability_studies',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AddField(
            model_name='profilecertb',
            name='total_immigrants',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='profilecertb',
            name='total_woman',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='profilecertb',
            name='total_workers',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='profilecertb',
            name='uses_renewable_energy',
            field=models.CharField(default='false', max_length=250),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='profilecertb',
            name='values',
            field=models.TextField(default='asdasdsa', max_length=400),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='profilecertb',
            name='vat_payment',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='profilecertb',
            name='vision',
            field=models.TextField(default='asdasdsa', max_length=400),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='profilecertb',
            name='waste_management_plan',
            field=models.BooleanField(blank=True, default=False, null=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='profilecertb',
            name='waste_site',
            field=models.CharField(default='asdasd', max_length=250),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='profilecertb',
            name='weaknesses',
            field=models.TextField(blank=True, max_length=400, null=True),
        ),
    ]
