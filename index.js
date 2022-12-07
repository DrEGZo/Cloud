let express = require('express');
let fs = require('fs');

let app = express();

app.get('/:id', (req, res, next) => {
    let id = req.params.id;
    fs.readFile(__dirname + '/sids.json', (err, data) => {
        if (err) throw err;
        let keys = JSON.parse(data);
        console.log(Date.now(), keys);
	for (let key in keys) {
            if (keys[key].expires < Date.now()) delete keys[key];
        }
        if (id in keys) {
            res.sendFile(__dirname + keys[id].file);
            // delete keys[id];
        }
        else next();
        /*fs.writeFile(__dirname + '/sids.json', JSON.stringify(keys), err => {
            if (err) throw err;
        });*/
    });
});

app.get('/admin', (req, res) => {
    
})

module.exports = app;
