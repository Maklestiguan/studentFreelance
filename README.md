### Подготовка 
1) Установить node.js и npm
2) Установить python3 и pip3

### Развернуть фронт
3.1) В директории `/frontend` сделать `npm install`

3.2) В директории `/frontend` сделать `npm start`

### Развернуть бэк
Ошибки возникают в зависимости от установленной версии python

При правильно установке python3 первая команда работает в 100 из 100 случаев

4.1) В директории `/backend` сделать `pip3 install -r requirements.txt` либо при ошибке `pip install -r requirements.txt`

4.2) В директории `/backend` сделать `python3 manage.py migrate` либо при ошибке `python manage.py migrate` либо при ошибке `py manage.py migrate`

4.3) В директории `/backend` сделать `python3 manage.py runserver 127.0.0.1:8000` либо при ошибке `python manage.py runserver 127.0.0.1:8000` либо при ошибке `py manage.py runserver 127.0.0.1:8000`
