//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");  //challenge18
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/" , function(req,res){        //1st step
  res.render("home" , {para:homeStartingContent , home_posts:array_of_posts});

});

app.get("/about" , function(req,res){
  res.render("about" , {aboutcontent:aboutContent });
});
                                                   //5th step
app.get("/contact" , function(req,res){
  res.render("contact" , {contactcontent:contactContent });
});
app.get("/compose" , function(req,res){       //6th step
  res.render("compose");
});


let array_of_posts  = [];   // global array  challenge 11

app.post("/compose" , function(req,res){
  // console.log(req.body.title_of_blog);
  const posted_content = {                         //creating JS object to store input - challenge 10
    title :req.body.title_of_blog,
    postbody :req.body.content_of_blog
  };

  array_of_posts.push(posted_content); //challenge 11
  res.redirect("/");

});

app.get("/posts/:param1" , function(req,res){   //challenge 16 URL parameter
    let parameter = _.lowerCase(req.params.param1);
    array_of_posts.forEach(function(post){
     let   posttitle_alter = _.lowerCase([post.title]);       //CHALLENGE 18 was to make entered param and array obj title in same format
      // console.log(posttitle_alter);
      // console.log(parameter);
      if(posttitle_alter===parameter)
      {
        // console.log("match found");
        res.render("post" , {specificpost:post.title , specificpostpara:post.postbody});  //challenge 19 render individual post to new page
      }
      

  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
