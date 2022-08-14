var express = require('express');
var path = require('path');
var ejs_layout=require('express-ejs-layouts')
var admin = require("firebase-admin");
var bodyParser = require('body-parser');

var app = express();
var serviceAccount = {
  "type": "service_account",
  "project_id": "messapplication-b833e",
  "private_key_id": "2290c6e58f8f9a77eb774b80d2e07c23e55fd17c",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCfVIVljYZI7PuC\nLROn8YKV6LHGJANgpNIge6KG5kvzTw+HQ8rw+1WI6t+MOpp8IBOGZ8QsqFrIDMkP\nRVZicZVpCy99SyKtez6JFwgH/LQlRPHIZlIIpjzI5E5dzH+7iMebk0muB7uUhGnt\nlWnqOCuzYxG7dTBVlXw/4CsGDGJE5gTkKtS5/vC0MtSKfU6LMeIYQeiYdB6EKSFo\nxe715+/F3RSetGKeDinkBk8FNzlmPuBf8j40Siju6ktU+ZU+VXCyWyRh1xSs1LTm\n81jewDkHHR2twuwV03Thb3RiyZ2j7tg0ot4yN9hQMn3IaIjsqEdNppbzoXVKOtd5\ncMU9KnoJAgMBAAECggEAEI+Ik4EBrooKTNIqXzwKNJJ0iumim7yZ9iQfpSmiBpLG\nxIqaeRCIqBPwoyrStJjhaqiVsoYXtIAmtFKCy3Xun5XY7GsfOjyrh/SHwkvE/jQz\ntN6Uw38i5YcccaGwO6H4jF5Da+Y0HDhkqbwMX5rRyQIgvVUtjlG8scd3NVhbbPl5\nFF3FSwz2W+jf/s5LsVyazPJAyGXMAxu5A/sAZs4/oSNIFhywPh75heYuezN9ueqV\nEDeaoRQNYoeTHIoQ0TT2kJltI1f+ARvEw+FPLjDQTXxArNYFL5XJpb9YwfgU1Now\n84J29/MmrFO4M/oXduRoQ2re8u9mFwDDQIfYpC7nkQKBgQDPQ+wifjOxf51OjtNT\nmxhLsQJ8+TtgEqZVPZ1dqHuvcfXktFNDYecLA8ElVjw5f6s66M0KWM9oUAvWNqP1\n74wwQD2xiNHLiCbvzzSTFMhRQaDxxw1XXngR6qMib7nokxpEEPmgGYcAVniUuChj\nsr1dFaaliHOG6N1vhBIZRLwLkQKBgQDEyzOPuff7SVbKGOkCT+EPFua9CCHFXdxx\ngVFlFL6SNmoVkfynTQ5o/JboLJG6NGfa+FlDaMFfvyXza7LVlq2jUfWyhPIzNyYx\n53lIQyP5etY76r3xJNBaz/Br7NaZtEo64p/5kLKpZ024w5LI1AU5uC4niKiLWi2i\nnLAjG26a+QKBgBFzeJhW4+dYBVit8eEiN+N3newD2Bn4uASJUYynOPLGt5twC2qq\n/ZcR09te7Wcx9qrZGxp568yuoLCCnT+B0d3mKsud53wplI2wdo7DuzIMQo7Y4aiv\njZCEnwOxQIfyis2cWEhAnftLTI/JCa2LSSJjRkq9uGxtgud2yUdTYDnhAoGAUc4S\nef2Zaxj6ffpK6g4ghTBE7HFz8GJrH7fdCQLNkWQTRzIvb7BlfBj79jmIvnnIbkrs\neEwUjmOcOAseBRGkzo5kbzg6ojWbqAUL8pEOZEe+xJt5J8Pg5M8ppwOF1dEPRlks\nnQacbjUmJtcNrnQMVAkPDpoNThhHfiBaS828dakCgYEAv7A+A3o8z5jB0DnjG8rn\nKQLQ4DAktTbTqgJhvhO8vc1h3RPC7udQo7KZtCUnfgxBAQBE0zYT3vljUN6fJqOf\nDFhHEfSIViPQh8PrJDe7yP2ti3n5hEtU962NMF67UOYkmSpHKEBlXzNJ7U5FTvry\n5M5pywNjeL/zjTBiwu8PD9k=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-81n2u@messapplication-b833e.iam.gserviceaccount.com",
  "client_id": "115596377420318004188",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-81n2u%40messapplication-b833e.iam.gserviceaccount.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://messapplication-b833e-default-rtdb.firebaseio.com"
});

const db =admin.database();
const ref=db.ref('murtis')

var all_murtis=[]
var murtis_list=[]
var name_selected=""


function myFunction(ref) {
  ref.on('child_added', (snapshot, prevChildKey) => {
    const newPost = snapshot.val();
    all_murtis.push(newPost)
    murtis_list.push(newPost)
    console.log('Author: ' + newPost.name  );
  });

}
myFunction(ref)
var first_time=true

// view engine setup
// app.use(ejs_layout);
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 8080;


app.get('/', function (request, response) {
  response.render('home',{newListItems:murtis_list,first:first_time,selected_name:name_selected});
  first_time=false
});

app.get('/book', function (request, response) {
  response.render('book',{first:first_time});
});

app.get('/contact', function (request, response) {
  response.render('contact');
});

app.get('/thankyou', function (request, response) {
  response.render('thankyou');
});

app.post('/selected', (req, res) => {
  const selected=req.body.example;
  name_selected=selected
  murtis_list=[]

  console.log("all murtis"+all_murtis.length);

  for(var i=0;i<all_murtis.length;i++){
    console.log(all_murtis[i].type+" "+selected);
      if(all_murtis[i].type.trim()==selected.trim() || selected.trim()=='सर्व'){
        murtis_list.push(all_murtis[i])
      }
  }

res.redirect('/')
});
 


app.post('/card_selected', (req, res) => {
  var id=parseInt(req.body.selected_id)
  console.log(murtis_list[id])
  res.render('info_card',{item:murtis_list[id]});

});



app.post('/submit_data', (req, res) => {
  var name=req.body.name;
  var mobile=req.body.mobile;
  var id=req.body.id
console.log(name);
console.log(mobile);

const ref=db.ref('customer')

  var newData={
    cid:id,
      cname:name,
      cmobile:mobile
   }
   ref.push(newData);
   res.redirect('/thankyou')
});


app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});
