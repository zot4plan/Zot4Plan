from bs4 import BeautifulSoup
import requests
from major_requirements import request_websites, scrape_courses
from collections import namedtuple
import csv

Course_Info = namedtuple('Course', ['name', 'units'])

def get_courses_websites():

    all_websites = []
    soup = request_websites("http://catalogue.uci.edu/allcourses/")
    for elem in soup.find_all('a'):
        get_href = elem.get('href')
        if '/allcourses' in str(get_href):
            all_websites.append('http://catalogue.uci.edu' + get_href)
    return all_websites[1:]

def get_courses(url):
    course_dict = {}
    soup = request_websites(url)
    for elem in soup.find_all('div', class_='courseblock'):
        name = elem.find('p', class_='courseblocktitle').text.split('.  ')
        c_info = Course_Info(name[1], (name[2].split(' ')[0]))
        course_dict[name[0]] = c_info
    return course_dict

def write_to_csv(url, one_course):
    filename = str(url.split('/')[-2])
    with open(filename + '.csv', 'w') as f:
        for key, value in one_course.items():
            f.write(key + ',' + value.name + ',' + value.units + '\n')

if __name__ == "__main__":
    websites = get_courses_websites()
    uci_courses = get_courses(websites[0])
    write_to_csv(websites[0], uci_courses)
