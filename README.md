# DevBank ATM Machine App

## Overview

The **DevBank ATM Machine App** is a web application built using React.js, designed to simulate an ATM machine experience. This application allows users to enter their PIN, check their account balance, and make withdrawals. is a great example of using React.js to create a functional and interactive web application.

## Deployment

The DevBank ATM Machine App is deployed in Vercel and can be accessed at the following address:

[https://atm-machine-dev-bank.vercel.app/](https://atm-machine-dev-bank.vercel.app/)

## Features

- **PIN Verification**: Users are required to enter their PIN (1111), which is checked against a PIN API to authenticate the user.

- **Account Balance Display**: Upon successful authentication, the user's current account balance is retrieved from the API and displayed on the screen.

- **Withdrawals**: Users can make up to three withdrawals, each for a specific amount.

- **Notes Dispensing**: The ATM machine dispenses the appropriate mix of notes (e.g., £5, £10, £20) based on the withdrawal amount and the available notes in the machine.

- **Overdraft Protection**: The ATM allows an overdraft of up to £100 and notifies users if they go overdrawn.

- **Testing**: Comprehensive unit tests using Jest have been written to ensure the reliability and correctness of the application.

## Project Details

- **Project Name**: DevBank ATM Machine App

- **Description**: A React.js web application that simulates an ATM machine, allowing users to check their account balance and make withdrawals.

- **Challenge**: The project was undertaken as part of a challenge to build an ATM web app with specific functionality, including PIN verification, balance display, withdrawals, notes dispensing, and overdraft protection.

- **Time Taken**: The project was completed in approximately 10-15 hours (well, it's including the time I was sitting in front of the screen just to figure out the logic, or sometimes I just stared at the color schemes and tried to design the mockup 😅. ).

## Technologies Used

- **React.js**: The application is built using the React.js library, enabling the creation of a dynamic and responsive user interface.

- **Jest**: Unit tests have been written using Jest to ensure the reliability and correctness of the application's functions and components.

## Getting Started

To run the DevBank ATM Machine App locally, follow these steps:

1. Clone the repository to your local machine:

   ```shell
   git clone <repository-url>
