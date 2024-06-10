# Memories Project

## Overview
The "Memories" project is a web application that allows users to share and interact with personal memories. Users can create, edit, and delete their memories, as well as like and comment on others' posts. The platform aims to provide a seamless and engaging user experience with a focus on social interaction and multimedia content.

## Features
- User Authentication: Sign up and log in using email/password or Google account.
- Create Memories: Add new memories with titles, descriptions, tags, date/time, and images.
- Interact with Memories: Like and comment on posts, and view memories from other users.
- Search and Filter: Search memories by title and tags, and sort results by date.
- Donations: Support the project by buying the developer a coffee via PayPal.

## Technologies Used
- Frontend: React, Redux, Material-UI
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT, Google OAuth
- Payments: PayPal
- Deployment: Heroku, Netlify

## Getting Started
### Prerequisites
- Node.js
- MongoDB

### Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/JabedWeb/momories
    ```

2. Create a `.env` file in the root directory of the project and add the following environment variables:
    ```sh
    PORT=5000
    CONNECTION_URL=<your_mongodb_uri>
    PAYPAL_CLIENT_SECRET=<your_paypal_client_secret>
    PAYPAL_CLIENT_ID=<your_paypal_client_id>
    ```

3. Install the dependencies for the server:
    ```sh
    cd server
    npm install
    ```

4. Start the server:
    ```sh
    nodemon index.js
    ```

5. **Installing Client Dependencies:**
   Navigate to the client directory and install the necessary dependencies. It's important to use the `--legacy-peer-deps` flag with every package installation to avoid conflicts with peer dependencies. Here's how you can do it:

   ```sh
   cd client
   npm install --legacy-peer-deps
   ```

6. Start the client:
    ```sh
    npm start
    ```

7. Open your browser and visit `http://localhost:3000` to access the Memories project.



sb-wipt4720479232@personal.example.com
q*g0gk3J