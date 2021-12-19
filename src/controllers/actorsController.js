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
    },
    detail: (req,res)=>{
        Actors.findByPk(req.params.id,{
            include: [{association: "peliculas"}]
        })
        .then(resultado=>{
            res.render('actorsDetail',{actor: resultado})
            console.log(resultado);
        })
        .catch(error=>console.log(error));
    },
    add: (req,res)=>{
        Movies.findAll()
        .then(movies=>{
            res.render('actorsAdd',{allMovies: movies});
        })
        .catch(error=>console.log(error));
    },
    create: (req,res)=>{
        Actors.create({
            first_name: req.body.title,
            last_name: req.body.last_name,
            rating: req.body.rating,
            favorite_movie_id: req.body.favorite_movie_id
        })
        .then(resultado=>{
            res.redirect('/actors')
        })
        .catch(error=>console.log(error));
    },
    edit: (req,res)=>{
        let requestActor= Actors.findByPk(req.params.id,{
            include: [{association: "peliculas"}]
        })
        let requestMovie=Movies.findAll()
        Promise.all([requestActor,requestMovie])
        .then(([actor,movie])=>{
            res.render('actorsEdit', {actor: actor, allMovies: movie})
            console.log(actor);
        })
        .catch(error=>console.log(error));
    },
    update: (req,res)=>{
        Actors.update({
            first_name: req.body.name,
            last_name: req.body.last_name,
            rating: req.body.rating,
            favorite_movie_id: req.body.favorite_movie_id,
        },{
            where: {
                id: req.params.id
            }
        })
        .then(resultado=>{
            res.redirect('/actors')
        })
        .catch(error=>console.log(error));
    },
    delete: (req,res)=>{
        Actors.findByPk(req.params.id)
        .then(resultado=>{
            res.render('actorsDelete',{actor: resultado})
        })
        .catch(error=>console.log(error));
    },
    destroy: (req,res)=>{
        Actors.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(resultado=>{
            res.redirect('/actors')
        })
        .catch(error=>console.log(error));
    }

}

module.exports=actorsController;