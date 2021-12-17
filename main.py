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
        course_object.append(new_course)
        
        for item in all_info:
            if 'Restriction:' in item:
                new_course.restriction = item 
            elif 'Prerequisite:' in item:
                new_course.prereqString = item 

    return course_object


def convert_to_json(uci_course):
    return json.dumps(uci_course.__dict__)


if __name__ == "__main__":
    websites = get_courses_websites()
    one_course = get_courses(websites[0])
    # for each_course in websites:
    #     one_course = get_courses(each_course)
    #     new_object = create_objects(one_course)

    #     for elem in new_object:
    #         a = convert_to_json(elem)
    #         print(a)