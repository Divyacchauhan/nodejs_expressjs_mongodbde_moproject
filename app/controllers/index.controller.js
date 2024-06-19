const db = require("../models");
 const CollectionData = db.tutorials;

 //create and save collection 

  exports.create = (req,res) =>{
    if(!req.body.title){
        res.status(400).send({
            x : "Content cannot be empty"
        })
        return;
    }
    const collectionData = new CollectionData({
        title : req.body.title,
        description : req.body.description,
        published : req.body.published ? req.body.published : false,
    });
    //save collection in the data base
    collectionData
    .save(collectionData)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            x : err.x || "Server not found"
        });
    });
  };
  //retrive the collectiondata from the database.

  exports.findAll = (req,res) => {
   const title = req.query.title
   var condition = title ? {title : {$regex : new RegExp(title), $options : "i"}} : {};

   CollectionData.find(condition)
   .then(data => {
    res.send(data);
   })
   .catch(err => {
   res.status(500).send({
         x : err.x || "Error occured while retriving the data"
      });
   });
  };

  
  //find a single collectiondata with an id.
  exports.findOne = (req,res) => {
    const id = req.params.id;

    CollectionData.findById(id)
    .then(data =>{
        if(!data){
            res.status(404).send({
                x : "Not found collectiondata with id" + id
            });
        }
        else{
            res.send(data)
        }
    })
    .catch(err =>{
        res.status(500).send({
            x : err.x || "Error retrieving collectuondata with id=" + id
        });
    });
  };

   //update a collectiondata by id in tne request
  exports.update = (req,res) => {
    if(!req.body){
        return res.status(400).send({
            x : "Data to update  it cannot be empty!"
        });
    }

    const id = req.params.id;

    CollectionData.findByIdAndUpdate(id,req.send, {useFindAndModify : false})
    .then(data=>{
        if(!data){
            res.status(404).send({
                x : `Cannot update the collectiondata with id =${id}. Maybe collectiondata was not found`
            });
        }
        else{
            res.send({
                x : "Document update Succesfully."
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            x : "Error updating the collectiondata with id = " + id
        });
    });
  }

  // deleted a collectiondata with the specified id in the request
  exports.delete = (req,res) => {
    const id = req.params.id;

    CollectionData.findByIdAndRemove(id)
    .then(data => {
        if(!data){
            res.status(404).send({
                x : `Cannot delete the data with id = ${id}. Maybe collectiondata was not found`
            });
        }
        else{
            req.send({
                x : "Data has been deleted successfully"
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            x : "Could not delete the data with id =" + id
        });
    });
  }

  //delete akk collectiondata from the database.
  exports.deleteAll = (req,res) => {
    CollectionData.delleteMany({})
    .then(data => {
        res.send({
            x : `${data.deletedCount} collectiondata were deleted succesfully`
        });
    })
    .catch(err => {
        res.status(500).send({
            x : err.x ||" some error occurred while removing all collectiondata."
        });
    });
  };

  //Find all published Tutorials.
  exports.findAllPublished = (req,res) =>{
    CollectionData.find({published : true})
    .then(data=>{
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            x : err.x || " Some errore occurred while retriving tutorials"
        })
    })
  }