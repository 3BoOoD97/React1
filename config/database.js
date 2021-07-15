const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/users' , (err)=> {
    if (err){
        console.log(err)
    }
    else{
        console.log("work data")

    }
})
