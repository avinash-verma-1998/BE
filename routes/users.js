var User = require("../User");
var Contacts = require("../Contacts");
var validator = require("validator").default;
var express = require("express");
var router = express.Router();

/* GET users listing. */
router.post("/createuser", function(req, res) {
  var signUpData = {};
  if (req.body.name && !validator.isEmpty(req.body.name))
    signUpData.name = req.body.name;
  if (req.body.email && validator.isEmail(req.body.email))
    signUpData.email = req.body.email;
  if (req.body.password && !validator.isEmpty(req.body.password))
    signUpData.password = req.body.password;
  if (req.body.address && !validator.isEmpty(req.body.address))
    signUpData.address = req.body.address;
  if (req.body.phone) signUpData.phone = req.body.phone;
  if (req.body.DOB) signUpData.DOB = req.body.DOB;
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      res.json({ msg: "user already exist with that email" });
    } else {
      User.findOne({ phone: req.body.phone }).then(user => {
        if (user) {
          res.json({ msg: "user already exist with that phone contact" });
          return;
        } else {
          var newUser = new User(signUpData);

          newUser
            .save()
            .then(user => {
              console.log(user);
              res.json(user);
            })
            .catch(err => {
              console.log(err);
              res.json({ err: "error " });
            });
        }
      });
    }
  });
});

//remove users based on email

router.delete("/remove", function(req, res) {
  User.deleteOne({ email: req.body.email })
    .then(resp => {
      console.log(resp);
      res.json({ msg: "deleted." });
    })
    .catch(err => {
      console.log(err);
    });
});

// adding user and contact based on their email
router.post("/add", function(req, res) {
  User.findOne({ email: req.body.user })
    .then(user => {
      if (user) {
        //find the user with email
        User.findOne({ email: req.body.contact }).then(userContact => {
          if (userContact) {
            // find contact with email
            Contacts.findOne({ user: user._id }).then(contact => {
              if (contact) {
                // if contact exists update
                if (contact.contacts.indexOf(userContact._id) < 0) {
                  contact.contacts.push(userContact._id);
                }
                contact.save().then(resp => {
                  res.json(resp);
                });
              } else {
                //create new Contact for user
                var tempContact = {};
                tempContact.user = user._id;
                tempContact.contacts = [userContact._id];
                var newContact = new Contacts(tempContact);
                newContact.save().then(resp => {
                  res.json(resp);
                });
              }
            });
          } else {
            res.json({ msg: "No user with contact email" });
          }
        });
      } else {
        res.json({ msg: "no user exists with this email" });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
