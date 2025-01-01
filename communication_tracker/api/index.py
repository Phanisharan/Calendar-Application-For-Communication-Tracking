import os
from django.core.wsgi import get_wsgi_application

# Set the settings module for the Django application
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'communication_tracker.settings')

# Get the Django WSGI application
app = get_wsgi_application()
