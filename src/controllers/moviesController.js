const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");


//Aqui tienen una forma de llamar a cada uno de los modelos
// const {Movies,Genres,Actor} = require('../database/models');

//Aquí tienen otra forma de llamar a los modelos creados
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    },
    //Aqui dispongo las rutas para trabajar con el CRUD
    add: function (req, res) {
        Genres.findAll()
        .then(generos=>{
            res.render('moviesAdd',{allGenres: generos})
        })
        .catch(error=>console.log(error))
    },
    create: function (req,res) {
        Movies.create({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
            genre_id: req.body.genre_id
        })
        .then(resultado=>{
            res.redirect('/movies');
        })
        .catch(error=>console.log(error));        
    },
    edit: function(req,res) {
        Movies.findByPk(req.params.id,{
            include: [{association: 'generos'}]
        })
        .then(resultado=>{
            res.render('moviesEdit',{Movie: resultado})
        })
        .catch(error=>console.log(error));
    },
    update: function (req,res) {
        Movies.update({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
            genre_id: req.body.genre_id
        },{
            where: {
                id: req.params.id
            }
        })
        .then(resultado=>{
            res.redirect('/movies')
        })
        .catch(error=>console.log(error));
    },
    delete: function (req,res) {
        Movies.findByPk(req.params.id)
        .then(resultado=>{
            res.render('moviesDelete',{Movie: resultado})
        })
        .catch(error=>console.log(error));
    },
    destroy: function (req,res) {
        Movies.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(resultado=>{
            res.redirect('/movies')
        })
        .catch(error=>console.log(error));
    }
}

module.exports = moviesController;