# TASK -3 CODTECH  BUILD A REAL-TIME COLLABORATION TOOL

*COMPANY* : CODETECH IT SOLUTION

*NAME* : ROCKY

*INTERN ID* : CT6WIID

*DOMAIN* : MERN STACK DEVELOPMENT

*DURATION* : 4 WEEKS

*MENTOR* : NEELA SANTOSH


# Sync Code: Realtime Collaborative Code Editor

## Introduction

Are you tired of sending code snippets back and forth, struggling to debug and collaborate with your team? Look no further! **Sync Code** is here to revolutionize the way you code together. This powerful and intuitive collaborative code editor is designed to empower developers, and teams to work seamlessly in real-time, regardless of their location. With **Sync Code**, you can code together, debug together, and ship faster, together.

## Features

- Multiple users can join a room and edit code together
- Changes are reflected in real time
- Copy button to copy the room id to clipboard
- Leave button to leave the room
- Supports syntax highlighting for different programming languages
- Users can choose theme based on their preferences
- Users can leave the room and rejoin later to continue editing
- Joining & leaving of users is also reflected in real time
- Backend Sport and all code save in database

### Prerequisites

#### For running locally

- Node.js (v20.11.1)
- npm (10.2.4)
- pm2 (5.3.1) : run `npm i -g pm2` to install pm2 globally

**Note:** I have used nvm (v0.39.7) to manage my node versions. View nvm official [documentation](https://github.com/nvm-sh/nvm) to install it.

## Tech Stack

- React.js
- Node.js
- Express.js
- Socket.io
- CodeMirror
- React-hot-Toastify

## Installation

### Running via Docker Image (highly recommended)

To run the docker image, follow the steps below:

1. Install [Docker](https://www.docker.com/) on your machine.
2. Pull the docker image from the docker hub by running `docker pull mohitur/code-editor`
3. Run the docker image by running `docker run -p 8000:8000 -p 3000:3000 -p 5000:5000 mohitur/code-editor`
4. Go to `http://localhost:3000` to view the app
5. Create a room by clicking on the `create new room` button and put a username of your choice
   5 . Copy the room id by clicking on the `Copy ROOM ID` button
6. To join as an another user open another browser/browser-window or an incognito tab and go to `http://localhost:3000`
7. Enter the same room id to join the same room

Now both your editor will be synced and you can see the changes in real time. Try opening the same room in multiple browsers/browsers-windows and see the changes.

**Note:** If you are using docker in wsl2/linux then add `sudo` before the docker commands.

### Running via building your own Docker Image

To run the app using docker, follow the steps below:


### Clone the Repository
```sh
git clone https://github.com/RockySheoran/Real-time-collaboration-app.git

```

## Backend Setup
Navigate to the backend directory:
```sh
cd backend
```

Install dependencies:

```sh
npm install
```


Start the backend server:

```sh
npm run server
node index.js
```
## Frontend Setup
Navigate to the frontend directory:

```sh

cd realtime-editor
```

Install dependencies:
```sh

npm install
```

Start the frontend server:
```sh

npm start
```


## Project screenshot 
![Image](https://github.com/user-attachments/assets/a03d66bc-3bac-4829-a8e3-074b042113f0)
![Image](https://github.com/user-attachments/assets/2aad52da-32f9-4d50-b651-ba846e796601)
![Image](https://github.com/user-attachments/assets/1aa29917-2eea-41c0-8b3e-fe0b436d4fd5)

## Future Scope

1. [x] Added syntax highlighting for multiple languages
2. [x] Added support for multiple themes
3. [x] Added support for saving the last theme and language selected by the user in local storage
4. [x] Add support to accept or reject new users trying to join the room
5. [ ] Add to implement video and voice chat feature inside the editor
6. [ ] Add support for local code file uploading

## Open Source Contribution

If you want to make contribution to this projects, follow the steps below:

1. Fork this repository
2. Clone the forked repository <br>

```
git clone https://github.com/RockySheoran/Real-time-collaboration-app.git
```

3. cd into the cloned repository
4. Create a new branch <br>

```
git checkout -b your_branch_name
```

5.  Make your changes
6.  Commit and push your changes <br>

```
git add . <br>
git commit -m "your commit message" <br>
git push origin your_branch_name
```

7. Finally, create a pull request by visiting your forked repository on GitHub

**Note:** Please make sure to use your own branch when contributing.

