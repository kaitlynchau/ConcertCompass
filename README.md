The content below is an example project proposal / requirements document. Replace the text below the lines marked "__TODO__" with details specific to your project. Remove the "TODO" lines.

# Concert Compass

## Overview

Concerts are a great way to spend time with friends while enjoying new and unique music. In a city like New York where there is an event always happening, it can be difficult to keep track of concerts happening nearby, as well as memorializing all the concerts that you have been to. 
Concert Compass solves just that!

Concert Compass is a web application that allows users to log all the concerts that they have attended. Users can register and login. Once they're logged in, they can create and view the different concerts that they have attended in the past or in the future. In addition, they can connect their Spotify to generate a list of upcoming concerts that they can add to the concert list. 


## Data Model

The application will store Users, Concert Log, and Upcoming Concert Events by location.

* each users can attend many concerts (1- many user-concert)
* each user can have one associated spotify account (1-1 user-spotify)
* each concert can be attended by many users (many-many concert-user)


An Example User:

```javascript
{
  username: "tameImpalaLover2010",
  password: // a password hashed and salted,
  concerts: // an array of references to List documents
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

/add- page to add concert information

![adding task] (documentation/add_task.png)

## Site map

(documentation/sitemap.png)


## User Stories or Use Cases

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can log a new concert that is either upcoming or attended.
4. as a user, I can view all of the concerts that I have attended or will attend.
6. as a user, I can view the automatically updated lists of concerts.

## Research Topics


* (2 points) Semantic UI
  * use Semantic UI for front-end development
* (3 points) vite
    * used vite as build tool and task runner. 
* (2 points) ESlint
    * Integrate ESLint into my workflow
* (6 points) React
    * use React as the frontend framework, which is assigned 6 points.

13 points total out of 10 required points 


## [Link to Initial Main Project File](src/App.mjs) 

## Annotations / References Used

1. [Tutorial on react](https://react.dev/) - (/src)
2. [Mongoose Databases](https://cs.nyu.edu/courses/fall23/CSCI-UA.0467-001/_site/homework/04.html) - (src/db.mjs) 
