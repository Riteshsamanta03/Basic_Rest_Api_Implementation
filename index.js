const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require('method-override');

app.use(express.urlencoded({extended:true}));

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));
app.use(express.static(path.join(__dirname , "public")));
app.use(methodOverride("_method"));

let posts = [
    {   
        id: uuidv4(),
        username: "ritesh-samanta",
        image: "https://i.ytimg.com/vi/OcN9D0dWQI4/maxresdefault.jpg",
        caption: "RESTful APIs use HTTP methods GET POST PATCH DELETE to manage resources efficiently in applications"
    },
    {
        id: uuidv4(),
        username: "arghya-ghosh",
        image: "https://raw.githubusercontent.com/xpertpk/express-snippets/main/icon.png",
        caption: "Express.js simplifies backend development using routing middleware and server handling in Node.js applications"
    },
    {
        id: uuidv4(),
        username: "biswanath-maiti",
        image: "https://blog.openreplay.com/images/serving-dynamic-html-using-embedded-javascript-ejs/images/hero.png",
        caption: "EJS helps create dynamic HTML pages using JavaScript and integrates easily with Express applications"
    },
    {
        id: uuidv4(),
        username: "sundar-samanta",
        image: "https://expressionengine.com/asset/img/add-on-icons/mx-uuid.png",
        caption: "UUID generates unique identifiers ensuring each resource or record remains distinct across systems and databases"
    },
    {
        id: uuidv4(),
        username: "developer-rahul",
        image: "https://www.matillion.com/uploads/cards/Blog-API.png",
        caption: "method-override enables PATCH and DELETE requests using POST in HTML forms maintaining RESTful API structure"
    },
    {
        id: uuidv4(),
        username: "iamritesh",
        image: "https://blog.logicwind.com/content/images/size/w1000/2020/10/7pryn9ls88giuc9m8cau.jpeg",
        caption: "npm manages packages dependencies and scripts helping developers build scalable applications efficiently in Node.js projects"
    },
    {
        id: uuidv4(),
        username: "ritesh_dev",
        image: "https://repository-images.githubusercontent.com/958314/195c4a80-7da7-11e9-9a33-54d9fffac84f",
        caption: "Nodemon automatically restarts server on file changes improving development speed and productivity in Node.js environments"
    },
    {
        id: uuidv4(),
        username: "api_expert",
        image: "https://miro.medium.com/v2/resize:fit:1400/0*zfteFouDU_fDepZf.jpg",
        caption: "HTTP methods GET POST PUT PATCH DELETE define communication rules between client and server in web applications"
    }
];


app.get("/posts" , (req , res)=>{
    res.render("index.ejs" , { posts });
})

app.get("/posts/new" , (req , res)=>{
    res.render("new.ejs");
});

app.post("/posts" , (req , res)=>{
    let {username , image , caption} = req.body;
    let id = uuidv4();
    posts.push({id , username ,image , caption});
    res.redirect("/posts")
});

app.get("/posts/:id" , (req , res)=>{
   let {id} = req.params;
   let post = posts.find((p)=> id === p.id);
   res.render("details.ejs" , {post});
});

app.get("/posts/:id/edit" , (req , res)=>{
   let {id} = req.params;
   let post = posts.find((p)=> id === p.id);
   res.render("edit.ejs" , {post});
})

app.patch("/posts/:id" , (req , res)=>{
    let {id} = req.params;
    let newCaption = req.body.caption;
    let newimage = req.body.image;
    let post = posts.find((p) => id === p.id);
    post.caption = newCaption;
    post.image = newimage;
    res.redirect("/posts");
})

app.delete("/posts/:id" , (req , res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> id != p.id);
   res.redirect("/posts");
})

app.listen(port , ()=>{
    console.log(`Servering running at port ${port}`);
});