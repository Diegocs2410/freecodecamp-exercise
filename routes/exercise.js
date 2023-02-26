const { newExercise ,getAllExcersicesByUser} = require('../controllers/exercises')
const router = require('express').Router()

router.route('/:userId/exercises').post(newExercise)
router.get('/:_id/logs', getAllExcersicesByUser )

module.exports = router