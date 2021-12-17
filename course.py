class Course:

    def __init__(self, id, name, unit, description):
        self.id = id
        self.name = name
        self.units = unit
        self.description = description
        self.prereqString = ""
        self.restriction = ""
        self.prereq = []
        self.next = []
        self.picked = False 
        self.quarter = 0