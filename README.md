# Concert Compass

## Overview

Concerts are a great way to spend time with friends while enjoying new and unique music. In a city like New York where there is an event always happening, it can be difficult to keep track of concerts happening nearby, as well as memorializing all the concerts that you have been to. 
Concert Compass solves just that!

Concert Compass is a web application that allows users to log all the concerts that they have attended. Users can register and login using Spotify API. Once they're logged in, they can create and view the different concerts that they have attended in the past or in the future. In addition, they can view insights on their top artists, centralizing everything music into one applicaiton.


## Data Model

The application will store Venues and Concert Log. 

* each concert has one venue (1-1 user-venue)
* each venue can have multiple associated concerts (1-many user-account)


An Example Venue:

```javascript
{
  name: "Terminal 5",
  location: "New York, New York"
  artists: // an array of references to List documents
}

```
An Example Concert: 

```javascript
{
  concertID: //unique to specific concert 
  artist: //artist or band
  venue: 
  location: //city, state
  date:
  status: //attended, upcoming
}
```


## [Link to Commented First Draft Schema](src/db.mjs) 

## Wireframes

/home - page for viewing all concerts

![login, home page](documentation/login_home.png)

/add - page to add concert information

![adding task](documentation/add_task.png)

## [Site map](documentation/sitemap.png)


## Use Cases

1. As a user, I can view the concerts I attended or will attend.
2. As a user, I can log in to the site using Spotify.
3. As a user, I can log a new concert that is either upcoming or attended.
4. as a user, I can view all of the concerts that I have attended or will attend.
7. as a user, I can view insights on my top artists.

## Research Topics

* (3 points) dotenv Configuration Management
    * Used dotenv to store sensitive information regarding MongoDB database and auth for Spotify API.
* (2 points) ESlint
    * Integrate ESLint into my workflow, which is a code analysis tool to check Javascript code for format, syntax and code style violations. This helps ensure that my code is readable and clean.
* (6 points) Spotify API
   * Use Spotify API to gather information about concert artists and data from the user.
* (3 points) Build Tools : Makefile
   * Used Makefile to automate linting and compilation process.
14 points total out of 10 required points 


## [Link to Initial Main Project File](src/App.mjs) 

## Annotations / References Used

1. [Tutorial on react](https://react.dev/) 
  -  [Source](src)
2. [Mongoose Databases](https://cs.nyu.edu/courses/fall23/CSCI-UA.0467-001/_site/homework/04.html) 
  -  [Database](src/db.mjs)
3. [Spotify using Node](https://youtu.be/NA6acNDmSFo?si=U2YRKIBPH5r9W5qu)
  - [App](app.mjs)
