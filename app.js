var express = require('express');
var path = require('path');
var ejs_layout=require('express-ejs-layouts')
var admin = require("firebase-admin");
var bodyParser = require('body-parser');

var app = express();
var serviceAccount = {
  "type": "",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": ""
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "url"
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
