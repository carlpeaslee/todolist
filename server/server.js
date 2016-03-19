var express = require("express");
var app = express();
var index = require("./routes/index");
var path = require("path");
var bodyParser = require('body-parser');
var pg = require('pg');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var connectionString;

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = true;
  connectionString = process.env.DATABASE_URL;
} else {
  connectionString = 'postgres://localhost:5432/todo';
}

pg.connect(connectionString, function(err, client, done){
  if (err) {
    console.log('Error connecting to DB!', err);
    //TODO end process with error code
  } else {
    var query = client.query('CREATE TABLE IF NOT EXISTS todo (' +
    'id SERIAL PRIMARY KEY,' +
    'task varchar(80) NOT NULL,' +
    'status integer NOT NULL,' +
    'notes text);'
  );

  query.on('end', function(){
    console.log('Successfully ensured schema exists');
    done();
  });

  query.on('error', function() {
    console.log('Error creating schema!');
    //TODO exit(1)
    done();
  });
}
});

app.set("port", (process.env.PORT || 5000));

app.use("/", index);

app.listen(app.get("port"), function(){
    console.log("Listening on port: ", app.get("port"));
});
