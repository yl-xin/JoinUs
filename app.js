const express = require('express');
const app = express();
const port = 3000;
const mysql=require('mysql');
const bodyParser = require("body-parser");
require('dotenv').config();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));

// step1 connect to mysql
var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password: process.env.dbPassword,
	database:'node_join_us'
});

app.get('/', 
	(req, res) => {
		// count users in DB
		const q= "SELECT COUNT(*) AS count FROM users";
		connection.query(q,(err,results)=>{
			if (err) throw err;
			// console.log(results[0]);
			var count = results[0].count; 
			res.render('home',{count:count});
		});
	});

app.post('/register',(req,res)=>{
	var person = {email: req.body.email};
 	connection.query('INSERT INTO users SET ?', person, function(err, result) {
 	console.log(err);
 	// console.log(result);
 	res.redirect("/");
	});
});


app.listen(port, () => console.log(`App listening on port ${port}!`));