const express = require('express');

const auth = require('../auth');
const pets = require('../model/pets').Pets;
const users = require('../model/users').User;
let router = express.Router();

/**
 * Render the home page.
 */
 router.get("/", (req, res) => {
	// If user is not logged in redirect to index.pug otherwise redirect to /dashboard
  //res.render("index");
  if(req.user){
  	res.redirect("/dashboard")
  }
  else{
  	// redirect to index for login or signup
  	res.render("index");
  }
 /* pets.Pets.find({}, (err, docs) => {
        if(err){
          let error = "Something bad happened! Please try agian.";
          return res.render("home", {
          	error : err
          });
        }
        console.log("The pets fetched from DB ", docs);
        //res.locals.pets = docs;
        res.render("home",{
        	pets : docs
        });
      }) */

    });



router.get("/dashboard", auth.loginRequired, (req, res) => {
  console.log("get dashboard ");
  // Here I have to use populate to get the 
  let userString = {
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email
  };
  console.log("The pets array is ", res.locals.pets);
  
  pets.find({}, (err, docs) => {
    if(err){
      let error = "Something bad happened! Please try agian.";
      return res.render("home", {
        error : err
      });
    }
    console.log("The pets fetched from DB ", docs);
        //res.locals.pets = docs;
        users.find({email:req.user.email}, (err, result) => {
          if(err){
            let error = "Something bad happened! Please try agian.";
            return res.render("home", {
              error : err
            });
          }
          console.log("The user data fetched is ", result[0].pid);
          let arr = result[0].pid;
          if(arr.length > 0){
            for(let i=0; i< docs.length; i++){
              for(let j=0; j<arr.length;j++){
                if(arr[j].toString() == (docs[i]._id).toString()){
                  console.log("matchhhhhhhh");
                  docs[i].flag = 1;
                }
              }
              console.log("After each iteration ", docs);
            }
          }
            console.log("The set doc ", docs);
            res.render("home",{
              pets : docs
            });
          
        })
      }) 

 // res.render("dashboard", { userString: JSON.stringify(userString, null, 2) });
});

router.post("/dashboard", auth.loginRequired, (req, res) => {
	console.log("The req in /addPets is ", req.body);
	let arr = [];
  let selection;
  if(Array.isArray(req.body.vehicle)){
    selection = req.body.vehicle
  }else{
    selection = [];
    selection.push(req.body.vehicle);
  }
  for(let i =0 ; i< selection.length ; i++){
    console.log(JSON.parse(selection[i])._id);
  arr.push(JSON.parse(selection[i])._id);
  console.log("The arr is ", arr);
}
console.log("res.locals.pets ", res.locals.pets);
pets.find({}, (err, docs) => {
  if(err){
    let error = "Something bad happened! Please try agian.";
    return res.render("home", {
      error : err
    });
  }
  res.locals.pets = docs; 
  for(let i=0; i< res.locals.pets.length; i++){
    for(let j=0; j<arr.length;j++){
      if(arr[j] == res.locals.pets[i]._id){
        console.log("matchhhhhhhh");
        res.locals.pets[i].flag = 1;
        console.log(res.locals.pets[i]);
      }
    }
    console.log("After each iteration ", res.locals.pets);
  } 
  console.log(res.locals.pets)
  console.log("The email id is ", req.user.email);
  users.findOneAndUpdate({email : req.user.email}, {pid: arr}, {new: true}, (err, result) => {
    if(err)
      console.log(err);
    else{
      console.log(result);
      console.log("The pets array is ", res.locals.pets);
      res.render("home", {
        pets : res.locals.pets
      })
    }
  })
})
  
})

module.exports = router;