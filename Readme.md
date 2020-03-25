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
```
<h1>JOIN US</h1>
 
<p class="lead">Enter your email to join <strong><%= count %></strong> 
others on our waitlist. We are 100% not a cult. </p>
 
<form method="POST" action='/register'>
 <input type="text" class="form" name="email" placeholder="Enter Your Email">
 <button>Join Now</button>
</form>
```

### Add a POST route in app.js
1. Install [body-parser package](https://github.com/expressjs/body-parser) to parse request into a JS object. In terminal: `npm i --s body-parser`
2. In app.js, import body-parser:
```
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.post('/register',(req,res)=>{
	console.log(req.body.email);
});
```
2. insert the email into DB using mysql package:
```
app.post('/register',(req,res)=>{
	var person = {email: req.body.email};
 	connection.query('INSERT INTO users SET ?', person, function(err, result) {
 	console.log(err);
 	console.log(result);
 	res.redirect("/");
	});
});
```

### Add some styling
1. In app.js, tell express to take files in public directory and serve them to views: `app.use(express.static(__dirname+"/public");`
2. Add styling in app.css in public directory.

### Run the app
Start running the app on server: `node app.js`