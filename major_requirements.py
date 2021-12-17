from bs4 import BeautifulSoup
import requests

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
    """
    write_to_file takes the information provided as parameters and write them out 
    in a .out file. The information contains all of the required courses of a major.
    """

    major = url.split('/')[-2]
    with open(major+'.out', 'w') as f:
        for elem in classes:
            f.write(str(elem) + '\n')
    