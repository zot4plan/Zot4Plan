from bs4 import BeautifulSoup
import requests
import json 

f = open('../other/courseIDs.json')   
Data = {elem for elem in json.load(f)}
f.close()

"""
Header is a class that allows user to form a data strcuture that stores information regarding 
UCI major requirements. It can be used to differentiate the difference between header, courses,
and addtional comments given from a major requirement table. Any information related to a section
will be nested within its header. 
"""
class Header:
    """ 
    Instantiate all necessary attributes that allows users to have nested data structure that header name
    and any courses that belonged in the same section
    """

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
    return: a list of all the URL addresses that display UCI major requirements
    """

    major_urls = {}
    all_href = []
    soup = request_websites("http://catalogue.uci.edu/undergraduatedegrees/")
    for elem in soup.find_all('ul'):
        for each in elem.find_all('a'):
            href = each.get('href')
            get_type = href.split('_')
            website = 'http://catalogue.uci.edu/' + href
            name = each.text
            if get_type[-1] in ['minor/', 'bs/', 'ba/', 'bfa/'] and website not in major_urls:
                all_href.append([each.text, website])
                major_urls[name] = website

    # write_url(major_urls)
    return all_href


def get_name(in_string):
    """
    get_name scrapes the course name - excluding any trailing characters or integers.
    :param in_string: UCI course ID (type = string)
    :return: the name of the course (type = string)
    """

    name = ''
    for char in in_string:
        if not char.isdigit():
            name += char 
        else:
            break
    return name[:-1]


def expand_series(courses):
    """ 
    expand_series takes in a string of characters that have multiple courses
    displayed together, connected by '-'. The function extracts '-' characters
    and separate courses in the given string
    :param courses: a string of characters that contains a series of courses
    :return: a list of courses in the provided string
    """
    items = courses.split('- ')
    name = get_name(items[0])
    for x in range(1, len(items)):
        items[x] = name + ' ' + items[x]
    return ['-'] + items


def expand_same_as(courses):
    """
    expand_same_as takes in a string of characters that have multplie courses displayed
    together, connected by '/'. The function returns all courses in list
    """
    items = courses.split('/')
    return ['/'] + items



def scrape_programs(url):
    """
    scrape_courses takes in one parameter, major's url, and attain the information from the provided link.
    It sort the information by headers/courses and adjust the data model accordingly.
    """

    soup = request_websites(url)
    table = soup.find('div', id='requirementstextcontainer')
    requirements = []
    try:
        main = table.find_all("tr")
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
                        requirements[-1].child[-1].child[-1] = ['or', prev, name[3:]]
                elif '-' in name:
                    courses = expand_series(name)
                    requirements[-1].child[-1].child.append(courses)
                elif '/' in name:
                    check_course = name.split(' ')[0]
                    if check_course not in ['CHC/LAT', 'CRM/LAW']:
                        courses = expand_same_as(name)
                        requirements[-1].child[-1].child.append(courses)
                    else:
                        requirements[-1].child[-1].child.append(name)
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
    
    except:
        print(url)


def write_url(all_url):
    """
    write_url will saves all of the major requirement urls into a json file.
    """
    with open('../database/program_Urls.json', 'w') as f:
        json.dump(all_url, f, indent=4)


def write_to_json(name, info):
    """
    write_to_json takes in a Header object and writes the information out
    into a JSON file
    """
    if "Criminology" in name:
        name = name.replace(' ', '_').replace('/', '-')
    else:
        name = name.replace(' ', '_').replace('/', '-').replace(',', '')
    if "Minor" in name:
            name += '.'
    with open('../test/' + name + 'json', 'w') as f:
        json_version = []
        for elem in info:
            if elem.typeParent == "Header":
                elem.child = [each.__dict__ for each in elem.child]
            json_version.append(elem.__dict__)
        json.dump(json_version, f, indent=4)


if __name__ == "__main__":
    
    all_program_reqs = get_websites()
    for elem in all_program_reqs:
        print(elem[0])
        program_info = scrape_programs(elem[1])
        if program_info != None:
            write_to_json(elem[0], program_info)

