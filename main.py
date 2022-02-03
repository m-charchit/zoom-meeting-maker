import requests
import jwt
import json
from time import time
from datetime import datetime, timedelta , timezone
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("API_KEY")
API_SECRET = os.getenv("API_SECRET")


def generateToken():
    token = jwt.encode(
        {'iss': API_KEY, 'exp': time() + 100000000},
        API_SECRET,
        algorithm='HS256'
    )
    return token


def listMeetings():
    headers = {'authorization': 'Bearer ' + generateToken(),
               'content-type': 'application/json'}
    r = requests.get(
        f'https://api.zoom.us/v2/users/me/meetings?type=upcoming',
        headers=headers)
    result = r.json()
    print(result)
    for i in result["meetings"]:
        meetingid = i["id"]
        r = requests.delete(
            f"https://api.zoom.us/v2/meetings/{meetingid}", headers=headers)


def createMeeting(start_time, cls):

    meetingdetails = {"topic": f"class {cls}",
                      "type": 2,
                      "start_time": start_time,
                      "duration": "40",
                      "timezone": "Asia/Calcutta",
                      "agenda": "Online classes",

                      "recurrence": {"type": 1,
                                     "repeat_interval": 1
                                     },
                      "settings": {"host_video": "False",
                                   "participant_video": "False",
                                   "join_before_host": "False",
                                   "mute_upon_entry": "true",
                                   "watermark": "true",
                                   "audio": "voip",
                                   "auto_recording": "cloud"
                                   }
                      }

    headers = {'authorization': 'Bearer ' + generateToken(),
               'content-type': 'application/json'}
    r = requests.post(
        f'https://api.zoom.us/v2/users/me/meetings',
        headers=headers, data=json.dumps(meetingdetails))
    result = r.json()
    print(result)
    message = f"""Suman Lata is inviting you to a scheduled Zoom meeting.

Topic: {result["topic"]}
Time: {(datetime.strptime(result["start_time"],"%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=timezone.utc).astimezone(tz=None).strftime("%I:%M %p, %d %b %G"))}

Join Zoom Meeting
{result["join_url"]}

Meeting ID: {result["join_url"][26:37]}
Passcode: {result["password"]}"""
    return message


def getMessage():
    startTime = str(datetime.now()+timedelta(days=1))[:10:]
    a = createMeeting(startTime + "T08:30:00", "10")
    b = createMeeting(startTime + "T09:30:00", "9")
    return a, b


if __name__ == '__main__':
    print(createMeeting(str(datetime.now()+timedelta(days=1))
          [:10:] + "T08:30:00", "10"))
