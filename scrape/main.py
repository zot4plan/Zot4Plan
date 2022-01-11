from scrape_courses import get_courses_websites, get_courses
import json 


if __name__ == "__main__":
    websites = get_courses_websites()
    course_names = []
    with open('../data/uciCourses.sql', 'a') as f: 
        for each_url in websites:
            uci_course = get_courses(each_url)
            for key,value in uci_course.items():
                all_info = value.description.split(';')[:-1]
                restrict_string = ""
                prereq_string = ""
                for item in all_info:
                    if 'Restriction:' in item:
                        restrict_string = item.replace('"', "'")
                    elif 'Prerequisite:' in item:
                        prereq_string = item.replace('\n', '').replace('"', "'")
                course_names.append(key)
                f.write('INSERT INTO courses VALUES ("' + key + '","' + value.name + '","' + value.units + '","' + all_info[0].replace('"', "'") + '","' + restrict_string + '","' + prereq_string + '");' + '\n')
    
    with open('../data/data.json', 'w') as f: 
        json.dump(course_names, f,indent=4)