# Generated by Django 3.1.7 on 2021-04-18 09:01

import api.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20210328_1147'),
    ]

    operations = [
        migrations.CreateModel(
            name='Audios',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=100, null=True)),
                ('audio', models.FileField(blank=True, null=True, upload_to=api.models.Audios.audio_upload_path)),
                ('file_type', models.CharField(blank=True, max_length=50, null=True)),
                ('file_extension', models.CharField(blank=True, max_length=50, null=True)),
                ('duration', models.CharField(blank=True, max_length=50, null=True)),
                ('atChild', models.ForeignKey(blank=True, default='', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='audios', to='api.antypicalchild')),
                ('session', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='audio', to='api.sessions')),
                ('tChild', models.ForeignKey(blank=True, default='', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='audios', to='api.typicalchild')),
            ],
        ),
    ]
