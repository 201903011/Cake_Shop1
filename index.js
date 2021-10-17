const express = require('express')
const app = express()
const port = 3000

var con1 = require("./src/db/conn");
const User =  require("./src/db/user");
const Cart =  require("./src/db/cart");

var use1 = "";
var cart1 = null ;
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

app.get('/', async (req, res) =>{

    res.render('index.hbs',{Product})

})
app.get('/signin', async (req, res) =>{

    res.render('signin.hbs')
})
app.post('/login', async (req, res) =>{

	try {
		filter = { user_name :req.body.user_email , user_password: req.body.user_password} 
		use1 = await User.findOne(filter)
		
		res.redirect("/")

	} catch (error) {
		res.redirect('/login')
	}
    
})

app.get('/cake/:flavor', async (req, res) =>{

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

	if( use1 == "" || use1 == null )
	{
		res.redirect('/signin')
	}
    try {
		console.log(req.body)
		var price = 0 
		if( req.body.Kg.substr(0,1) == "0" ||  req.body.Kg.substr(0,1) == "1"  )
		{
			price = parseInt(req.body.Kg.substr(12,15))
		}
		if( req.body.Kg.substr(0,1) == "2" )
		{
			price = parseInt(req.body.Kg.substr(10, 14))
		}
		console.log(price)
		var newuser = new Cart() ;
		newuser.user_name 		=  use1.user_name ;
		newuser.user_email 		=  use1.user_email ;
		newuser.link 	=  req.body.link ;
		newuser.name 		=  req.body.name ;
		newuser.price 		=  price ;
		newuser.quantity 		=  req.body.Kg ;
	

	console.log(newuser, req.body) ;
	const xc = await newuser.save() ;
	res.redirect('/')
	

	} catch (error) {
		console.log(error)
	}
	
})

app.get('/showcart', async (req, res) =>{
	
	if( use1 == "" || use1 == null )
	{
		res.redirect('/signin')
	}
    try {
		filter = { user_name : use1.user_name }
		console.log(filter) 
		cart1 = await Cart.find()
		console.log(cart1)
		res.render('cart.hbs',{cart : cart1,total : 100})

	} catch (error) {
		console.log(error)
	}
	
									 
})
app.listen(port, () => console.log(`Example app listening on port port!`))