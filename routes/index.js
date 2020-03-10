var util = require("../util");

var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res) {
  res.render("index", { title: "Express" });
});

router.get("/prime/n/:num", function(req, res) {
  var num = Number.parseInt(req.params.num);
  var primeArr;
  if (num === num) {
    primeArr = util.sieve(num);
  } else {
    return res.json({ error: "Number Expected" });
  }

  var data = {
    primes: primeArr
  };

  res.json(data);
});

module.exports = router;
