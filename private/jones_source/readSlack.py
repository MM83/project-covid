import datetime
import json
import os

general = {
    'dir': 'general',
    'startDate': {
        'm': 3,
        'd': 18 
    },
    'endDate': {
        'm': 4,
        'd': 23
    }
}
switch = {
    'dir': 'nintendoswitch',
    'startDate': {
        'm': 3,
        'd': 23 
    },
    'endDate': {
        'm': 4,
        'd': 22
    }
}
logic = {
    'dir': 'rubylogic',
    'startDate': {
        'm': 4,
        'd': 6 
    },
    'endDate': {
        'm': 4,
        'd': 9
    }
}
sound = {
    'dir': 'soundmachine',
    'startDate': {
        'm': 4,
        'd': 6 
    },
    'endDate': {
        'm': 4,
        'd': 22
    }
}
channels = [general, switch, logic, sound]
jonesUid = "U010BK8CEF8"

for channel in channels:
    startDate = datetime.datetime(2020, channel['startDate']['m'], channel['startDate']['d'])
    endDate = datetime.datetime(2020, channel['endDate']['m'], channel['endDate']['d'])

    while startDate < endDate:
        filename = f"{channel['dir']}/{startDate.strftime('%Y-%m-%d')}.json"
        if os.path.isfile(filename):
            with open(filename) as file:
                data = json.load(file)

            for message in data:
                if message['user'] == jonesUid and message['type'] == "message" and message['text']:
                    if 'blocks' in message:
                        for block in message['blocks']:
                            for parent in block['elements']:
                                for child in parent['elements']:
                                    if child['type'] == "text":
                                        print(child['text'])
                                        print()
            
        startDate += datetime.timedelta(days=1)

