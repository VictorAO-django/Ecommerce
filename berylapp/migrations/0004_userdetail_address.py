# Generated by Django 3.2.20 on 2023-07-03 00:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('berylapp', '0003_auto_20230703_0125'),
    ]

    operations = [
        migrations.AddField(
            model_name='userdetail',
            name='Address',
            field=models.TextField(default='yess',max_length=2000),
        ),
    ]
