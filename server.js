var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
var http = require('http');
var fs = require('fs');

var clientHtml;

// read an html file
fs.readFile('clientApp.html', function (err, html) {
    if (err) {
        console.log(err);
        res.writeHead(500);
        return res.end('Error loading client.html');
    }
    clientHtml = html;
});

// create an http server
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(clientHtml)
}).listen(9090);

// create a collection(table) and insert a
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var myobj = { name: "Company Inc", address: "Highway 37" };
    db.collection("customers").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});