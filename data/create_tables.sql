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

ALTER TABLE courses ADD FULLTEXT(id);