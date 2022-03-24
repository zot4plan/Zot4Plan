import json 

file_names = ["../data/Business_Information_Management_B.S.json"]
for elem in file_names: 
    with open(elem, 'r') as f: 
        data = json.load(f)
        print(data)
