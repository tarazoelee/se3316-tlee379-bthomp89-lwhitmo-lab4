const express = require("express");
const router = express.Router();
const { db } = require("../../util/admin");
const {complaints} = require('../Handler/Complaints.js');
router.get('/', complaints)


router.post('/create', (req,res)=>{
    const name= req.body.name;
    const date= req.body.date;
    const complaint=req.body.complaint;
    addComplaint(name, complaint, date)
    res.send()
})

async function addComplaint(name, complaint, date){
    const res = await db.collection('Complaints').add({
        Name: name,
        Complaint: complaint,
        date: date,
      });
      
      console.log('Added document with ID: ', res.id);
}

module.exports = router;