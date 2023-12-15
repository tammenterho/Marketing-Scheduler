# Marketing Scheduler (working title)

### Currently

This project currently features registration, login, and password reset functionalities.

### Coming Soon

- **Campaign List**: Explore a list of campaigns.
- **Create Campaign**: Have the ability to create a new campaign.

For an example implementation, refer to the MMfront repository.

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
