

const express=require('express')


const app=express()

const bodyparser=require('body-parser')

const ejs=require('ejs')


app.set('view engine', 'ejs');


app.use(bodyparser.urlencoded({extended:true}))


var listitems=[]

// Get
app.get('/',(req,res)=>{

    res.render('list',{date:getLocaleDate(),newlist:listitems})

})


// Post

app.post('/',(req,res)=>{
    
    if(req.body.task!='')
    listitems.push(req.body.task)
    res.redirect('/')

})

app.listen(process.env.PORT||9000,()=>{


    console.log('Server has started')
})



function getLocaleDate()
{
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

const d = new Date();
 
return d.getDate()+'th ' +monthNames[d.getMonth()] +", "+days[d.getDay()]
}