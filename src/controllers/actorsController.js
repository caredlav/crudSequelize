const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;

const actorsController={
    list: (req,res)=>{
        Actors.findAll()
        .then(actors=>{
            res.render('actorsList',{actors})
        })
        .catch(error=>console.log(error));
    }

}

module.exports=actorsController;