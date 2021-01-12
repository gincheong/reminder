import requests
import json
from datetime import datetime
from pathlib import Path

from .models import Task

BASE_DIR = Path(__file__).resolve(strict=True).parent.parent
BASE_URL = 'https://api.telegram.org/bot{}/sendMessage?chat_id={}&text={}'
MESSAGE_FORMAT = (
    "Reminder Alarm\n"
    "Title : {}\n"
    "Date : {}\n"
    "Alarm : {}\n"
    "Description : {}"
)

def get_send_message_url(text):
    with open(str(BASE_DIR) + '/api/secret_key.json') as f:
        json_file = json.loads(f.read())
        TOKEN = json_file['BOT_TOKEN']
        CHAT_ID = json_file['CHAT_ID']
    
    return BASE_URL.format(TOKEN, CHAT_ID, text)

def send_message(title, task_date, alarm, description):
    text = MESSAGE_FORMAT.format(title, task_date, str(alarm)[:16], description)
    url = get_send_message_url(text)

    response = requests.post(url)
    return response

def cron():
    current_time = datetime.now()
    current_time_str = str(current_time)[:16]

    queryset = Task.objects.all().exclude(alarm=None)
    for each in queryset:
        alarm_str = str(each.alarm)[:16]
        if alarm_str == current_time_str:
            res = send_message(each.title, each.task_date, each.alarm, each.description)
            print("[{}] ({}) {}".format(datetime.now(), res.status_code, each.id))
