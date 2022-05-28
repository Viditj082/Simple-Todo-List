

const express=require('express')


const app=express()

const bodyparser=require('body-parser')

const ejs=require('ejs');
const { redirect } = require('express/lib/response');
const req = require('express/lib/request');


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


app.get('/deleteall',(req,res)=>{
    listitems=[];
    res.redirect('/')
})
app.get('/delete/:id',(req,res)=>{

    let n=req.params.id

    for(let i=n-1;i<listitems.length-1;i++)
    {
        listitems[i]=listitems[i+1];
    }
    listitems.pop();

    res.redirect('/')

})

app.get('/pop',(req,res)=>{
    listitems.pop();
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