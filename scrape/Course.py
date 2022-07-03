"""
Course is a class is responsible for storing information of each individual
UCI courses. 
"""
class Course:
    """
    Initialize all attributes needed to store a UCI course's information
    """
    def __init__(self):
        self.name = ''
        self.course_key = ''
        self.department = ''
        self.units = '0'
        self.description = ''
        self.prerequisite = ''
        self.prerequisite_tree = ''
        self.prerequisite_for = ''
        self.corequisite = ''
        self.repeatability = '1'
        self.restriction = ''
        self.ge_string = ''
        self.ge_list = []
        self.past_terms = ''


    def set_header_info(self, header_info):
        """
        set_header takes in a raw text (Course header in UCI catalogue) 
        and split the string up by parts ('.'). Using given
        informtation, set attributes: name, course_key, and untis
        :param header_info: string that contains course key, course name, and units 
        """

        header_info = header_info.text.split('.  ')
        self.name = header_info[1]
        self.course_key = header_info[0].replace("\u00a0", " ")

        get_dept = self.course_key.split(" ")[:-1]
        self.department = " ".join(get_dept)

        if len(header_info[2].split(' ')[0]) > 1:
            self.units = header_info[2].split(' ')[0][-1]
        elif len(header_info[2].split(' ')[0]) == 1:
            self.units = header_info[2].split(' ')[0]


    def set_description(self, raw_description):
        """
        set_description takes in a raw text was scraped from UCI Catalogue and
        set the value to attribute description
        :param raw_description: string that contains the course description
        """
        self.description = raw_description.replace('"', "'")


    def set_information(self, raw_info):
        """
        set_information takes in a raw text was scraped from UCI Catalogue and set the
        value based on its content. The class method searches for certain key terms and
        execute accordingly. Possible class attribute changes: restriction, prerequisite,
        and corequisite
        :param raw_info: a string containing course information
        """

        raw_info = raw_info.replace('"', "'")

        if 'Restriction:' in raw_info:
            self.restriction = raw_info.replace('Restriction:', '')
        elif 'Prerequisite:' in raw_info:
            if 'Corequisite:' in raw_info:
                separate = raw_info.split('\n')
                self.prerequisite = separate[1].replace('Prerequisite:','').replace('\xa0ENG\xa0', ' ')
                self.corequisite = separate[0].replace('Corequisite:','')
            else:
                self.prerequisite = raw_info.replace('\n', '').replace('"', "'").replace('Prerequisite:','').replace('\xa0ENG\xa0', ' ')
        elif self.corequisite == '' and 'Corequisite:' in raw_info:
            self.corequisite = raw_info.replace('\n', '').replace('Corequisite:','')
    

    def set_ge(self, raw_text_ge=None):
        """
        set_ge takes in a raw text that contains information regarding course's GE category. The string
        will be saved in two format: string (display purposes) and list (checking purposes).
        :param raw_text_ge: string that contains information regarding course's GE
        """

        if raw_text_ge is not None:
            self.ge_string = raw_text_ge.text.replace('.', '').upper()
            in_list = self.ge_string.replace(',', '').replace(')', '').replace('(', '').replace(')', '').replace('AND', '').replace('OR', '').replace('GE', '').split(' ')
            self.ge_list = [elem.strip() for elem in in_list if elem != '']

    
    def set_repeatability(self, raw_info):
        """
        set_repeatability takes in a raw text scraped from the UCI course catalogue and
        determines how many time a course can be taken for credit
        :param raw_info: a string that contains course's information regarding course repeatability
        """ 

        if 'Unlimited' in raw_info or 'unlimited' in raw_info:
            self.repeatability = '9'
        else:
            repeat = raw_info.split(' ')
            for char in repeat:
                if char.isdigit():
                    self.repeatability = char
                    break

    def set_terms(self, all_terms):
        """
        set_terms takes in a list of past terms and convert it into a string
        :param all_terms: list of past terms that offered the course
        """
        swap = [" ".join(term.split(" ")[::-1]) for term in all_terms]
        self.past_terms = ", ".join(swap)


    def set_prereq_info(self, course_prereq_tree):
        """
        set_prereq_tree saves the course's prerequisites in tree format and
        courses that current course is prerequisite for.
        """
        self.prerequisite_tree = course_prereq_tree['tree'].replace('"', "'")
        self.prerequisite_for = (", ".join(course_prereq_tree['prereq_for'])).replace('"', "'")