var mysql = require('mysql');
 
function getRsvps(title, callback) {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '1234',
        database : 'weddingdb'
    });
    
    connection.connect(function (err) {
        if (err)
            throw err;
    });

    connection.query('SELECT title FROM rsvp WHERE title LIKE ?', [title] + '%', function (error, results, fields) {
        if (error) throw error;
        console.log('The selected title is: ', results);
        callback(null, results);
    });
    
    connection.end();
}

function createRSVP(confirmation, title, callback) {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '1234',
        database : 'weddingdb'
    });
    
    connection.connect(function (err) {
        if (err)
            throw err;
    });

    connection.query('UPDATE rsvp SET confirmation = ? WHERE title = ?', [confirmation, title], function (error, results) {
        if (error) throw error;
        console.log('1 Record updated');
        console.log(results);
        connection.query('SELECT id, title FROM rsvp WHERE title = ?', [title], function (err, results) {
            callback(err, { id: results[0].id, title: results[0].title });
        })
    });
}

function createGuest(guestData, callback) {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '1234',
        database : 'weddingdb'
    });
    
    connection.connect(function (err) {
        if (err)
            throw err;
        console.log('Successfully connected');
    });

    let duplicateGuest = [];

    let promises = [];

    for (let i = 0; i < guestData.length; i++) {
        promises.push(new Promise ((resolve, reject) => {
            connection.query('SELECT EXISTS(SELECT * FROM guest WHERE rsvp_id=? AND name=?) AS exist', [guestData[i].id, guestData[i].guestName], function (error, results) {
                if (error) throw error;
                //let queryString = 'EXISTS(SELECT * FROM guest WHERE rsvp_id=' + guestData[i].id + 'AND name=' + guestData[i].guestName + ')';
                console.log(results[0].exist);
                if (results[0].exist === 0) {
                    connection.query('INSERT INTO guest (name, rsvp_id, menu) VALUES (?, ?, ?)', [guestData[i].guestName, guestData[i].id, guestData[i].menu], function (error, results) {
                        if (error) throw error;
                        console.log('1 Record updated');
                        resolve();
                    });
                } else {
                    console.log('Guest already in database');
                    resolve({ success: false, guestName: guestData[i].guestName });
                    // duplicateGuest.push({ success: false, guestName: guestData[i].guestName });
                    // if (guestData.length - 1 === i) {
                    //     callback(error, duplicateGuest);
                    // }
                }
            });
        })) 
    }
    Promise.all(promises).then(results => {
        duplicateGuest = results.filter((item) => {
            return item;
        })
        callback(null, duplicateGuest);
    })
}

module.exports = {
    getRsvps,
    createRSVP,
    createGuest
};


// connection.query('UPDATE rsvp SET confirmation = ? WHERE title = ?', [confirmation, title], function (error, results) {
//     if (error) throw error;
//     console.log('1 Record updated');
//     console.log(results);
// });