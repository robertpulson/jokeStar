# jokeStar

A social media website using the MEAN stack.

# Progress so far

* Set up angular
* Added Node/Express
* Added Mongo and Mongoose - Realised that the MEAN stack is pretty mean and is going to take a lot of working out. 
* Changed jade for ejs. In retrospect I now see the value of Jade, however at this point I'm finding the amount of new technology overwhelming and am using ejs to minify this.
* MEAN stack now up and running. Users can register, login and signout. Users can only view the home page if they are signed in and will be re-directed when they sign out. When on the homepage users will see a random joke.
* Users can now post jokes, and star jokes. Jokes are associated with a user and populate the users data.

# ToDo

* Create a star model so a user can only star each joke once
* Implement user rating system
* Extract controllers, and factories from angular app.js
* Extract some routes from index.js
