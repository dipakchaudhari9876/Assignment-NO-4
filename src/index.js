const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here
app.get("/",(req,res)=>{
    res.send("Hello World")
})

const errorHandler =(req,res,next)=>{
    let M = 1000000
    const {num1,num2} = req.body
    if(typeof(num1) !== "number" || typeof(num2) !== "number"){
        res.send({status:"Error",message:"Invalid Data Type"})
    }else if(num1<-M || num2<-M ){
        res.send({status:"Error",message:"Underflow"})
    }else if(num1>M || num2>M || num1+num2>M){
        res.send({status:"Error",message:"Overflow"})
    }else{
        next()
    }
}

app.post('/add',errorHandler,(req,res)=>{
    const {num1,num2} = req.body
    res.send({status:"success",message:`the sum of given two numbers, sum: ${num1+num2}`
    })
})

app.post('/sub',errorHandler,(req,res)=>{
    const {num1,num2} = req.body
    res.send({status:"success",message:`the difference of given two numbers, difference: ${num1-num2}`
    })
})
app.post('/multiply',errorHandler,(req,res)=>{
    const {num1,num2} = req.body
    res.send({status:"success",message:`the product of given two numbers, Result: ${num1*num2}`
    })
})
app.post('/divide',errorHandler,(req,res)=>{
    const {num1,num2} = req.body
    if(num2 == 0){
        res.send({status:"error",message:"cannot divide by 0"})
    }else{
        res.send({status:"success",message:`the division of given two numbers, Result: ${num1/num2}`
    })
    }
    
})


app.listen(port, () => console.log(`App listening on port ${port}!`))

// module.exports = app;