const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require ('cors');
const mongoose = require('mongoose');
const PORT = 4000;

let Client = require('./models/Clients');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/DB_pointApp',{
    useNewUrlParser: true
});

const connection = mongoose.connection;

connection.once('open', function(){
    console.log("MongoDB database connection established!");
})

app.listen(PORT, function(){
    console.log("Server is running on Port: " + PORT);
});

const routes = express.Router();

app.use('/clients', routes);

// Finding all the clients
routes.route('/').get(function(req, res){
    Client.find(function(err, clients){
        if(err){
            console.log(err);
        }
        else {
            res.json(clients);
        }
    })
})

//find by document
routes.route('/findByDoc/:document').get(function(req, res){
    let data = req.params.document;

    Client.findOne({'document': data}, function(err, clients){
        res.json(clients);
    })
})

//adding a new client
routes.route('/add').post(function(req, res){
    let client = new Client(req.body);

    client.save()
        .then(client =>{
            res.status(200).json({'Client': 'Client added successfully'});
        })
        .catch(err =>{
            res.status(400).send('Adding new client failed');
        })
})

routes.route('/update/:id').post(function(req, res){
    Client.findById(req.params.id, function(err, client){
        if(!client){
            res.status(404).send("Data is not found");
        }
        else{
            client.name = req.body.name;
            client.phone =  req.body.phone;
            client.document = req.body.document;
            client.pontuation = req.body.pontuation;
            client.adress = req.body.adress;
        }
    })
})