from major_requirements import request_websites
import json 

def get_url():
    all_url = {}
    prefered = ['bs/', 'ba/', 'bfa/']
    soup = request_websites("http://catalogue.uci.edu/undergraduatedegrees/")
    for elem in soup.find_all('ul'):
        for each in elem.find_all('a'):
            href = each.get('href')
            get_type = href.split('_')
            website = 'http://catalogue.uci.edu' + href + '#requirementstext'
            name = each.text
            if get_type[-1] in prefered:
                all_url[name] = website

    return all_url

def write_url(all_url):
    with open('../database/majorUrls.json', 'w') as f:
        json.dump(all_url, f, indent=4)

if __name__ == "__main__":
    all_url = get_url()
    write_url(all_url)