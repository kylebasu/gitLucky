from django.db import models


class User(models.Model):
    username = models.CharField(max_length=50)

    def __unicode__(self):
        return self.username

    class Meta:
        ordering = ('username',)


class Yes(models.Model):
    title = models.CharField(max_length=100)
    issue = models.CharField(max_length=1000)
    issueId = models.IntegerField()
    user = models.ManyToManyField(User)

    def __unicode__(self):
        return u'%s %s %d' % (self.title, self.issue, self.issueId)

    class Meta:
        ordering = ('title', 'issue')

class No(models.Model):
    issueId = models.IntegerField()
    user = models.ManyToManyField(User)

    def __unicode__(self):
        return u'%s %d'% (self.user, self.issueId)
