from typing import Text
from bs4 import BeautifulSoup
import requests

def request_websites(url):
    link = requests.get(url).text
    soup = BeautifulSoup(link, 'lxml')
    return soup

def get_websites():
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
    soup = request_websites(url)
    main = soup.find("table", class_='sc_courselist')

    all_courses = []
    try:
        for elem in main.find_all('td', class_='codecol'):
            get_courses = elem.find_all('a')
            for each in get_courses:
                all_courses.append(each.text)
    except:
        print('error: ' + url)
    return all_courses


def write_to_file(url, classes):
    major = url.split('/')[-2]
    with open(major+'.out', 'w') as f:
        for elem in classes:
            f.write(str(elem) + '\n')

if __name__ == "__main__":
    all_websites = get_websites()
    course = scrape_courses(all_websites[0])
    write_to_file(all_websites[0], course)

    