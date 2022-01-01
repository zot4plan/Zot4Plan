from scrape_courses import get_courses_websites, get_courses
from course import Course
import json 

All_Courses = {}

def create_objects(uci_course):
    """
    create_objects take in a course from UCI and turn them into a Course object.
    """

    ##course_object = {}

    for key,value in uci_course.items():
        all_info = value.description.split(';')[:-1]
        new_course = Course(key, value.name, value.units, all_info[0])
        
        for item in all_info:
            if 'Restriction:' in item:
                new_course.restriction = item 
            elif 'Prerequisite:' in item:
                new_course.prereqString = item 
        All_Courses[new_course.id] = new_course.__dict__


def convert_to_json():
    
    with open('../data/data.json', 'a') as f:
        json.dump(All_Courses, f,indent=4)

if __name__ == "__main__":
    websites = get_courses_websites()
    
    one_course = get_courses(websites[29])
    create_objects(one_course)
    
    one_course = get_courses(websites[72])
    create_objects(one_course)

    one_course = get_courses(websites[73])
    create_objects(one_course)
    
    one_course = get_courses(websites[94])
    create_objects(one_course)

    one_course = get_courses(websites[138])
    create_objects(one_course)
    convert_to_json()
