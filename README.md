# This project was created for COSI-GROUP as a coding challenge

## Description

Reservation Callendar Application for hospitality establishments. Select a specific date and add/remove reservations.

## Deployed Version
https://cosi-calendar.netlify.app/

## App Usage

- click on a date Cell that you wish to edit
- this opens the ManageEvents component with the Reservations form
- enter name, table No, number of guests and arrival time (hh:mm)
- to delete a reservation click on a element in the list
- the reservations appear in two places:
  1. in the ManageEvents component
  2. in the Calendar Date Cell (hover to see full reservation)
  
![Screenshot (37)](https://user-images.githubusercontent.com/44854026/80090771-4e958d80-8560-11ea-9b1d-5c5d599d4f40.png)
![Screenshot (36)](https://user-images.githubusercontent.com/44854026/80090776-505f5100-8560-11ea-95b5-93eeb0d46971.png)

## Tech / Features

- React application using only functional components and hooks
- React animations with react-animations library
- Custom form validation
- CSS animations & custom properties
- CSS cross browser compatibility prefixes
- CSS Grid and Flexbox for the layout
- Data presistence with LocalStorage

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
