from scrape_courses import get_courses_websites, get_courses
import json 

if __name__ == "__main__":
    websites = get_courses_websites()
    course_names = []
    with open('../database/test.sql', 'a') as f: 
        for each_url in websites:
            uci_course = get_courses(each_url)
            for key,value in uci_course.items():
                course_names.append(key)
                f.write('INSERT INTO courses VALUES ("' + key + '","' + value.name.strip() +  '","' + value.department + '","' + value.units + '","' + value.description + '","' + value.prerequisite + '","' + value.restriction + '","' + value.repeatability + '","' + value.corequisite + '","' + value.ge_string + '");' + '\n')
                ## Only fulfilling one ge cat !!!! REMEMBER TO RE-RUN AND FIX TO SCRAPE ALL CASES LATER
                ## if value.ge != "" and len(value.ge) <= 6:
                    ## f.write('INSERT INTO courses_in_ge VALUES ("' + key + '","' + value.ge[1:-1] + '");' + '\n')
    with open('../data/data.json', 'w') as f: 
        json.dump(course_names, f,indent=4)








# from scrape_courses import get_courses_websites, get_courses
# import json 

# if __name__ == "__main__":
#     websites = get_courses_websites()
#     course_names = []
#     with open('../database/all_GEs.sql', 'a') as f: 
#         for each_url in websites:
#             uci_course = get_courses(each_url)
#             for key,value in uci_course.items():
#                 course_names.append(key)
                ## f.write('INSERT INTO courses VALUES ("' + key + '","' + value.name.strip() +  '","' + value.department + '","' + value.units + '","' + value.description + '","' + value.prerequisite + '","' + value.restriction + '");' + '\n')
                ## Only fulfilling one ge cat !!!! REMEMBER TO RE-RUN AND FIX TO SCRAPE ALL CASES LATER
                # if value.ge != "":
                #     insert_string = value.ge.replace(',', ' AND ').upper()[1:-1]
                #     print(insert_string)
                #     f.write('INSERT INTO courses_in_ge VALUES ("' + key + '","' + insert_string + '");' + '\n')
    ## with open('../data/data.json', 'w') as f: 
    ##    json.dump(course_names, f,indent=4)