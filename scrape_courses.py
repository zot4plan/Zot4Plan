from bs4 import BeautifulSoup
import requests
from major_requirements import request_websites, scrape_courses
from collections import namedtuple

Course_Info = namedtuple('Course', ['name', 'units', 'description'])

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
        description = '' 
        name = elem.find('p', class_='courseblocktitle').text.split('.  ')
        testing = elem.find('div', class_='courseblockdesc')
        get_info = testing.find_all('p')
        for each in get_info:
            description += each.text + ';'
        c_info = Course_Info(name[1], (name[2].split(' ')[0]), description)
        course_dict[name[0]] = c_info
    return course_dict

def write_to_csv(url, one_course):
    filename = str(url.split('/')[-2])
    with open('data/'+filename + '.out', 'w') as f:
        for key, value in one_course.items():
            f.write(key + ';' + value.name + ';' + value.units + ';' + value.description + '\n')


if __name__ == "__main__":
    websites = get_courses_websites()
    one_course = get_courses(websites[73])
    write_to_csv(websites[73], one_course)
