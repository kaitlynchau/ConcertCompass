The content below is an example project proposal / requirements document. Replace the text below the lines marked "__TODO__" with details specific to your project. Remove the "TODO" lines.

(__TODO__: your project name)

# Concert Compass

## Overview

(__TODO__: a brief one or two paragraph, high-level description of your project)

Concerts are a great way to spend time with friends while enjoying new and unique music. In a city like New York where there is an event always happening, it can be difficult to keep track of concerts happening nearby, as well as memorializing all the concerts that you have been to. 
Concert Compass solves just that!

Concert Compass is a web application that allows users to log all the concerts that they have attended. Users can register and login. Once they're logged in, they can create and view the different concerts that they have attended in the past or in the future. In addition, they can connect their Spotify to generate a list of upcoming concerts that they can add to the concert list. 


## Data Model

(__TODO__: a description of your application's data and their relationships to each other) 

The application will store Users, Concert Log, and Upcoming Concert Events by location.

* each users can attend many concerts (1- many user-concert)
* each user can have one associated spotify account (1-1 user-spotify)
* each concert can be attended by many users (many-many concert-user)

(__TODO__: sample documents)

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


## [Link to Commented First Draft Schema](db.mjs) 

(__TODO__: create a first draft of your Schemas in db.mjs and link to it)

## Wireframes

(__TODO__: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc.)

/list/create - page for creating a new shopping list

![login, home page](documentation/wireframe.png)

## Site map

(__TODO__: draw out a site map that shows how pages are related to each other)

Here's a [complex example from wikipedia](https://upload.wikimedia.org/wikipedia/commons/2/20/Sitemap_google.jpg), but you can create one without the screenshots, drop shadows, etc. ... just names of pages and where they flow to.

## User Stories or Use Cases

(__TODO__: write out how your application will be used through [user stories](http://en.wikipedia.org/wiki/User_story#Format) and / or [use cases](https://en.wikipedia.org/wiki/Use_case))

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can log a new concert that is either upcoming or attended.
4. as a user, I can view all of the concerts that I have attended or will attend.
6. as a user, I can view the automatically updated lists of concerts.

## Research Topics

(__TODO__: the research topics that you're planning on working on along with their point values... and the total points of research topics listed)


* (2 points) Semantic UI
  * use Semantic UI for front-end development
* (3 points) vite
    * used vite as build tool and task runner. 
* (2 points) ESlint
    * Integrate ESLint into my workflow
* (6 points) React
    * use React as the frontend framework, which is assigned 6 points.

10 points total out of 8 required points (___TODO__: addtional points will __not__ count for extra credit)


## [Link to Initial Main Project File](app.mjs) 

(__TODO__: create a skeleton Express application with a package.json, app.mjs, views folder, etc. ... and link to your initial app.mjs)

## Annotations / References Used

(__TODO__: list any tutorials/references/etc. that you've based your code off of)

1. [passport.js authentication docs](http://passportjs.org/docs) - (add link to source code that was based on this)
2. [tutorial on vue.js](https://vuejs.org/v2/guide/) - (add link to source code that was based on this)

