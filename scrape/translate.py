import json 
from pathlib import Path
import sys

MAJOR_REQ_OUT = '../database/major_requirements.sql'
MINOR_REQ_OUT = '../database/minor_requirements.sql'


def get_paths(req_type):
    """
    get paths attains all of the path addresses of files that store information of 
    major/minor requirements
    """

    all_paths = {}
    path_name = Path(sys.argv[1])
    for addie in path_name.iterdir():
        find_name = ''
        if len(req_type) == 3:
            find_name = str(addie).split('/')[-1].replace('json', '').split('_')
        else:
            find_name = str(addie).split('/')[-1].replace('.json', '').split('_')
        name = " ".join(find_name[:-1]) + ", " + find_name[-1]
        if find_name[-1] in req_type:
            all_paths[name] = addie
    return all_paths


def get_course_id(info):
    
    all_id = set()
    for header in info:
        for section in header['child']:
            for course in section['child']:    
                if type(course) == str:
                    all_id.add(course)
                else:
                    for elem in course:
                        all_id.add(elem)
    return all_id


def write_requirements(req_type, req_string, file_names, out_file):
    """
    write requirements access the information of major/minor requirements of
    given file paths and write them into a given outfile.
    """
    
    open_urls = open('../database/' + req_type + '_Urls.json')
    all_urls = json.load(open_urls)
    write_majors = open(out_file, 'w')

    sorted_files = sorted(file_names)
    for name in sorted_files: 
        with open(file_names[name], 'r') as f: 
            all_info = json.load(f)
            requirement = str(all_info).replace("'", '"')
            course_id = ", ".join(get_course_id(all_info)).replace("'", '"')
            write_majors.write("INSERT INTO " + req_type + " (name, " + req_string + ", required_courses, url) VALUES (" + 
                                "'" + name + "', " + "'" + requirement + "', '" + course_id + "', '" +  
                                all_urls[name.replace('-', '/')] + '#requirementstext' + "');" + "\n")

    open_urls.close()
    write_majors.close()


if __name__ == "__main__":
    
    file_paths = get_paths(["Minor"])
    write_requirements('minor_reqs', 'minor_requirement', file_paths, MINOR_REQ_OUT)