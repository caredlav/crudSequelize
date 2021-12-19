const express = require('express');
const router = express.Router();
const actorsController = require('../controllers/actorsController');

router.get('/actors',actorsController.list);

module.exports=router;