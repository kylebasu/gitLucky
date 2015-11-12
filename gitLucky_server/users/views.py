from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Yes, No
from .serializers import YesSerializer, NoSerializer
# Create your views here.


@api_view(['GET', 'POST'])
def no_list(request, the_user):
    if request.method == 'GET':
        yes = Yes.objects.filter(user__username=the_user)
        yeserializer = YesSerializer(yes, many=True)
        no = No.objects.filter(user__username=the_user)
        no_serializer = NoSerializer(no, many=True)
        holder = yeserializer.data
        temp = no_serializer.data
        holder.extend(temp)
        return Response(holder)

    if request.method == 'POST':
        no = No(issueId=request.data.issueId)
        no.save()
        try:
            user = User.objects.get(username=the_user)
        except User.DoesNotExist:
            user = User(username=the_user)
            user.save()
        no.user.add(user)


@api_view(['GET', 'POST'])
def yes_list(request, the_user):
    if request.method == 'GET':
        yes = Yes.objects.filter(user__username=the_user)
        serializer = YesSerializer(yes, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        yes = Yes(title=request.data.title, issue=request.data.issue, issueId=request.data.issueId)
        yes.save()
        try:
            user = User.objects.get(username=the_user)
        except User.DoesNotExist:
            user = User(username=the_user)
            user.save()
        yes.user.add(user)

