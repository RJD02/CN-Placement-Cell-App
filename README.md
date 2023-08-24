# Placement Cell(Server)
Server code for the full stack web application used to provide visual insights.

## Key Features:
1. Scaleable folder structure(separate controller, and routes)
2. Data Access Layer introduced, so that db switching can be done without changing controllers
3. Admin priviledge ensured
4. Mail service implemented

## Tech Stack(Server):
* Nodejs(TypeScript)
* Express
* Mongoose with MongoDB
* Nodemailer

## Setup
1. Clone this repo inside your working directory
```bash
git clone https://github.com/RJD02/CN-Placement-Cell-App-Server.git
```
Be sure to install all dependencies

2. Start the mailhog server(you can get mailhog [here](https://github.com/mailhog/MailHog))

3. Start the mongo deamon

4. Now you can either run dev script
```bash
npm run dev
```
or
```bash
npm build
npm start
```
