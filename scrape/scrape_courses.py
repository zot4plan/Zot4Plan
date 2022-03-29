from bs4 import BeautifulSoup
import requests
from major_requirements import request_websites, scrape_courses
from collections import namedtuple

Course_Info = namedtuple('Course', ['name', 'department', 'units', 'description','prerequisite', 'corequisite', 'repeatability', 'restriction', 'ge_string', 'ge_list'])

def get_courses_websites():
    """
    get_courses_websites scrapes all of the websites that can be redirected from the main UCI
    course website. 
    """

    all_websites = set()
    soup = request_websites("http://catalogue.uci.edu/allcourses/")
    for elem in soup.find_all('a'):
        get_href = elem.get('href')
        if '/allcourses' in str(get_href):
            all_websites.add('http://catalogue.uci.edu' + get_href)

    all_websites = [elem for elem in all_websites]
    return sorted(all_websites)[1:]


def get_courses(url):
    """
    get_courses takes in each invidiual website and scrape all courses provided in the url
    and their information (course id, course name, units, description, restriction, and prereq).
    All the information is organized in a dictionary: id: namedtuple(info).
    """
    course_dict = {}
    soup = request_websites(url)
    for elem in soup.find_all('div', class_='courseblock'):
        name = elem.find('p', class_='courseblocktitle').text.split('.  ')
        testing = elem.find('div', class_='courseblockdesc')
        get_info = testing.find_all('p')
        ge_tag, restrict, prereq, description, repeat, co_course = '', '', '', '', '1', ''
        ge_list = []
        for x in range(len(get_info)):
            info = get_info[x].text
            ge = get_info[x].find('strong')
            if x == 0:
                description = info.replace('"', "'")
            elif 'Restriction:' in info:
                restrict = info.replace('"', "'").replace('Restriction:', '')
            elif 'Prerequisite:' in info:
                prereq = info.replace('\n', '').replace('"', "'").replace('Prerequisite:','').replace('\xa0ENG\xa0', ' ')
            elif 'Corequisite:' in info:
                co_course = info.replace('\n', '').replace('"', "'").replace('Corequisite:','')
            elif 'Repeatability:' in info:
                if 'Unlimited' in info or 'unlimited' in info:
                    repeat = '9'
                else:
                    repeat = info.split(' ')
                    for elem in repeat:
                        if elem.isdigit():
                            repeat = elem
            if ge is not None:
                ge_tag = ge.text.replace('.', '').upper()
                in_list = ge_tag.replace(',', '').replace(')', '').replace('(', '').replace(')', '').replace('AND', '').replace('OR', '').replace('GE', '').split(' ')
                ge_list = [elem.strip() for elem in in_list if elem != '']
        unit = "0"
        if len(name[2].split(' ')[0]) > 1:
            unit = name[2].split(' ')[0][-1]
        elif len(name[2].split(' ')[0]) == 1:
            unit = name[2].split(' ')[0]
        
        key_name = name[0].replace("\u00a0", " ")
        get_dept = key_name.split(" ")[:-1]
        department = " ".join(get_dept)
        c_info = Course_Info(name=name[1], department=department, units=unit, description=description, prerequisite=prereq, corequisite=co_course,
                                repeatability=repeat ,restriction=restrict, ge_string=ge_tag, ge_list=ge_list)
        course_dict[key_name] = c_info
    return course_dict


if __name__ == "__main__":
    websites = get_courses_websites()
    for each_url in websites:
        one_course = get_courses(each_url)
        ##print(one_course)