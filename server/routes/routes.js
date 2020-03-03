var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var ToDoList = require('../../models/todo');

router.get('/', function(req,res) {
    res.render('index');
});

router.route('/insert')
.post(function(req,res) {
 var item = new ToDoList();
 item.item = req.body.item;
 item.priority = req.body.priority;
item.save(function(err) {
      if (err)
        res.send(err);
      res.send('Item successfully added!');
  });
})

router.route('/update')
.post(function(req, res) {
 const doc = {
    item: req.body.item,
    priority: req.body.priority
 };
 console.log(doc);
  ToDoList.update({_id: req.body._id}, doc, function(err, result) {
      if (err)
        res.send(err);
      res.send('Item successfully updated!');
  });
});

router.get('/delete', function(req, res){
    var id = req.query.id;
    ToDoList.find({_id: id}).remove().exec(function(err, expense) {
     if(err)
      res.send(err)
     res.send('Item successfully deleted!');
    })
   });

   router.get('/getAll',function(req, res) {
     ToDoList.find(function(err, items) {
      if (err)
       res.send(err);
      res.json(items);
     });
    
   });

module.exports = router;