-- database.sql

CREATE DATABASE IF NOT EXISTS voting_website;

USE voting_website;

CREATE TABLE IF NOT EXISTS voters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    citizen_card_number VARCHAR(10),
    name VARCHAR(255),
    address VARCHAR(255),
    password VARCHAR(255)
);
