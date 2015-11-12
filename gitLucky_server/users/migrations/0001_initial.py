# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='No',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('issueId', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('username', models.CharField(max_length=50)),
            ],
            options={
                'ordering': ('username',),
            },
        ),
        migrations.CreateModel(
            name='Yes',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=100)),
                ('issue', models.CharField(max_length=1000)),
                ('issueId', models.IntegerField()),
                ('user', models.ManyToManyField(to='users.User')),
            ],
            options={
                'ordering': ('title', 'issue'),
            },
        ),
        migrations.AddField(
            model_name='no',
            name='user',
            field=models.ManyToManyField(to='users.User'),
        ),
    ]
