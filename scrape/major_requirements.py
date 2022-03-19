from bs4 import BeautifulSoup
import requests
import json 
import re

from requests.api import get 

f = open('../data/data.json')   
in_list = json.load(f)
Data = {elem for elem in in_list}
f.close()

class Header:
    def __init__(self, name, typeParent = None):
        self.name = name
        self.child = []
        self.typeParent = typeParent


def request_websites(url):
    """
    request_websites attains permission from the server - with the intend to scrape and turn
    the link into a Soup object
    """

    link = requests.get(url).text
    soup = BeautifulSoup(link, 'lxml')
    return soup


def get_websites():
    """
    get_websites scrapes all the redirected websites in the main page of UCI major requirements.
    """
    # major_names = []
    # all_href = []
    # prefered = ['bs/', 'ba/', 'bfa/']
    # soup = request_websites("http://catalogue.uci.edu/undergraduatedegrees/")
    # for elem in soup.find_all('ul'):
    #     for each in elem.find_all('a'):
    #         href = each.get('href')
    #         get_type = href.split('_')
    #         website = 'http://catalogue.uci.edu/' + href
    #         name = each.text
    #         if get_type[-1] in prefered and name not in major_names:
    #             all_href.append([each.text, website])
    #             major_names.append(name)

    # return all_href

    major_names = []
    all_href = []
    prefered = ['bs/', 'ba/', 'bfa/']
    soup = request_websites("http://catalogue.uci.edu/undergraduatedegrees/")
    find_div = soup.find_all('ul')
    get_li = find_div[36].find_all('a')
    for each in get_li:
        href = each.get('href')
        get_type = href.split('_')
        website = 'http://catalogue.uci.edu/' + href
        name = each.text
        if get_type[-1] in prefered:
            all_href.append([each.text, website])
            major_names.append(name)
    return all_href


def get_name(in_string):
    """
    get_name scrapes the course name - excluding any trailing characters or integers.
    """

    name = ''
    for char in in_string:
        if not char.isdigit():
            name += char 
        else:
            break
    return name[:-1]


def expand_series(courses):

    items = courses.split('- ')
    name = get_name(items[0])
    for x in range(1, len(items)):
        items[x] = name + ' ' + items[x]
    return items


def get_series(all_courses, in_string, name):
    """
    get_series splits any course series by '-' and check the validity of all
    courses within that range.
    """

    num_series = []
    in_string = in_string.replace(" ", '')
    course_series = in_string.split('-')
    for i in range(len(course_series)):
        if((i + 1) < len(course_series) and course_series[i].isdigit() and course_series[i+1].isdigit()):
            for j in range(int(course_series[i]), int(course_series[i+1]) + 1):
                full_name = name + ' ' +str(j)
                if full_name in Data:
                    if (len(num_series) > 0 and num_series[-1] != full_name) or len(num_series) == 0:
                        num_series.append(full_name)  
        elif (len(num_series) > 0 and num_series[-1] != name + ' ' + course_series[i]) or len(num_series) == 0:
            if (name + ' ' + course_series[i]) in Data:
                num_series.append(name + ' ' + course_series[i])

    return num_series


def scrape_courses(url):
    soup = request_websites(url)
    table = soup.find('div', id='requirementstextcontainer')
    main = table.find_all("tr")
    requirements = []
    for elem in main:
        ## Checks if elem is a course (clickable)
        course = elem.find("td", class_="codecol")
        if course != None:
            change_space = course.text.strip().replace("\u00a0", " ") ## replace space symbol with space character
            name = change_space.strip().replace("\u2013", "-")
            ## checks if this is the parent is Area header or list comment
            if len(requirements[-1].child) == 0: 
                requirements[-1].child.append(Header("","Courses"))
            ## checks if courses are relatted to the previous - such as or (chose one)
            if 'or' in name:
                ## only append when the previous is already containing other 'or' cases (in a list)
                if type(requirements[-1].child[-1].child[-1]) == list:
                    requirements[-1].child[-1].child[-1].append(name[3:])
                else:
                    prev = requirements[-1].child[-1].child[-1]
                    requirements[-1].child[-1].child[-1] = [prev, name[3:]]
            elif '-' in name:
                courses = expand_series(name)
                for elem in courses:
                    requirements[-1].child[-1].child.append(elem)
            else:
                requirements[-1].child[-1].child.append(name)
            continue

        area_header = elem.find("span", class_="courselistcomment areaheader")
        if area_header != None:
            change_space = area_header.text.strip().replace("\u00a0", " ")
            name =  change_space.strip().replace("\u2013", "-")
            requirements.append(Header(name, "Header"))
            continue

        list_comment = elem.find("span", class_="courselistcomment")
        if list_comment != None:
            change_space = list_comment.text.strip().replace("\u00a0", " ")
            name =  change_space.strip().replace("\u2013", "-")
            if len(requirements) == 0:
                requirements.append(Header("", 'Header'))
            requirements[-1].child.append(Header(name, 'Courses'))
    
    return requirements  


def write_requirements_file(name, classes):
    """
    write_to_file takes the information provided as parameters and write them out 
    in a .out file. The information contains all of the required courses of a major.
    """
    with open("../data/majorsRequirements.sql", 'a') as f:
        in_json = '['
        for elem in classes:
            if elem[1] is False:
                elem[0] = (elem[0].replace('"', "'")).replace("'","\\'")
            in_json += '["' + elem[0] + '","' + str(elem[1]) + '"],'
        if len(in_json) > 1:
            in_json = in_json[:-1] + ']'
        else:
            in_json += ']'        
        f.write("INSERT INTO majors (name, majorRequirements) VALUES ('" + name + "','" + in_json + "');" + '\n')

def write_to_json(name, info):
    name = name.replace(' ', '_')
    name = name.replace(',', '')
    with open('../data/' + name + 'json', 'w') as f:
        json_version = []
        for elem in info:
            if elem.typeParent == "Header":
                elem.child = [each.__dict__ for each in elem.child]
            json_version.append(elem.__dict__)
        json.dump(json_version, f, indent=4)


if __name__ == "__main__":
    all_websites = get_websites()
    for elem in all_websites:
        majorInfo = scrape_courses(elem[1])
        write_to_json(elem[0], majorInfo)
        ## write_requirements_file(each[0], course)
