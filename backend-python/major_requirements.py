from bs4 import BeautifulSoup
import requests
import json 
import re 

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
        

def scrape_courses(url):
    """
    scrape_courses scrapes all of the required courses from the provided url.
    """

    soup = request_websites(url)
    main = soup.find("table", class_='sc_courselist')

    try:
        all_courses = {}
        for elem in main.find_all('tr'):
            if elem.find_all('span', class_='courselistcomment'):
                in_string = elem.text.strip()
                all_courses[in_string] = in_string.isupper()
            else:
                for course in elem.find_all('td', class_='codecol'):
                    in_string = course.text.strip().replace("\u00a0", " ")
                    all_courses[in_string] = in_string.isupper()
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
