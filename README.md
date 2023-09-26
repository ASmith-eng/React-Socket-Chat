# React-Socket-Chat

A MERN webchat application with socket.io for real-time message updates.

### Register and login
![Drift-app login page](./docs/drift_screenshot_login.png?raw=true)

### Chat page
![Drift-app chat page](./docs/drift_screenshot_chat.png?raw=true)

### Emoji picker
![Drift-app emoji picker](./docs/drift_screenshot_emojipicker.png?raw=true)

## Installation instructions

### npm install
    npm install ; cd ./public && npm install

Install packages for both server and client

### Add environment variables

    ├── public
    |   ├── public
    │   ├── src
    |   └── .env.local  
    ├── server
    |   ├── controllers
    |   ├── models
    |   ├── routes
    |   ├── index.js
    └── .env

Two .env files are required, one each for the client and server, and located according to the file structure above. Add your own configuration variables as shown below:

Server .env:
    PORT=         # The port on which the node.js server should listen - e.g. 5000
    MONGO_URL=    # Mongo URI connection string for your MongoDB database instance

Client .env.local:
    REACT_APP_PRODUCTION_HOSTNAME=  # Server hostname - will be used only in prod builds
    REACT_APP_SERVER_PORT=          # Server port - what port on the server the client should 
                                    #               make requests on