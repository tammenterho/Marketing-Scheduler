# Marketing Scheduler (working title)

### Currently

- **Login**: Login as user.
- **Register**: Register as user.
- **Forgot Password**: Reset your forgotten password.
- **Campaign List**: Explore a list of campaigns.
- **Create Campaign**: Create a new campaign.
- **Delete Campaign**: Admins can delete campaigns allways, users only if they are undone.
- **Filter Campaigns**: Filter campaigns by the date (past, current, upcoming).
- **Search Campaigns**: Filter campaigns by the name.
- **Campaign Status**: Admins have the ability to change campaigns status if it's done. Others have only view access to status.
- **Userlist**: Admins can view all the users.
- **Campaign Dialog**: View the whole campaign data when clicking the campaign.
- **Edit Campaign**: Edit campaign if it's undone.

For an visual example implementation, refer to the MMfront repository.

### Coming Soon

- **Delete User**: Admins can delete users.

## Installation

1. Clone the repository

   ```bash
   git clone https://github.com/tammenterho/Marketing-Scheduler.git
   cd Marketing-Scheduler

   ```

2. Install dependencies for the client and server

   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

## Configuration

1. Create a .env file for the server with the following information

   ```bash
   DATABASE_URL= mongodb connection string
   JWT_SECRET= your_secret_key
   LIVE_URL=http: localhost:4200 // or your client's URL
   MAIL_PASS= Google app password
   MAIL_USER= Your Gmail account
   ```

## Usage

1. Start/Create the MongoDB database.
   I am currently using [MongoDB Atlas free version](https://www.mongodb.com/atlas/database) and MongoDB Compass UI.

2. Start the server

   ```bash
   cd server
   npm run dev

   ```

3. Start the client

   ```bash
   cd client
   ng serve
   ```

## Password Reset via Email

The project uses Nodemailer for password reset via email. Check the .env file for settings and ensure that your Gmail account allows the usage. You must have gmail Two-Factor-Authentication on.

## Contribution Guidelines

We appreciate your interest in contributing to the project. However, at the moment, we are not accepting pull requests. If you have any suggestions, bug reports, or other feedback, please feel free to open an issue.

Thank you for your understanding.

Please make sure to update tests as appropriate.

<img width="1168" alt="ms-register" src="https://github.com/tammenterho/Marketing-Scheduler/assets/115658804/100d3730-0b80-4882-a709-5e35ea01d413">
<img width="1166" alt="ms-login" src="https://github.com/tammenterho/Marketing-Scheduler/assets/115658804/a8a63d1b-a96b-41f8-b9c5-f39ce2609fe3">
<img width="1138" alt="ms-createcampaign1" src="https://github.com/tammenterho/Marketing-Scheduler/assets/115658804/ca270b3c-6b17-48bb-bffd-2fdb3f3f2ca3">
<img width="1151" alt="ms-createcampaign2" src="https://github.com/tammenterho/Marketing-Scheduler/assets/115658804/b494ed97-2ae6-4797-9245-da9892714679">
<img width="1164" alt="ms-campaigns1" src="https://github.com/tammenterho/Marketing-Scheduler/assets/115658804/265f4ebe-cf4f-4c3f-aa08-b58050b20b1a">
<img width="1165" alt="ms-dialog1" src="https://github.com/tammenterho/Marketing-Scheduler/assets/115658804/03660f8c-13a8-4118-bb1c-554afecb4a81">

<img width="281" alt="ms-login-mobile" src="https://github.com/tammenterho/Marketing-Scheduler/assets/115658804/e6b1e7ac-8b33-4dce-b43b-bc9471e2d459">
<img width="283" alt="ms-campaigns-mobile" src="https://github.com/tammenterho/Marketing-Scheduler/assets/115658804/ac619a8b-0884-4c7a-a2ed-b311f9fa5505">

