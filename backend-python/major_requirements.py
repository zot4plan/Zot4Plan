from bs4 import BeautifulSoup
import requests
import json 
import re

from requests.api import get 

f = open('../data/data.json')   
Data = json.load(f)
f.close()

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

    all_href = []
    prefered = ['bs/', 'ba/', 'bfa/']
    soup = request_websites("http://catalogue.uci.edu/undergraduatedegrees/")
    for elem in soup.find_all('ul'):
        for each in elem.find_all('a'):
            href = each.get('href')
            get_type = href.split('_')
            if get_type[-1] in prefered and href not in all_href:
                all_href.append('http://catalogue.uci.edu/' + href + '#requirementstext')
    return all_href

def get_name(in_string):
    name = ''
    for char in in_string:
        if not char.isdigit():
            name += char 
        else:
            break
    return name[:-1]

def get_series(all_courses, in_string, name):

    ## check course validity:
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
            num_series.append(name + ' ' + course_series[i])

    return num_series

def scrape_courses(url):
    """
    scrape_courses scrapes all of the required courses from the provided url.
    """

    soup = request_websites(url)
    main = soup.find("table", class_='sc_courselist')


    try:
        all_courses = []
        for elem in main.find_all('tr'):
            if elem.find_all('span', class_='courselistcomment'):
                change_space = elem.text.strip().replace("\u00a0", " ")
                in_string = change_space.strip().replace("\u2013", "-")
                if in_string.isupper():
                    course_name = get_name(in_string)
                    if '-' in in_string:
                        check_series = in_string.split(',')
                        series = []
                        for i in range(len(check_series)):
                            if i == 0:
                                series = get_series(all_courses, check_series[i][len(course_name):], course_name)
                            else:
                                series = get_series(all_courses, check_series[i], course_name)
                        for elem in series:
                            all_courses.append([elem, True])
                    else:
                        all_courses.append([in_string, True])
                else:
                    all_courses.append([in_string, False])
            else:
                for course in elem.find_all('td', class_='codecol'):
                    change_space = course.text.strip().replace("\u00a0", " ")
                    in_string = change_space.strip().replace("\u2013", "-")
                    
                    if '-' in in_string:
                        course_name = get_name(in_string)
                        series = get_series(all_courses, in_string[len(course_name):], course_name)
                        for elem in series:
                            all_courses.append([elem, True])
                    elif 'or' in in_string:
                        all_courses.append(['or', False])
                        in_string = in_string.replace("or ", '')
                    
                        all_courses.append([in_string, True])
                    else:
                        all_courses.append([in_string, True])
    except:
        print('error: ' + url)
    return all_courses



def write_to_file(url, classes):
    """
    write_to_file takes the information provided as parameters and write them out 
    in a .out file. The information contains all of the required courses of a major.
    """

    major = url.split('/')[-2]
    with open("../data/" + major + '.json', 'w') as f:
        json.dump(classes, f,indent=4)


if __name__ == "__main__":
    all_websites = get_websites()
    course = scrape_courses(all_websites[23])
    write_to_file(all_websites[23], course)
