const express = require('express')
const app = express()
const port = 3000

var con1 = require("./src/db/conn");
const User =  require("./src/db/user");

app.use(express.static(__dirname))
app.use(express.static(__dirname+ "/views"))
app.use(express.json() )
app.use(express.urlencoded({extended:false}))

app.set("views engine","hbs")

app.get('/', (req, res) =>{

    res.render('index.hbs')
})
app.get('/signin', (req, res) =>{

    res.render('signin.hbs')
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

app.listen(port, () => console.log(`Example app listening on port port!`))