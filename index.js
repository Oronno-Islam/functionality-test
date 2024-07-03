import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.set('view engine', 'ejs');

const port = 3000;

let blogs = [
    {
        id: 1,
        title: "Hello World",
        content: "This is a blog post."
    },
    {
        id: 2,
        title: "Another Post",
        content: "This is another blog post."
    },
    {
        id: 3,
        title: "Yet Another Post",
        content: "This is yet another blog post."
    }
];

app.get('/', (req, res) => {
    res.render('index.ejs', { blogs });
});

app.get('/add',(req, res)=>{
    res.render('add.ejs');
});

app.post('/add',(req, res)=>{
    const { title, content } = req.body;
    const id = blogs.length ? blogs[blogs.length - 1].id + 1 : 1;
    blogs.push({ id, title, content });
    res.redirect('/');
});

app.get('/:id/edit', (req,res)=>{
    const blog = blogs.find(blog => blog.id == req.params.id);
    res.render('edit', { blog });
});

app.put('/:id',(req, res)=>{    
    const { title, content } = req.body;
    const blog = blogs.find(blog => blog.id == req.params.id);
    if (blog) {
        blog.title = title;
        blog.content = content;
    }
    res.redirect('/');
});

app.delete('/:id', (req, res) => {
    blogs = blogs.filter(blog => blog.id != req.params.id);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

