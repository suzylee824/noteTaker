
var express = require("express");
var fs = require("fs");
var path = require("path");
const PORT = process.env.PORT || 7000;

var app = express();

//const mainDir = path.join(__dirname, "/public");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});


app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/favicon.ico", function(req, res) {
  res.status(404).send()
});

app.get("*", (req, res) => {
  res.send('not found',404);
})

app.post("/api/notes", function (req, res) {

  fs.readFile('db/db.json', 'utf-8', function(err, data){
    const db = JSON.parse(data);
    db.push(req.body);
    console.log(db);

    fs.writeFile('db/db.json', JSON.stringify(db), err=>{
      if(err) throw err;
      res.json('ok');
    });
  });
});

//save editted note
// app.post("/api/notes/:id", function (req, res) {
//   fs.readFile("db/db.json", "utf-8", function(err, data) {
//     const db = JSON.parse(data);
//     db.splice(title, 2)

//     fs.writeFile("db/db.json", JSON.stringify)
//   });
// });


app.delete("/api/notes/:id", function (req, res) {
  let id = req.params.id;
  fs.readFile("db/db.json", "utf-8", function (err, data) {
    const db = JSON.parse(data);
    db.splice(id, 1);

    fs.writeFile("db/db.json", JSON.stringify(db), err => {
      if (err) throw err;
      res.send("good");
    });
  });
});

app.get("*", (req, res) => {
  res.redirect("/");
})


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

