# Generated by Django 3.2.20 on 2023-07-17 09:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('registration', '0006_auto_20230717_0814'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userdetail',
            name='Address',
        ),
    ]
