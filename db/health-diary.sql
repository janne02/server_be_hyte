DROP DATABASE IF EXISTS HealthDiary;
CREATE DATABASE HealthDiary;
USE HealthDiary;
--create table for users
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_level VARCHAR(10) NOT NULL DEFAULT 'regular'
);

-- Create a table for diary entries
CREATE TABLE DiaryEntries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    entry_date DATE NOT NULL,
    mood VARCHAR(50),
    weight DECIMAL(5,2),
    sleep_hours INT,
    notes TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
CREATE TABLE HeartRate (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    HR INT NOT NULL
);
CREATE TABLE UserActivities (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255)NOT NULL,
    age INT NOT NULL,
    location VARCHAR(255) NOT NULL,
    activity VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES HeartRate(user_id)
);

INSERT INTO Users (username, password, email, user_level) VALUES
  ('johndoe', 'temp-pw-1', 'johndoe@example.com', 'regular'),
  ('janedoe', 'temp-pw-2', 'janedoe@example.com', 'admin'),
  ('mike_smith', 'temp-pw-3', 'mike_smith@example.com', 'moderator');

-- Inserting multiple diary entries
INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes, created_at) VALUES
  (1, '2024-01-10', 'Happy', 70.5, 8, 'Had a great day, felt energetic', '2024-01-10 20:00:00'),
  (1, '2024-01-11', 'Tired', 70.2, 6, 'Long day at work, need rest', '2024-01-11 20:00:00'),
  (2, '2024-01-10', 'Stressed', 65.0, 7, 'Busy day, a bit stressed out', '2024-01-10 21:00:00');

INSERT INTO UserActivities (user_id, firstname, age, location, activity) VALUES
  (1, 'Alexey', 28, 'Tirana', 'Lifting heavy'),
  (2, 'Joonas', 52, 'Helsinki', 'Cycling'),
  (3, 'Jan', 39, 'Estonia', 'Jogging'),
  (4, 'Otto', 18, 'Stockholm', 'Cycling');
-- Inserting Multiple Heart rates
INSERT INTO HeartRate (user_id, HR) VALUES
  (1, 68),
  (2, 75),
  (3, 82),
  (4, 91);
SELECT Users.username, DiaryEntries.entry_date, DiaryEntries.mood, DiaryEntries.notes
  FROM Users, DiaryEntries
  WHERE DiaryEntries.user_id = Users.user_id;

SELECT Users.username, DiaryEntries.entry_date, DiaryEntries.mood, DiaryEntries.notes
  FROM Users JOIN DiaryEntries ON DiaryEntries.user_id = Users.user_id;

SELECT entry_date, mood, sleep_hours FROM DiaryEntries
  JOIN Users ON DiaryEntries.user_id = Users.user_id
  WHERE username = 'johndoe';


-- use cases
-- Query data
SELECT * FROM UserActivities WHERE location = 'Helsinki';
--this query retrieves user activities along with corresponding heart rates
SELECT UserActivities.user_id, UserActivities.firstname, UserActivities.age, UserActivities.location, UserActivities.activity, HeartRate.HR
  FROM UserActivities INNER JOIN HeartRate ON UserActivities.user_id = HeartRate.user_id
-- update data
Update UserActivities SET age = 19 WHERE firstname = 'Otto';
-- delete data
DELETE FROM UserActivities WHERE activity = 'Jogging';
