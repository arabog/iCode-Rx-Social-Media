Let's get stated:
npx create-react-app .
(d dot is impt)
Remove everyth in src folder except app.js &index.js

mk App.js like ds:
function App() {
	return (
		<div>

		</div>
	);
}

export default App;

And index.js like ds:
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,

	document.getElementById('root')
);

del everyth inside public except index.html
paste font link in d index.html head section
<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,700;0,900;1,500&display=swap" rel="stylesheet">
create a style.css inside public folder

run: npm start to start react in terminal

Go to: https://material-ui.com/getting-started/installation/

under installatn section copy: 
// with npm
npm install @material-ui/core

to use its svg icons, install:
// with npm
npm install @material-ui/icons

go here for material icons:
https://material-ui.com/components/material-icons/

Install ds snippet:
ES7 React/Redux/GraphQL/React-Native snippets
to be able to use short cut like ds
rfc giving:

import React from 'react'

export default function Feed() {
          return (
                    <div>
                              
                    </div>
          )
}

Search for css box shadow generator
and generate d shadow of ur choice

./sidebar.css : wn goint out of d present file
into anoda file on d same tree or line
../sidebar.css: wn going out of a folder

<!-- add react-route-dom -->