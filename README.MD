run npm install  
for installing all the dependencies.
npm start
for starting up the server.

replace mongouri in app js with local instance or online cluster

API------------------------------------------------------------------------------

For getting primes

GET http://localhost/prime/n/<number>

example http://localhost/prime/n/20

for getting primes upto 20.

---

For creating a user.

POST example using axios.
axios({
url: "http://localhost:2000/users/createuser",
method: "POST",
data: {
name: "test4",
password: "test4",
email: "test4@test.com",
password: "test4",
address: "test4",
phone: 1234,
DOB: Date.now()
}
})

---

adding users to a a contact

axios({
url: "http://localhost:2000/users/add",
method: "POST",
data:{
user:"test3@test.com",
contact:"test4@test.com"
}
})

---

deleting a user
axios({
url: "http://localhost:2000/users/remove",
method: "DELETE",
data:{
email:"test3@test.com"
}
})
