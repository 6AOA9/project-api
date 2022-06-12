var express = require('express');
var router = express.Router();
const models = require('../models');
const { optionsTransformer } = require('../transformers/optionsTransformers');

/* GET home page. */
router.get('/settings', async function (req, res, next) {
	const result = {}
	const options = await models.Option.findOne({
		where: {
			optionKey: 'site_options'
		}
	})
	if (options) {
		result.options = optionsTransformer(JSON.parse(options.optionValue))
	}
	const categories = await models.Category.findAll()
	if (categories) {
		result.menu = categories
	}
	res.send(result)
});
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

module.exports = router;
