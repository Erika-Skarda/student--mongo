const express = require('express');
const mongoose = require('mongoose');

let router = express.Router();
const Student = mongoose.model('Student');

router.get('/', (req, res) => {
  res.render('student/addOrEdit', {
    viewTitle: 'Insert Student'
  })
});

router.post('/', (req, res) => {
  if(req.body._id === '') {
    insertRecords(req, res)
  } else {
    updateRecords(req, res)
  }
});

function insertRecords(req, res) {
  let student = new Student();
  student.fullName = req.body.fullName;
  student.email = req.body.email;
  student.mobile = req.body.mobile;
  student.city = req.body.city;
  student.save((err, doc) => {
    if(!err) {
      res.redirect('student/list')
    } else {
      console.log('Error during insert: ' + err)
    }
  });
}

function updateRecords(req, res) {
  Student.findOneAndUpdate(
    {
    _id: req.body._id
    },
    req.body,
    { new: true },
    (err, doc) => {
      if(!err) {
        res.redirect('student/list');
      } else {
        console.log('Error during updateRecord: ' + err);
      }
    }
  );
}

router.get('/list', (req, res) => {
  // console.log(res)
  Student.find((err, docs) => {
    if (!err) {
      res.render('student/list', {
        
        list: docs
      })
    } else {
      console.log('Error in retrieval: ' + err)
    }
  });
});

router.get('/:id', (req, res) => {
  Student.findById(req.params.id, (err, doc) => {
    if(!err) {
      res.render('student/addOrEdit', {
        viewTitle: 'Update Student',
        student: doc,
      });
      console.log(doc);
    }
  });
});

router.get('/delete/:id', (req, res) => {
  Student.findByIdAndDelete(req.params.id, (err, doc) => {
    if(!err) {
      res.render('student/list');
    } else {
      console.log('Error in deleting: ' + err);
    }
  });
});

module.exports = router