DROP DATABASE IF EXISTS HealthDiary;
CREATE DATABASE HealthDiary;
USE HealthDiary;
--Create a table for UserActivities
CREATE TABLE UserActivities (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255)NOT NULL,
    age INT NOT NULL,
    location VARCHAR(255) NOT NULL,
    activity VARCHAR(255) NOT NULL
);


INSERT INTO UserActivities (user_id, firstname, age, location, activity) VALUES
  (10, 'Alexey', 28, 'Tirana', 'Lifting heavy'),
  (11, 'Joonas', 52, 'Helsinki', 'Cycling'),
  (12, 'Jan', 39, 'Estonia', 'Jogging'),
  (13, 'Otto', 18, 'Helsinki', 'Cycling');

-- use cases
-- Query data
SELECT * FROM UserActivities WHERE location = 'Helsinki';

-- update data
Update UserActivities SET age = 19 WHERE firstname = 'Otto';
-- delete data
DELETE FROM UserActivities WHERE activity = 'Jogging';
