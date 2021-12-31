from bs4 import BeautifulSoup
import requests
from major_requirements import request_websites, scrape_courses
from collections import namedtuple

Course_Info = namedtuple('Course', ['name', 'units', 'description'])

def get_courses_websites():
    """
    get_courses_websites scrapes all of the websites that can be redirected from the main UCI
    course website. 
    """

    all_websites = []
    soup = request_websites("http://catalogue.uci.edu/allcourses/")
    for elem in soup.find_all('a'):
        get_href = elem.get('href')
        if '/allcourses' in str(get_href):
            all_websites.append('http://catalogue.uci.edu' + get_href)
    return all_websites[1:]


def get_courses(url):
    """
    get_courses takes in each invidiual website and scrape all courses provided in the url
    and their information (course id, course name, units, description, restriction, and prereq).
    All the information is organized in a dictionary: id: namedtuple(info).
    """

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
        course_dict[name[0].replace("\u00a0", " ")] = c_info
    return course_dict


def write_to_out(url, one_course):
    """
    write_to_out takes in the provided dictionary (containing info of each course section) and
    write it out in a .out function - all info separated by ";".
    """

    filename = str(url.split('/')[-2])
    with open('data/'+ filename + '.out', 'w') as f:
        for key, value in one_course.items():
            f.write(key + ';' + value.name + ';' + value.units + ';' + value.description + '\n')

