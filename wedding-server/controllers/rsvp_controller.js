const rsvpDao = require('../dao/rsvp_dao');

function getRsvps(req, res) {

    const title = req.query.title;

    rsvpDao.getRsvps(title, function(err, rsvps) {
        if (err) {
            res.status(500).send();
            return;
        }
        res.status(200).send(rsvps);
    })
}

function createRSVP(req, res) {

    const title = req.body.title;
    const confirmation = req.body.confirmation;
    console.log(req.body);

    rsvpDao.createRSVP(confirmation, title, function (err, rsvp) {
        if (err) {
            res.status(500).send();
            return;
        }
        res.status(200).send(rsvp);
    });
}

function createGuest(req, res) {

    //const guestNum = req.body.guestNum;
    const guestData = req.body.guestData;
    // const guestName = req.body.guestName;
    // const id = req.body.id;
    // const menu = req.body.menu;
    console.log(req.body);

    rsvpDao.createGuest(guestData, function (err, guest) {
        if (err) {
            res.status(500).send();
            return;
        }
        console.log(guest);
        res.status(200).send(guest);
    });
}

module.exports = {
    getRsvps,
    createRSVP,
    createGuest
};