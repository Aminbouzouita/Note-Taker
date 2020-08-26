
const express = require(`express`);
const path = require(`path`);
const uniqid = require(`uniqid`);
const fs = require(`fs`);
const { json } = require(`express`);
const app = express();
const PORT = process.env.PORT || 3300;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`public`));

app.get(`/api/notes`, function (req, res) {
    var data = JSON.parse(fs.readFileSync(`./db/db.json`,`utf8`));
    return res.json(data);
});

app.post(`/api/notes`, function (req, res) {
    data = JSON.parse(fs.readFileSync(`./db/db.json`,`utf8`));
    var note = req.body;
    note.id = uniqid();
    data.push(note);
    fs.writeFileSync(`./db/db.json`,JSON.stringify(data));
    res.json(true);
});

app.delete(`/api/notes/:id`, async function (req, res) {
    data = JSON.parse(fs.readFileSync(`./db/db.json`,`utf8`));
    var id = req.params.id;
    var chosen = data.filter(note => note.id === id);
    fs.writeFileSync(`./db/db.json`,JSON.stringify(chosen));
    res.json(true);
});

app.get(`/notes`, function (req, res) {
    res.sendFile(path.join(__dirname, `./public/notes.html`));
});

app.get(`*`, function (req, res) {
    res.sendFile(path.join(__dirname, `./public/index.html`));
});

app.listen(PORT, function () {
    console.log(`App listening on PORT ` + PORT);
});
