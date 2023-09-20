# Generated by Django 3.2.16 on 2023-09-20 18:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('registration', '0013_orders_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='orders',
            name='phone_number',
            field=models.CharField(default='07063475466', max_length=14),
        ),
        migrations.AlterField(
            model_name='orders',
            name='status',
            field=models.CharField(choices=[('S', 'Successfully delivered'), ('P', ' Delivery in progress'), ('F', 'Failed to process checkout')], default='P', max_length=35),
        ),
    ]
