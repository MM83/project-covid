import json

basename = 'message_'

for i in range(1, 24):
    with open(f"{basename}{i}.json") as file:
        data = json.load(file)

    messages = data['messages']
    messages.reverse()

    for message in messages:
        if message['sender_name'] == "Chris Jones":
            if 'share' not in message and 'photos' not in message and 'content' in message:
                print(message['content'])
                print()