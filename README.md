# Schedule Time App

Welcome to the Schedule Time App repository!

This application allows medical professionals to efficiently manage their appointments by creating accounts and scheduling appointments for their patients. It provides a user-friendly interface for doctors to input appointment dates and patient information, such as phone numbers, emails, names, and previous medical conditions. This version of the app utilizes Firestore as the database, while another version uses MySQL with a backend in Node.js and Express.

## Features

- **User Authentication**: Secure user authentication system for doctors to create accounts and log in securely.
- **Appointment Scheduling**: Simple interface for doctors to schedule appointments with patient information.
- **Patient Information Management**: Ability to store and update patient details, including contact information and medical history.
- **Data Persistence**: Utilizes Firestore for storing appointment and patient data, ensuring data persistence and reliability.

## Usage

1. **Sign Up/Login**: Doctors can sign up for a new account or log in with existing credentials.
2. **Appointment Creation**: Once logged in, doctors can schedule new appointments by providing the appointment date and patient information.
3. **Patient Management**: Doctors can view and manage patient details, including contact information and medical history.

## Installation

1. **Clone Repository**: Clone this repository to your local machine using `git clone https://github.com/scor19/simple-turn-app.git`.
2. **Install Dependencies**: Navigate to the project directory and install dependencies using `npm install`.
3. **Set Up Firestore**: Set up Firestore database and configure credentials. Update Firestore configuration in `src/database/firebase.js` with your credentials.
4. **Start Application**: Start the application using `npm start`. The app will be served at your android emulator.

## Notes

- **Modularization**: The modularization of the application is a work in progress and may require further refinement for better organization and scalability.

Feel free to explore and use the Medical Appointment Management App for your practice or project needs. Contributions and feedback are welcome!
