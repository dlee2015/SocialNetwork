const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');
const request = require('request');
const config = require('config');

const Posts = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//retrieving user profile
router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id }).populate(
			'user',
			['name', 'avatar']
		);
		if (!profile) {
			return res.status(400).json({ msg: 'There is no profile for this user' });
		}

		res.json(profile);
	} catch (err) {
		console.log(err);
		res.status(500).send('Server Error');
	}
});

//updating user profile

router.post(
	'/',
	[
		auth,
		[
			check('status', 'Status is required')
				.not()
				.isEmpty(),
			check('skills', 'Skills is required')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			company,
			website,
			location,
			bio,
			status,
			githubusername,
			skills,
			youtube,
			facebook,
			twitter,
			instagram,
			linkedin
		} = req.body;

		//Build profile object
		const profileFields = {};
		profileFields.user = req.user.id;
		if (company) profileFields.company = company;
		if (website) profileFields.website = website;
		if (location) profileFields.location = location;
		if (bio) profileFields.bio = bio;
		if (status) profileFields.status = status;
		if (githubusername) profileFields.githubusername = githubusername;
		if (skills) {
			profileFields.skills = skills.split(',').map(skill => skill.trim());
		}

		// build social media object
		profileFields.social = {};
		if (youtube) profileFields.social.youtube = youtube;
		if (twitter) profileFields.social.twitter = twitter;
		if (facebook) profileFields.social.facebook = facebook;
		if (linkedin) profileFields.social.linkedin = linkedin;
		if (instagram) profileFields.social.instagram = instagram;

		try {
			let profile = await Profile.findOne({ user: req.user.id });

			//checks for existing profile
			if (profile) {
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				);

				return res.json(profile);
			}

			//Create a new profile if not found
			profile = new Profile(profileFields);
			await profile.save();
			res.json(profile);
		} catch (err) {
			console.log(err);
			res.status(500).send('Server Error');
		}
	}
);

//GET request to retrieve all profiles
router.get('/', async (req, res) => {
	try {
		let profiles = await Profile.find().populate('user', ['name', 'avatar']);
		res.json(profiles);
	} catch (err) {
		console.log(err);
		res.status(500).send('Server Error');
	}
});

//GET profile by userId
router.get('/user/:user_id', async (req, res) => {
	try {
		let profile = await Profile.findOne({ user: req.params.user_id }).populate(
			'user',
			['name', 'avatar']
		);
		if (!profile) {
			return res.status(400).json({ msg: 'Profile not  found' });
		}
		res.json(profile);
	} catch (err) {
		console.log(err);
		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Profile not  found' });
		}
		res.status(500).send('Server Error');
	}
});

//DELETE request to delete user, profile, post
router.delete('/', auth, async (req, res) => {
	try {
		//REMOVE posts
		await Posts.deleteMany({ user: req.user.id });
		//REMOVE profile
		await Profile.findOneAndRemove({ user: req.user.id });
		//REMOVE user
		await User.findOneAndRemove({ _id: req.user.id });
		res.json({ msg: 'User deleted' });
	} catch (err) {
		console.log(err);
		res.status(500).send('Server Error');
	}
});

//PUT request to show experience in profile
router.put(
	'/experience',
	[
		auth,
		[
			check('title', 'A title is required')
				.not()
				.isEmpty(),
			check('company', 'A company is required')
				.not()
				.isEmpty(),
			check('from', 'A starting date is required')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const {
			title,
			company,
			location,
			from,
			to,
			current,
			description
		} = req.body;

		const newExp = {
			title,
			company,
			location,
			from,
			to,
			current,
			description
		};

		try {
			const profile = await Profile.findOne({ user: req.user.id });
			profile.experience.unshift(newExp);
			await profile.save();
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

//DELETE EXPERIENCE FROM PROFILE
router.delete('/experience/:exp_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });

		//GET the remove index
		const removeIndex = profile.experience
			.map(item => item.id)
			.indexOf(req.param.exp_id);

		profile.experience.splice(removeIndex, 1);
		await profile.save();
		res.json(profile);
	} catch (err) {
		console.log(err);
		res.status(500).send('Server Error');
	}
});

//PUT request to show education in profile
router.put(
	'/education',
	[
		auth,
		[
			check('school', 'A school is required')
				.not()
				.isEmpty(),
			check('degree', 'A degree is required')
				.not()
				.isEmpty(),
			check('fieldofstudy', 'Field of study is required')
				.not()
				.isEmpty(),
			check('from', 'A starting date is required')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description
		} = req.body;

		const newEdu = {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description
		};

		try {
			const profile = await Profile.findOne({ user: req.user.id });
			profile.education.unshift(newEdu);

			await profile.save();

			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

//DELETE education from profile
router.delete('/education/:edu_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });

		//GET the remove index
		const removeIndex = profile.education
			.map(item => item.id)
			.indexOf(req.param.edu_id);

		profile.education.splice(removeIndex, 1);

		await profile.save();

		res.json(profile);
	} catch (err) {
		console.log(err);
		res.status(500).send('Server Error');
	}
});

//GET request to github profile
router.get('/github/:username', (req, res) => {
	try {
		const options = {
			uri: `https://api.github.com/users/${
				req.params.username
			}/repos?per_page=4&sort=created:asc&client_id=${config.get(
				'githubClientId'
			)}&client_secret=${config.get('githubSecret')}`,
			method: 'GET',
			headers: { 'user-agent': 'node.js' }
		};

		request(options, (error, response, body) => {
			if (error) {
				console.error(error);
			}
			if (response.statusCode !== 200) {
				return res.status(404).json({ msg: 'No Github profile found' });
			}
			res.json(JSON.parse(body));
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
