Express Portfolio API

This is the backend RESTful API for my personal portfolio website. It serves all portfolio data (profile, projects, skills, work experience) from a MongoDB database.

This backend is designed to be consumed by its companion Angular frontend, available at lpsinining16.github.io/angular-ui-portfolio/.

Tech Stack

Node.js: JavaScript runtime environment

Express.js: Web framework for Node.js

MongoDB: NoSQL database for data storage

Mongoose: Object Data Modeling (ODM) library for MongoDB

CORS: Middleware for handling cross-origin requests

Helmet: Middleware for securing HTTP headers

Morgan: Middleware for HTTP request logging

dotenv: Module for loading environment variables from a .env file

Prerequisites

Before you begin, ensure you have the following installed:

Node.js (LTS version recommended)

A MongoDB Atlas account (for your database)

Setup and Installation

Clone the repository:
(Replace your-username with your GitHub username)

git clone [https://github.com/your-username/express-portfolio-api.git](https://github.com/your-username/express-portfolio-api.git)
cd express-portfolio-api


Install dependencies:

npm install


Set up Environment Variables:
Create a .env file in the root of the project and add the following variables.

# Server Configuration
PORT=3000
API_VERSION=v1

# CORS Configuration (Your Angular App's URL)
CLIENT_ORIGIN=http://localhost:4200

# MongoDB Database Connection
# Get this string from your MongoDB Atlas cluster
# Make sure to add your database name (e.g., /portfolio)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.vzl7s42.mongodb.net/portfolio?retryWrites=true&w=majority


Running the Application

Seed the Database (One-Time Step):
Before you can run the server, you must populate your empty MongoDB database with the portfolio data.

npm run seed


This script will wipe the database collections and insert all data from src/data/mockData.js.

Run in Development Mode:
This will start the server with nodemon, which automatically restarts the server when you make file changes.

npm run dev


The server will be available at http://localhost:3000.

Run in Production Mode:
This runs the standard node command.

npm run start


API Endpoints

All endpoints are prefixed with /api/v1.

Method

Endpoint

Description

GET

/api/v1/profile

Fetches the main profile object.

GET

/api/v1/nav-links

Fetches the array of navigation links.

GET

/api/v1/projects

Fetches the array of all projects.

GET

/api/v1/skills

Fetches the array of all skill categories.

GET

/api/v1/work-experience

Fetches the array of all work experiences.