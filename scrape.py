from typing import Text
from bs4 import BeautifulSoup
import requests

link = requests.get("http://catalogue.uci.edu/donaldbrenschoolofinformationandcomputersciences/departmentofstatistics/datascience_bs/#requirementstext").text
soup = BeautifulSoup(link, "lxml")

main = soup.find("table", class_='sc_courselist')

for elem in main.find_all('td', class_='codecol'):
    all_courses = elem.find_all('a')
    for each in all_courses:
        print(each.text)
