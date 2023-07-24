const express = require('express');
const bodyParser  = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/BlogWebsite");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("Public"));      //For Making CSS works.
app.set('view engine','ejs');          //For making dynamic HTML


// Making the Model for Blog Website.
const blogSchema = new mongoose.Schema({
    title: String,
    descrip: String,
    data: String
});

const Blog = new mongoose.model('Blog',blogSchema);

// let objarr = [];

app.get('/',(req,res)=>{
    Blog.find({},(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render('index',{blogs: result});
        }
    })
});


app.get('/makenew',(req,res)=>{
    res.render('Make New Page');
});

app.get('/contact',(req,res)=>{
    res.render('common',{heading:'Contact Us',describeyourself:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam a quidem ab nihil placeat quas hic nostrum ipsam quos distinctio quasi, in sed dolores laborum nulla consequuntur molestiae officia ducimus voluptates. Harum dignissimos possimus fugiat veritatis placeat quo, quibusdam optio velit accusamus ullam nam veniam, explicabo, sunt et? Saepe dignissimos autem hic est explicabo amet eum rem. Quisquam est commodi assumenda nihil nam quam earum. Iste, laborum optio! Culpa dolor dolorem maiores voluptatem aut rem voluptates quasi quia dignissimos quaerat, molestias nesciunt! Veniam hic unde voluptatem qui quos tempora voluptates amet ducimus. Molestiae facere voluptatem beatae eaque mollitia laudantium, accusantium quasi repellat, fugiat delectus id ad voluptatum distinctio. Placeat in quas impedit facere vel quidem eum magni laborum dolorum molestias vitae atque aliquid dolor," });
})

app.get('/AboutMe',(req,res)=>{
    res.render('common',{heading:"About Me",describeyourself:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam a quidem ab nihil placeat quas hic nostrum ipsam quos distinctio quasi, in sed dolores laborum nulla consequuntur molestiae officia ducimus voluptates. Harum dignissimos possimus fugiat veritatis placeat quo, quibusdam optio velit accusamus ullam nam veniam, explicabo, sunt et? Saepe dignissimos autem hic est explicabo amet eum rem. Quisquam est commodi assumenda nihil nam quam earum. Iste, laborum optio! Culpa dolor dolorem maiores voluptatem aut rem voluptates quasi quia dignissimos quaerat, molestias nesciunt! Veniam hic unde voluptatem qui quos tempora voluptates amet ducimus. Molestiae facere voluptatem beatae eaque mollitia laudantium, accusantium quasi repellat, fugiat delectus id ad voluptatum distinctio. Placeat in quas impedit facere vel quidem eum magni laborum dolorum molestias vitae atque aliquid dolor,"});
})

app.post('/makenewpost',(req,res)=>{
    let temp = req.body.data.substring(0,300);
    temp = temp+"....";
    let blog1 = new Blog({
        title : req.body.heading,
        descrip : temp,
        data : req.body.data,
    }) 
    blog1.save((err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("Successfully Updated");
        }
    })
    res.redirect('/');
});

app.get('/posts/:object',(req,res)=>{
    let mytitle = req.params.object;
    Blog.findOne({title: mytitle},"title data -_id",(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render('common',{heading:result.title,describeyourself:result.data})
        }
    })
})



app.listen(8080,()=>{
    console.log('Sever is running at Port 8080');
})