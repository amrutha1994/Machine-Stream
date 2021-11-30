# Machine Stream

Machine Stream is a React Web application for monitoring the current health and activity of the installed machines. Machines in this application are of two categores,
1. Microscopes
2. Measuring devices

With this application one can monitor these assets remotely in near real-time.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

### Requirements
- Node 14+
- NPM 5+ 

### Installation
- Git clone repository
- From the project directory, install the required dependencies using,

   `npm install`
- To run the project,

    `npm start`

Now the app starts running in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

- To Build the app for production use,
   
   `npm run build`
 This will build the app inside the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Key features

 #### Dashboard
  - Displays an overall summary of all machines that are running
  - Display the list of all machines in near real time
 
  #### Equipment Details
   - Details page to list the details of a particular machine
   - Event log to show the list of events of that machine
  
## Tech stack

1. React V17+ and mostly used functional components
2. Redux and Hooks to manage states
4. WebSockets to fetch real time data
5. Continous integration (GIT)
6. Good level of modularity
7. Tested in chrome browser
8. Deployed and tested in Docker

  
## Future Enhancements

These are some of the possible enhancement that can be done in the future,

 1. Implement filtering in dashboard to filter machines bases on type, status or any other 
 3. Create responsive screens for mobile
 4. Improve CSS styling
 5. Add unit test and test coverage
 6. Continous Deployment
 7. Improve optimization techniques
 8. Browser compatibility improvements

## Tools used

1. Visual Studio Code
2. Docker
3. Postman
4. Miro Board
5. Material UI App

## Demo

This application has been deployed in the AWS S3 storage. 

To access the application, click here http://machinestream.s3-website.ap-south-1.amazonaws.com/

## Screenshot
<img style="-webkit-user-select: none;margin: auto;cursor: zoom-in;background-color: hsl(0, 0%, 90%);transition: background-color 300ms;" src="https://user-images.githubusercontent.com/30403669/143992386-027a5c60-c772-48b1-804f-1979c5cdeddd.png" width="600" height="300">

<img style="-webkit-user-select: none;margin: auto;cursor: zoom-in;background-color: hsl(0, 0%, 90%);transition: background-color 300ms;" src="https://user-images.githubusercontent.com/30403669/143992445-b36e988e-0cfe-4fb2-a7b4-939b10f8b293.png" width="600" height="300">

