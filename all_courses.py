from bs4 import BeautifulSoup
import requests
from major_requirements import request_websites, scrape_courses

def get_courses_websites():

    all_websites = []
    soup = request_websites("http://catalogue.uci.edu/allcourses/")
    for elem in soup.find_all('a'):
        get_href = elem.get('href')
        if '/allcourses' in str(get_href):
            all_websites.append('http://catalogue.uci.edu/' + get_href)
    return all_websites




if __name__ == "__main__":
    websites = get_courses_websites()
    for elem in websites:
        print(elem)