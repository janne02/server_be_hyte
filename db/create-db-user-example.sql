CREATE USER 'myusername'@'localhost' IDENTIFIED BY 'terveyspass';
GRANT ALL PRIVILEGES ON `HealthDiary`.* TO 'myusername'@'localhost';
FLUSH PRIVILEGES;

