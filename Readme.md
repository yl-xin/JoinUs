## An simple Express App connected with mySQL
### Install [Express](https://expressjs.com/) and other node packages
1. Create a package.json to save all package records`npm init`
2. Install packages: `npm i express faker mysql dotenv --s`
3. Create app.js. Import express, set up routes and start server:
```
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
```
This app starts a server and listens on port 3000 for connections. The app responds with “Hello World!” for requests to the root URL (/) or route. 

### Connecting Express and mySQL
1. Connect app with DB with node [mysql](https://github.com/mysqljs/mysql) package
```
const mysql=require('mysql');
var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password: process.env.dbPassword,
	database:'node_join_us'
});
```
2. Count users in DB and response with that count:
```
app.get('/', 
	(req, res) => {
		// count users in DB
		const q= "SELECT COUNT(*) AS count FROM users";
		connection.query(q,(err,results)=>{
			if (err) throw err;
			// console.log(results[0]);
			var count = results[0].count; 
			res.send("We have "+count+" users in our DB!")
		});
	});
```

### Use EJS to enbed JS in HTML
1. install ejs `npm i ejs --s`
2. set up ejs `app.set('view engine','ejs');`
3. create an ejs file home.ejs in view directory and render it in app.js: `res.render("home");`
4. Pass `count` data into home.ejs as an object:
`res.render("home",{count:count});`
5. Write HTMl inside home.ejs. In EJS, run JavaScript inside `<%= %>` bracket. Access the count data:`<%=count%>`

### Run the app
Start running the app on server: `node app.js`