

const express=require('express')


const mongoose=require('mongoose')

mongoose.connect('mongodb+srv://vidit082:9039915909@cluster0.cfrgu.mongodb.net/list',(err)=>{
    if(err)
    console.log(err)
    else
    console.log('Mongo connected !!')
})

const ListSchema=new mongoose.Schema(
    {
        listitem:{
            type:String,
            
        }
    }
)



const ListItem=mongoose.model('Item',ListSchema)


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
    
    listitems=[]

    getlistItems()

    setTimeout(()=>{ res.render('list',{date:getLocaleDate(),newlist:listitems})},2400)

})


// Post

app.post('/',(req,res)=>{
    
    if(req.body.task!='')
    addToDb(req.body.task)
    
    res.redirect('/')

})


app.get('/deleteall',(req,res)=>{

    ListItem.deleteMany({})
    listitems=[];
    res.redirect('/')
})

app.post('/delete',(req,res)=>{
    
    
  const checkedId= req.body.checkbox

  ListItem.findByIdAndRemove(checkedId,(err)=>{
      if(!err)
      console.log('Deleted checked Item !!')
      else
      console.log(err)

      res.redirect('/')
  })

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




function addToDb(item){

    let l1=new ListItem({
        listitem:item})
    
        l1.save()
}

function getlistItems(){
    
    ListItem.find((err,rows)=>{

       listitems=rows
       console.log(rows)
    })
    
    listitems.reverse()
}


