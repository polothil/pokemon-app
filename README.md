# Instructions to run the app

1. Download the zip file/clone the project
2. Open the project folder in a code editor
3. Open the terminal/git-bash (go to the project folder) and run the command "npm i". This will install all dependencies.
4. Once all dependencies are installed, run "npm start" to start the app.

# Feature Details

1. Responsive
2. Feedback on API failure and network slowness
3. App consistes of two main components - Pokedex component displaying pokemon cards and Pokemon component displaying details of a particular pokemon
4. Possible to send direct link to view details of the pokemon
5. No CSS libraries/frameworks used
6. Used REST version of the API
7. Implemented endless scroll
8. Implemented search pokemon by name
9. Data persistence implemented. API will not be called on page mounting if data is available on local storage. If user scrolls down to the bottom, API will be called to append the list
10. Favorite pokemons list can be created.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
