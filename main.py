from scrape_courses import get_courses_websites, get_courses
from course import Course

def create_objects(uci_course):
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

if __name__ == "__main__":
    websites = get_courses_websites()
    one_course = get_courses(websites[73])
    new_object = create_objects(one_course)

