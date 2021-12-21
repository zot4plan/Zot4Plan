from scrape_courses import get_courses_websites, get_courses
from course import Course
import json 

def create_objects(uci_course):
    """
    create_objects take in a course from UCI and turn them into a Course object.
    """

    course_object = []

    for key,value in uci_course.items():
        all_info = value.description.split(';')[:-1]
        new_course = Course(key, value.name, value.units, all_info[0])
        
        for item in all_info:
            if 'Restriction:' in item:
                new_course.restriction = item 
            elif 'Prerequisite:' in item:
                new_course.prereqString = item 
        course_object.append(new_course)

    return course_object


def convert_to_json(uci_courses):
    just_dict = [elem.__dict__ for elem in uci_courses]
    with open('../data/data.json', 'w') as f:

        json.dump(just_dict, f,indent=4)

if __name__ == "__main__":
    websites = get_courses_websites()
    one_course = get_courses(websites[73])
    new_object = create_objects(one_course)
    convert_to_json(new_object)


