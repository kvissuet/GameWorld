const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const Pusher = require('pusher');
const cors = require('cors');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const cups = require('./routes/api/cups');

const app = express();

//Body parser middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//pusher for chatroom
const pusher = new Pusher({
    appId: '589385',
    key: 'dbe92bc6f496b1f8e3bd',
    secret: 'fc1ef3e23eb40d6681bc',
    cluster: 'us2',
    encrypted: true
});



//DB Config
const db = require('./config/keys').mongoURI;

// Connect to mongodb
mongoose
  .connect(db)
  .then(() => console.log("Mongodb connected"))
  .catch(err => console.log(err));

app.get('/helloworld', (req,res) => res.send("Hello World!") );

// Passport Middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/cups', cups);

//Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

//Chatroom api
app.post('/message', (req, res) => {
    const payload = req.body;
    pusher.trigger('chat', 'message', payload);
    res.send(payload)
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

