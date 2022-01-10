DROP DATABASE IF EXISTS moviedb;
CREATE DATABASE moviedb;
GO
USE moviedb;
GO
CREATE TABLE movies (
    id VARCHAR(10) NOT NULL,
    title VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    director VARCHAR(100) NOT NULL,
    PRIMARY KEY(id));

 CREATE TABLE stars(
    id VARCHAR(10) NOT NULL,
    name VARCHAR(100) NOT NULL,
    birthYear INT,
    PRIMARY KEY(id));

 CREATE TABLE stars_in_movies (
    starId VARCHAR(10) NOT NULL,
    movieId VARCHAR(10) NOT NULL,
    FOREIGN KEY(starId) REFERENCES stars(id),
    FOREIGN KEY(movieId) REFERENCES movies(id));

 CREATE TABLE genres (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(32) NOT NULL,
    PRIMARY KEY(id));

 CREATE TABLE genres_in_movies (
    genreId INT NOT NULL,
    movieId VARCHAR(10) NOT NULL,
    FOREIGN KEY(movieId) REFERENCES movies(id),
    FOREIGN KEY(genreId) REFERENCES genres(id));

  CREATE TABLE creditcards ( 
    id VARCHAR(20) NOT NULL, 
    firstName VARCHAR(50) NOT NULL, 
    lastName VARCHAR(50) NOT NULL, 
    expiration DATE NOT NULL, 
    PRIMARY KEY(id));

 CREATE TABLE customers (
    id INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    ccId VARCHAR(20) NOT NULL,
    address VARCHAR(200) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(20) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(ccId) REFERENCES creditcards(id));

 CREATE TABLE sales (
 	id INT NOT NULL AUTO_INCREMENT, 
 	customerId INT NOT NULL, 
 	movieId VARCHAR(10), 
 	saleDate DATE NOT NULL, 
 	PRIMARY KEY(id), 
 	FOREIGN KEY(customerId) REFERENCES customers(id), 
 	FOREIGN KEY(movieId) REFERENCES movies(id));

 CREATE TABLE ratings (movieId VARCHAR(10) NOT NULL, 
 	rating FLOAT NOT NULL, numVotes INT NOT NULL, 
 	FOREIGN KEY(movieId) REFERENCES movies(id));

 CREATE TABLE employees (
    email VARCHAR(50) NOT NULL,
    password VARCHAR(20) NOT NULL,
    fullname VARCHAR(100),
    PRIMARY KEY (email)
    );

 INSERT INTO employees(email,password, fullname) VALUES ('classta@email.edu','classta','TA CS122B');
 ALTER TABLE movies ADD FULLTEXT(title); 