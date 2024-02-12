CREATE USER 'myusername'@'localhost' IDENTIFIED BY 'mypassword';
GRANT ALL PRIVILEGES ON `HealthDiary`.* TO 'myusername'@'localhost';
FLUSH PRIVILEGES;
