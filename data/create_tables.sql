DROP DATABASE IF EXISTS zot4plandb;
CREATE DATABASE zot4plandb;
GO
USE zot4plandb;
GO
CREATE TABLE courses (
    id VARCHAR(25) NOT NULL,
    title VARCHAR(200) NOT NULL,
    units VARCHAR(10) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    prereqString VARCHAR(1000) NOT NULL,
    restriction VARCHAR(1000) NOT NULL,
    PRIMARY KEY(id));

 CREATE TABLE majors(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    majorRequirements json DEFAULT NULL,
    PRIMARY KEY(id));
 
 CREATE TABLE ge(
    id VARCHAR(10) NOT NULL,
    name VARCHAR(55) NOT NULL,
    PRIMARY KEY(id));

 CREATE TABLE courses_in_ge(
    courseId VARCHAR(25) NOT NULL,
    geId VARCHAR(10) NOT NULL,
    special Boolean NOT NULL,
    FOREIGN KEY(courseId) REFERENCES courses(id),
    FOREIGN KEY(geId) REFERENCES ge(id));

ALTER TABLE courses ADD FULLTEXT(id);
INSERT INTO ge VALUES ("IA","Lower-Division Requirement");
INSERT INTO ge VALUES ("IB","Upper-Division Requirement");
INSERT INTO ge VALUES ("II","Science and Technology");
INSERT INTO ge VALUES ("III","Social and Behavioral Sciences");
INSERT INTO ge VALUES ("IV","Arts and Humanities");
INSERT INTO ge VALUES ("VA","Quantitative Literacy");
INSERT INTO ge VALUES ("VB","Formal Reasoning");
INSERT INTO ge VALUES ("VI", "Language Other Than English");
INSERT INTO ge VALUES ("VII"," Multicultural Studies");
INSERT INTO ge VALUES ("VIII", "International/Global Issues");