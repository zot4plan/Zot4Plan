import json 

file_names = ["../data/Film_and_Media_Studies_B.A.json"]
for elem in file_names: 
    with open(elem, 'r') as f: 
        data = json.load(f)
        print(data)
