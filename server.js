//Requires the various node modules used with the app.
var express = require('express');
var connection = require('./config/connection');
console.log(connection);

var app = express();

//Connect to MongoBD to recieve email messages.
//var mongo = require('Mongodb');

//Blocks header from containing information about the server.
app.disable('x-powered-by');

//Defines handlebars as our main layout.
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//Body-Parser allows us to use the post method in the contact form.
app.use(require('body-parser').urlencoded({
    extended: true
}));

var credentials = require('./credentials.js');
app.use(require('cookie-parser')(credentials.cookieSecret));

//Defines that the app is going to be run on port 3000.
app.set('port', process.env.PORT || 3000);

//Allows access to public directory.
app.use(express.static(__dirname + '/public'));

//Define routes. Req = request to http. Res = response that is sent back.
app.get('/', function(req, res) {
    res.render('index');
});

app.get('/home', function(req, res) {
    res.render('home');
});

app.get('/portfolio', function(req, res) {
    res.render('portfolio');
});

app.get('/contact', function(req, res) {
    res.render('contact', {
        csrf: 'CSRF token here'
    });
});

app.get('/thankyou', function(req, res) {
    res.render('thankyou');
});

app.post('/process', function(req, res) {
    var api_key = 'key-ef028d871a909001bf83346a7d69edfe';
    var domain = 'sandboxb4a01b77f4cf4315bd9550ab4efda3b5.mailgun.org';
    var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

    var data = {
        from: 'Liudmyla Website <postmaster@sandboxb4a01b77f4cf4315bd9550ab4efda3b5.mailgun.org>',
        to: 'redcard1016@yahoo.com',
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    };

    mailgun.messages().send(data, function(error, body) {
        console.log(body);
    });
    res.redirect(303, '/thankyou');
});

//Tells the app to listen to the port.
app.listen(app.get('port'), function() {
    console.log('Express started');
});
