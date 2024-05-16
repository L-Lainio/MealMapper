-- Create the database if it does not exist
--CREATE DATABASE IF NOT EXISTS mealmapper_db;

-- Connect to the newly created or existing database
\c mealmapper_db

-- Define the schema for the database
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS diet (
    id INTEGER PRIMARY KEY,
    date TEXT,
    meal TEXT,
    food_item TEXT,
    url TEXT,
    calories INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

