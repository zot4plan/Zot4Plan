DROP DATABASE IF EXISTS zot4plandb;
CREATE DATABASE zot4plandb;
GO
USE zot4plandb;
GO
CREATE TABLE courses (
    id VARCHAR(25) NOT NULL,
    name VARCHAR(200) NOT NULL,
    department VARCHAR(20) NOT NULL,
    units INT NOT NULL,
    description VARCHAR(1000) NOT NULL,
    prerequisite VARCHAR(1000) NOT NULL,
    restriction VARCHAR(1000) NOT NULL,
    repeatability INT NOT NULL,
    corequisite VARCHAR (1000),
    ge VARCHAR(25) NOT NULL,
    PRIMARY KEY(id));
ALTER TABLE courses ADD FULLTEXT(id);

CREATE TABLE majors(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    major_requirement json DEFAULT NULL,
    url VARCHAR(300) NOT NULL,
    PRIMARY KEY(id));

 CREATE TABLE courses_in_ges(
    id INT NOT NULL AUTO_INCREMENT,
    courseId VARCHAR(25) NOT NULL,
    geId VARCHAR(5) NOT NULL,
    PRIMARY KEY(id));

/*   FOREIGN KEY(geId) REFERENCES generalEducations(id),
//   FOREIGN KEY(courseId) REFERENCES courses(id));

/* CREATE TABLE generalEducations(
    id VARCHAR(10) NOT NULL,
    name VARCHAR(55) NOT NULL,
    PRIMARY KEY(id));

 CREATE TABLE courses_in_ge(
    courseId VARCHAR(25) NOT NULL,
    geIds VARCHAR(20) NOT NULL,
    FOREIGN KEY(courseId) REFERENCES courses(id));

INSERT INTO generalEducations VALUES ("IA","Lower-Division Requirement");
INSERT INTO generalEducations VALUES ("IB","Upper-Division Requirement");
INSERT INTO generalEducations VALUES ("II","Science and Technology");
INSERT INTO generalEducations VALUES ("III","Social and Behavioral Sciences");
INSERT INTO generalEducations VALUES ("IV","Arts and Humanities");
INSERT INTO generalEducations VALUES ("VA","Quantitative Literacy");
INSERT INTO generalEducations VALUES ("VB","Formal Reasoning");
INSERT INTO generalEducations VALUES ("VI", "Language Other Than English");
INSERT INTO generalEducations VALUES ("VII","Multicultural Studies");
INSERT INTO generalEducations VALUES ("VIII", "International/Global Issues"); */
