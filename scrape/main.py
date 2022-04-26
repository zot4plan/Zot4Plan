from scrape_courses import get_courses_websites, get_courses
import json 

if __name__ == "__main__":
    websites = get_courses_websites()
    course_names = []
    insert_ge = []
    with open('../database/uci_courses.sql', 'a') as f: 
        for each_url in websites:
            uci_course = get_courses(each_url)
            for key,value in uci_course.items():
                course_names.append(key)
                f.write('INSERT INTO courses VALUES ("' + key + '","' + value.name.strip() +  '","' + value.department + '","' + value.units + '","' + value.description + '","' + value.prerequisite + '","' + value.restriction + '","' + value.repeatability + '","' + value.corequisite + '","' + value.ge_string + '");' + '\n')
                for cat in value.ge_list:
                    insert_ge.append('INSERT INTO courses_in_ges VALUES ("' + key + '","' + cat + '");' + '\n')
    with open('../data/data.json', 'w') as f: 
        json.dump(course_names, f,indent=4)
    with open('../database/all_GEs.sql', 'a') as f:
        for insert in insert_ge:
            f.write(insert)
