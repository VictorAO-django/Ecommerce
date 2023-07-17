# Generated by Django 3.2.20 on 2023-07-17 07:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('registration', '0004_remove_userdetail_recently'),
    ]

    operations = [
        migrations.CreateModel(
            name='orders',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Username', models.CharField(blank=True, max_length=20)),
                ('items', models.TextField(max_length=500)),
                ('date', models.DateField(auto_now_add=True)),
                ('checkoutprice', models.IntegerField()),
                ('status', models.CharField(choices=[('S', 'Successfully delivered'), ('P', ' Delivery in progress'), ('F', 'Failed to process checkout')], max_length=35)),
                ('Address', models.TextField(blank=True, max_length=255)),
                ('History', models.TextField(blank=True)),
                ('Saved', models.TextField(blank=True)),
            ],
        ),
        migrations.AlterField(
            model_name='userdetail',
            name='Saved',
            field=models.TextField(blank=True),
        ),
    ]
