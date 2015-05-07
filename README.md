# comedy-test

The purpose of this tech test is to design a new website for the Comedy Store. The website must have the following features:

* Single Page
* User Log In
* Page shows random joke
* Random joke is different everytime, until limit of jokes is reached
* Display dates of upcoming comedy store events

I have decided to use Angular JS for this task, which will mean working with the MEAN stack (Mongo, Express, Angular and Node) for the first time.

# Progress so far

* Set up angular
* Added Node
* Added Express
* Added Mongo and Mongoose - Realised that the MEAN stack is pretty mean and is going to take a lot of working out. However Im making progress and will complete this project by the end of the week.
* Changed jade for ejs. In retrospect I now see the value of Jade, however at this point I'm finding the amount of new technology overwhelming and am using ejs to minify this.
* MEAN stack now up and running. Users can register, login and signout. Users can only view the home page if they are signed in and will be re-directed when they sign out. When on the homepage users will see a random joke. Next task is to save a list of the jokes to the db and to create a many-to-many relationship between jokes and users everytime a joke is displayed.
* Having trouble working out how to use many-to-many relationships with mongo, and the best way of solving the problem.
