# Stripe Payment Integration Project

## Overview
This project implements Stripe payment functionality using a MERN stack.

Go on the stripe dashboard there you will see Developer Option inside that there is API KEYS option over there generate two keys the publishable keys which goes into the frontend and the Secret Keys which goes into the Backend.

## Project Structure
STRIPE_PROJECT/
│── Backend/  # Node.js backend with Express and Stripe
│── Frontend/ # React frontend for the UI
│── .gitignore
│── README.md


## Installation & Setup
### Backend

cd Backend
npm install
npm start

### Frontend

cd Frontend
npm install
npm start


# Backend/.env
STRIPE_SECRET_KEY=your_secret_key

# Frontend/.env
REACT_APP_STRIPE_PUBLIC_KEY=your_public_key


