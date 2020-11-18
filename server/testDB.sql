DROP DATABASE IF EXISTS testrewhy;

CREATE DATABASE testrewhy;

USE testrewhy;

CREATE TABLE testproducts (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  company varchar(50) NOT NULL,
  colors LONGTEXT NOT NULL,
  price varchar(20) NOT NULL,
  PRIMARY KEY (ID)
);

SET GLOBAL max_allowed_packet=10000000;

/*  Execute this file from the command line by typing the following:
 * On your personal computer, if you've set * up a password, it'll be
 * mysql -uroot -p < testDB.sql
*/