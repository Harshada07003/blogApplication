import express from "express";
import bodyParser from "body-parser";

const app=express();
const port=3000;

let posts = [
    {
      id: 1,
      title: "The Rise of Decentralized Finance",
      content:
        "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
      author: "Alex Thompson",
      date: "2023-08-01T10:00:00Z",
    },
    {
      id: 2,
      title: "The Impact of Artificial Intelligence on Modern Businesses",
      content:
        "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
      author: "Mia Williams",
      date: "2023-08-05T14:30:00Z",
    },
    {
      id: 3,
      title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
      content:
        "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
      author: "Samuel Green",
      date: "2023-08-10T09:15:00Z",
    },
  ];
  
  let lastId = 3;
  

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render("index.ejs", { posts :posts}); // Pass the posts array to the template
});


// Route to display the form for creating a new post
app.get("/posts/new", (req, res) => {
    res.render("modiffy.ejs", { heading: "New Post", submit: "Create Post" });
});


app.get("/posts/:id/edit", (req, res) => {
  const index = posts.findIndex(function(p) {
    return p.id === parseInt(req.params.id);
  });

  if (index === -1) {
    return res.status(404).send("Post not found");
  }
  res.render("editForm.ejs", { heading: "Edit Post", submit: "Update Post", post: posts[index] });
});

app.post("/posts",(req,res)=>{
    const newId=lastId+=1;
    const post={
        id:newId,
        title:req.body.title,
        content:req.body.content,
        author:req.body.author,
        date:new Date(),
    };
    lastId=newId;
    posts.push(post);
    res.redirect("/");
});

app.post("/posts/:id/delete",(req, res)=> {
  const index = posts.findIndex(function(p) {
    return p.id === parseInt(req.params.id);
  });
  
  if (index === -1) {
    return res.status(404).send("Post not found");
  }

  posts.splice(index, 1);
  res.redirect("/");
});

app.post("/posts/:id", (req, res) => {
  const index = posts.findIndex(function(p) {
    return p.id === parseInt(req.params.id);
  });

  if (index === -1) {
    return res.status(404).send("Post not found");
  }

  // Update the specific post
  if (req.body.title) posts[index].title = req.body.title;
  if (req.body.content) posts[index].content = req.body.content;
  if (req.body.author) posts[index].author = req.body.author;

  res.redirect("/");
});

app.listen(port,()=>{
  console.log(`listening on port ${port}`);
});