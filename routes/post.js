const router = require("express").Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
  console.log(req.user);

  res.json({
    posts: {
      title: 'My first post',
      desc: 'Random data you should not access'
    }
  })
});

module.exports = router;