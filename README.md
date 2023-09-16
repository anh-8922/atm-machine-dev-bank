# Building an ATM Machine App with React.js 

## Overview

The **💰 DevBank ATM Machine App 💰** is a web application built using React.js, designed to simulate an ATM machine experience.

## Story

Embark on the Payday Pokémon Challenge! Michael, eager to snag the latest Pokémon game for £270, needs your help to build a slick ATM web app. He must enter his secret PIN (1111), verified via our secure API, which reveals their account balance onscreen. Michael plans three withdrawals: £140, £50, and £90.

But watch out! Sneaky diggers are swiping our ATMs, so cash is limited: 4 x £5 notes, 15 x £10 notes, and 7 x £20 notes. Your mission? Dispense notes fairly, adjusting for shortages.

Here's the twist: the ATM allows overdrafts up to £100, with warnings for users. This challenge blends code and cash in a Pokémon-themed payday adventure. Will you help Michael catch 'em all while mastering his finances?"

## Deployment

The DevBank ATM Machine App is deployed in Vercel and can be accessed at the following address:

[https://atm-machine-dev-bank.vercel.app/](https://atm-machine-dev-bank.vercel.app/)

## Features

- **PIN Verification**: Michael required to enter his PIN (1111), which is checked against a PIN API to authenticate the user.

- **Account Balance Display**: Upon successful authentication, the user's current account balance is retrieved from the API and displayed on the screen.

- **Withdrawals**: User can make withdrawals, each for a specific amount.

- **Notes Dispensing**: The ATM machine dispenses the appropriate mix of notes (e.g., £5, £10, £20) based on the withdrawal amount and the available notes in the machine.

- **Overdraft Protection**: The ATM allows an overdraft of up to £100 and notifies user if he goes overdrawn.

- **Testing**: Comprehensive unit tests using Jest have been written to ensure the reliability and correctness of the application.

## Project Details

- **Project Name**: DevBank ATM Machine App

- **Description**: A React.js web application that simulates an ATM machine, allowing users to check their account balance and make withdrawals.

- **Challenge**: The project was undertaken as part of a challenge to build an ATM web app with specific functionality, including PIN verification, balance display, withdrawals, notes dispensing, and overdraft protection.

- **Time Taken**: The project was completed in approximately 10-15 hours (well, it's including the time I was sitting in front of the screen just to figure out the logic, or sometimes I just stared at the color schemes and tried to design the mockup 😅. ).

## Technologies Used

- **React.js**: The application is built using the React.js library, enabling the creation of a dynamic and responsive user interface.

- **Jest**: Unit tests have been written using Jest to ensure the reliability and correctness of the application's functions and components.

## Note
- **Take-away**: Through this project, I've gained valuable insights into two critical areas: transaction logic and cash handling. Building the app taught me how to manage user transactions effectively. I learned to handle various withdrawal amounts, monitor account balances accurately, and enforce overdraft limits for responsible financial management. Additionally, The limited notes in the ATM machine presented a real-world challenge. It encouraged me to think algorithmically to ensure the optimal distribution of notes during withdrawals, emphasizing the importance of efficient algorithm design for resource management.

- These experiences have not only enhanced my problem-solving skills but also provided practical knowledge in financial transaction management and algorithm optimization, which are applicable to a wide range of software development scenarios.

- At this stage, the app is a frontend project designed for a single user. In the future, I plan to expand this project into a full-stack application using the MERN stack, where I'll utilize MongoDB to establish a database for Users and notes. This setup will facilitate the implementation of PIN authentication and enable tracking of available notes, all aimed at delivering a comprehensive financial experience.

- If you have any question, do not hesitate to contact me at anh-dev@hotmail.com