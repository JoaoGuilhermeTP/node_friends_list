const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gmail.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  // Send a JSON response containing the users array, formatted with an indentation of 4 spaces for readability
    res.send(JSON.stringify({users}, null, 4));
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/email/:email",(req,res)=>{
  // Extract the email parameter from the request URL
    const email = req.params.email;
    // Filter the users array to find users whose email matches the extracted email parameter
    let filtered_users = users.filter((user) => user.email === email);
    // Send the filtered_users array as the response to the client
    res.send(filtered_users);
});

// GET by specific ID request: Retrieve a single user with last name
router.get("/lastname/:lastName",(req,res)=>{
  // Extract the lastName parameter from the request URL
    const lastName = req.params.lastName;
    // Filter the users array to find users whose last name matches the extracted lastName parameter
    let filtered_users = users.filter((user) => user.lastName === lastName);
    // Send the filtered_users array as the response to the client
    res.send(filtered_users);
});


// POST request: Create a new user
router.post("/",(req,res)=>{
  const user = {
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    email: req.query.email,
    DOB: req.query.DOB,
  }
  users.push(user);
  res.send(`The user ${req.query.firstName} has been added successfully!`)
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  const email = req.params.email;
  const filtered_users = users.filter((user) => user.email === email);
  if (filtered_users.length > 0) {
    const filtered_user = filtered_users[0];
    // Check if there is new firstName
    const firstName = req.query.firstName;
    if (firstName) {
      filtered_user.firstName = firstName;
    }
    // Check if there is new lastName
    const lastName = req.query.lastName;
    if (lastName) {
      filtered_user.lastName = lastName;
    }
    // Check if there is new DOB
    const DOB = req.query.DOB;
    if (DOB) {
      filtered_user.DOB = DOB;
    }
    // Replace user
    users = users.filter((user) => user.email !== filtered_user.email)
    users.push(filtered_user);
    res.send(`User with email ${email} updated!`)
  } else {
    res.send(`User with email ${email} not found.`)
  };
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  const email = req.params.email;
  const filtered_users = users.filter((user) => user.email === email);
  if (filtered_users.length > 0) {
    users = users.filter((user) => user.email !== email);
    res.send(`User with email "${email}" deleted.`)
  } else {
    res.send(`User with email "${email}" not found.`)
  }
});


// PUT request: Sort list of friends by date of birth
router.put("/sort", (req, res) => {
  
})

module.exports=router;