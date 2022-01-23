from operator import ge
from scrape_courses import get_courses_websites, get_courses
import json 


if __name__ == "__main__":
    websites = get_courses_websites()
    course_names = []
    with open('../data/uciCourses.sql', 'a') as f: 
        for each_url in websites:
            uci_course = get_courses(each_url)
            for key,value in uci_course.items():
                all_info = value.description.split(';')
                restrict_string = ""
                prereq_string = ""
                for item in all_info:
                    if 'Restriction:' in item:
                        restrict_string = item.replace('"', "'").replace('Restriction:', '')
                    elif 'Prerequisite:' in item:
                        prereq_string = item.replace('\n', '').replace('"', "'").replace('Prerequisite:','')
                course_names.append(key)
                f.write('INSERT INTO courses VALUES ("' + key + '","' + value.name.strip() + '","' + value.units + '","' + all_info[0].replace('"', "'") + '","' + prereq_string + '","' + restrict_string + '");' + '\n')
                if value.ge != "":
                    f.write('INSERT INTO courses_in_ge VALUES ("' + key + '","' + value.ge + '");' + '\n')
    with open('../data/data.json', 'w') as f: 
        json.dump(course_names, f,indent=4)