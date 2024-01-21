# Project Setup Guide

## Step 1 🎯🎯 Install Node.js and npm

- Visit the [official Node.js website](https://nodejs.org/).
- Download and install the LTS (Long Term Support) version.
- npm (Node Package Manager) is included with Node.js.
- Download [VS Code editor](https://code.visualstudio.com/) to run this project.
- Download [MongoDB Compass](https://www.mongodb.com/try/download/compass) to visualize the database.

## Step 2 🎯🎯 Open VS Code Editor

- Open VS Code editor.
- Open the folder in VS Code with the name "project folder name".

## Step 3 🎯🎯 Obtain MongoDB URI

- Visit MongoDB Atlas on Google and sign up for a free account.
- Create a cluster and get the MongoDB URI. It should look like:
- mongodb+srv://<username>:<password>@cluster0.bgydh5k.mongodb.net/?retryWrites=true&w=majority

- Replace "YOUR_MONGODB_URL" in the `index.js` file with the obtained MongoDB URI.

## Step 4 🎯🎯 Open Terminal and Install Dependencies

- Open the terminal in VS Code.
- Check if you are in the correct path using the command:
- Install the required dependencies by running:
- Start the project by running:

--cmd
ls
npm install
npm start

## Step 5 🎯🎯 Project Confirmation

- If you see the following messages in the terminal:

  Server is running on port http://localhost:3001
  Your Mgdb data base connected

  You are good to go! Open your browser and go to http://localhost:3001 to access the project.

## You are good to go! ✅ 🙌🏆🥇🎯💯
