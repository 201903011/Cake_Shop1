const express = require('express')
const app = express()
const port = 3000

var con1 = require("./src/db/conn");
const User =  require("./src/db/user");

var use1 = "";

var Product = require("./js/products");


var Strawberry = require("./js/strawberry");
var Chockolate = require("./js/chocklate");
var Oreo = require("./js/oreo");




console.log(Product, Strawberry) ;

app.use(express.static(__dirname))
app.use(express.static(__dirname+ "/views"))
app.use(express.json() )
app.use(express.urlencoded({extended:false}))

app.set("views engine","hbs")

app.get('/', (req, res) =>{

    res.render('index.hbs',{Product})
})
app.get('/signin', (req, res) =>{

    res.render('signin.hbs')
})
app.get('/cake/:flavor', (req, res) =>{

	console.log(req.params.flavor );

	var variat = "" ;
	var na = ""
	switch(req.params.flavor) {
		case 'Chocolate_Cakes':
		  variat = Chockolate
		  na = "Chockolate "
		  break;
		case 'RedVelvet_Cakes':
		  variat = Strawberry
		  na = "Strawberry "
		  break;
		case 'Oreo_Cakes':
		  variat = Oreo
		  na = "Oreo "
		  break;
		default:
			variat = Strawberry
			na = "Strawberry "
	  }

    res.render('strawberry.hbs',{ name1 : na 
								 	,variat})
									 
})
app.post('/create', async (req, res) =>{

    try {
		var newuser = new User() ;
	newuser.user_name 		=  req.body.username ;
	newuser.user_email 		=  req.body.email ;
	newuser.user_password 	=  req.body.password ;
	newuser.user_address 		=  req.body.address ;
	newuser.total_orders	= 0 ;
	

	console.log(newuser, req.body) ;
	const xc = await newuser.save() ;

	res.render('signin.hbs' , newuser  ) ;
		
	} catch (error) {
		
	}
	
})

app.post('/cart', async (req, res) =>{

    try {
		console.log(req.body)
		
	} catch (error) {
		
	}
	
})

app.listen(port, () => console.log(`Example app listening on port port!`))