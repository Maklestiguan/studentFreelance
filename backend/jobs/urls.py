from django.urls import path, re_path

from . import views


urlpatterns = [
    path('', views.JobListCreateView.as_view()),
    re_path(r'^(?P<disciplines>.+)/$', views.JobListCreateView.as_view()),
    path('support/', views.SupportTicketCreateView.as_view()),
    path('<int:pk>/', views.JobDetailEditDeleteView.as_view()),
    path('<int:pk>/apply-for-job/', views.ApplyForJobView.as_view()),
]
