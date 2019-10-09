const express =require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

app.use((req, res, next) =>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}\n`;
    console.log(log);
    fs.appendFile('server.log', log, (err) => {
        if(err){
            console.log("Unable to log into server.log file");
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintain.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials/');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.set('view engine', 'hbs');

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle : 'Home Page',
        welcomeMessage : 'Welcome to the home page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle : 'About Page',
        welcomeMessage : 'Welcome to the about page !!'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage : 'Error 404 not found !!'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle : "Projects Page",
        welcomeMessage : "Welcome to the portfolio page. It shows the lsit of all the projects.."
    });
});

app.listen(port, () => {
    console.log(`Started server on port ${port}`);
});





