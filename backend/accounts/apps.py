from django.apps import AppConfig


class AccountsConfig(AppConfig):
    name = 'accounts'

    def ready(self):
        print("am rady, importing signals...")
        import accounts.signals
