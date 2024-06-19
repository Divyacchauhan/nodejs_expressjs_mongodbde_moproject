module.exports = app =>{
    const tutorials = require('../controllers/index.controller.js');

    var router = require('express').Router();

    //create new collectiondata
    router.post("/",tutorials.create);

    //retrive the all collectiondata
    router.get("/",tutorials.findAll);

    //retrive single collectiondata with id
    router.get("/:id",tutorials.findOne);

    //retrive the  update document
    router.put("/:id",tutorials.update);

    //find all publised data
    router.get("/published",tutorials.findAll);

    //delte by id document
    router.delete("/:id",tutorials.delete);

    //delete all document
    router.delete("/",tutorials.deleteAll);

    app.use('/api/tutorials',router)
}