from rest_framework import serializers
from users.models import User, Yes, No


class UserSerializer(serializers.Serializer):
    pk = serializers.IntegerField(read_only=True)
    username = serializers.CharField(required=True, max_length=50)

    def create(self, validated_data):
        return User.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        return instance

class YesSerializer(serializers.Serializer):
    pk = serializers.IntegerField(read_only=True)
    title = serializers.CharField(required=True, max_length=100)
    issue = serializers.CharField(required=True, max_length=1000)
    issueId = serializers.IntegerField(required=True)

    def create(self, validated_data):
        return Yes.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.issue = validated_data('issue', instance.issue)
        instance.issueId = validated_data('issueId', instance.issueId)
        return instance

class NoSerializer(serializers.Serializer):
    pk = serializers.IntegerField(read_only=True)
    issueId = serializers.IntegerField(required=True)

    def create(self, validated_data):
        return No.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.issueId = validated_data.get('issueId', instance.issueId)
        return instance
