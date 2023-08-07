
const Task = require('../models/Task');
const express = require('express');
const {verifyToken} = require('../common');
const router = express.Router();
router.get('/',verifyToken,async (req, res) => {
    let tasks=await Task.find();
    res.send( tasks);
    res.end();
});
router.delete('/:id',verifyToken, async (req, res) => {
  try{
    await Task.deleteOne({
        _id:req.params.id
    })
    res.status(200);
    res.send(await Task.find());
    res.end();
  }
  catch(err){
    console.log(err);
  };
 
});
router.post("/post",verifyToken,async(req, res)=>{
const task=new Task({
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority
})
try{
    await task.save();
    res.send(task);
    res.end();
}
catch(err){
    res.status(404);
    console.log(err);
    res.end();
}
});
router.put('/:id',verifyToken,async(req, res)=>{
  const id=req.params.id;
  const task=await Task.findOne({
    _id:id
  }) 
  if(task)
  {
    task.title=req.body.title;
    task.description=req.body.description;
    task.priority=req.body.priority;
  } 
  try{
    await Task.save();
    res.send(task);
    res.end();
  }
  catch(err) {
    console.error(err);
  };
});
module.exports = router;