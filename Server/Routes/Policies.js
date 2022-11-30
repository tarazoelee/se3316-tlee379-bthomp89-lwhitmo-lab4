const express = require("express");
const router = express.Router();
const { db } = require("../../util/admin");
const {policies} = require('../handler/Policies');
router.get('/', policies)


router.get('/privacy', (req,res)=>{
    getPrivacy().then((data)=>{
        res.send(data)
       })
})

router.get('/aup', (req, res)=>{
    getAup().then((data)=>{
        res.send(data)
       })
})
router.get('/DMCA', (req, res)=>{
    getDMCA().then((data)=>{
        res.send(data)
       })
})

async function getPrivacy (){
    const res = await db.collection('Resources').doc('rVqvK2MY3HQfXg0IDqqt').get()
    const respond = res.data()
    return respond
}
async function getAup (){
    const res = await db.collection('Resources').doc('RHllETuvbgdspTbTADVi').get()
    const respond = res.data()
    return respond
}
async function getDMCA (){
    const res = await db.collection('Resources').doc('SLtskFeFs8lSEExMosfP').get()
    const respond = res.data()
    return respond
}
module.exports = router;