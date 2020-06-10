let moment = require('moment')
const express = require('express');
const router = express.Router();
const match = require('../models/User')


router.get('/', async (req, res) => {
    try {
        // res.send('Get Request');
        const list = await match.find()
        res.json(list)
    } catch (err) {
        res.send('error: ' + err)
    }
})

router.get('/result/:id', async (req, res) => {
    try {

        // let udate = req.params.date;
        const user = await match.findById(req.params.id)
        console.log(user)
        let m = moment(user.date)
        console.log("0---------", m.toString())
        m1 = m.subtract(4, 'h');
        console.log("1---------", m1);
        m = moment(user.date)
        let m2 = m.add(2, 'hours');
        console.log("2---------", m2);
        console.log("3---------", req.params.id)
        const query = await match.find({ $and: [{ date: { $lte: m2 } }, { date: { $gte: m1 } }, { _id: { $ne: req.params.id } }] });
        console.log(query)
        res.json(query)
    } catch (err) {
        res.send('error: ' + err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        // res.send('Get Request');
        const user = await match.findById(req.params.id)
        // let m = moment(user.date);
        // console.log(m.toString());
        res.json(user)
    } catch (err) {
        res.send('error from match/id: ' + err)
    }
})

router.post('/signup', async (req, res) => {
    m = moment(req.body.date)
    const newUser = new match({
        name: req.body.name,
        email: req.body.email
    })
    try {
        const a1 = await newUser.save();
        res.json(a1);
        res.header("Access-Control-Allow-Origin", "http://localhost:3000")
        res.header("Access-Control-Allow-Headers")
    } catch (err) {
        res.send('error');
    }
})
// user/
router.patch('/:id', async (req, res) => {
    try {
        const user = await match.findById(req.params.id)

        user.source = req.body.source;
        user.dest = req.body.dest;
        user.date = req.body.date;
        const a1 = await user.save()
        console.log("poop", user.date, " a1", a1.date)
        res.json(a1)
    } catch (err) {
        res.send('error: ' + err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const user = await match.findById(req.params.id)
        const a1 = await user.remove()
        res.json(a1)
    } catch (err) {
        res.send('error: ' + err)
    }
})

router.delete('/', async (req, res) => {
    try {
        const user = await match.find()
        user.map(a => {
            a.remove();
        })
        const a1 = await user.remove()
        res.json(a1)
    } catch (err) {
        res.send('error: ' + err)
    }
})

module.exports = router;