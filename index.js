import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let data = {posts: []};
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
let prevPage,password, prevPost;
let count=0;

//HomePage
app.get("/", (req, res) => {
  res.render("index.ejs",data);
  if(prevPost){
    prevPost.visible = false;
  }
});

app.post("/submit",(req,res)=>{
    let post ={
        title: req.body["title"], 
        password: req.body["password"], 
        visible: false , 
        content: req.body["content"], 
        htmlContent: `<a href ="/${count}" >${req.body["title"]}</a>`,
        address: `${count++}`
    }
    data.posts.push(post);
    res.redirect("/");
});

for(let i=0; i<100; i++){
    app.get(`/${i}`,(req,res)=>{

        res.render("post.ejs",data.posts[i]);
        prevPage = req.originalUrl;
        password = data.posts[i].password;
        prevPost = data.posts[i];
        if(prevPost){
            prevPost.visible = false;
          }
    });
}

//Posts
app.post("/submitPassword",(req,res)=>{
    if(password===req.body["password"]){
        prevPost.visible = true;
    }
    else{
        prevPost.visible = false;
    }
    res.redirect(prevPage);
});



app.listen(port, () => {
  console.log(`Listening to port ${port}.`);
});

