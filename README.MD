# Vynyl Git tool

## Setup
* Clone repository
* `yarn install`
* `npm start`

## Process
I wanted to create an app that dealt with Github for in order to fill a need for the company but also to practice my javascript as well as making API calls, manipulating data, starting a project from scratch, and choosing what stack to use for my project.

This project was originally going to be handling all of the API calls with Express through the backend, however, given the time constraints, the MVP is handling that on the front end. While everything currently works it is very insecure if it were to be released to the public for mass use.

With this being the MVP, there is still plenty of things to do. I'd like to incorporate OAuth for added security. There is also some more functionality that needs to be added. I need to add the ability to copy files from existing repos as well as make one more API call to set all the teams and the last of the permissions on the newly created repo.

For the frontend of this project I used [bulma](https://github.com/jgthms/bulma). It's a really lightweight grid setup that was really easy to use. It's in a similar vein to Bootstrap, just much lighter it also seemed to follow a material design kind of setup that I really liked aesthetically.

I used [Postman](https://www.getpostman.com/) to create and test all of my API calls. I was really excited about this because I had wanted more postman experience for a while now. It was great for testing issues that I was a having. Along with Postman, I also had a crash course with using the Chrome Developer Tools in more aspects than just editing HTML and CSS properties. I was able to leanr about the Network and Sources tab and just how much information is available to me about exactly what is happening with my API requests.

## Future
For the future of this project I plan on eventually deploying everything to a domain using docker and AWS. There will be a insecure deploy of this working MVP version of the app soon and I'll be continuing to add new features as the year progresses.

I'm also planning on implementing some kind of loading animation while everything is happening. At the moment there really isn't any feedback for the user that anything has happened.

There should also be some kind of email correspondence from the app. In a perfect world, a user will get an email from the app notifying them that their repo has been created and an email will also be sent to that user's respective lead in order to inform them of any admin changes that may or may not need to be made.

I'd also like to implement some automated testing for this app, probably [Mocha](https://mochajs.org/).

## Challenges
There were plenty of challenges that I ran into with this project. Prior to this project, my javascript knowledge was really minimal. Many of the roadblocks that I ran into during the start of this project were related to syntax.

After learning about syntax and several important built-in functions like `window.btoa` for handling the API token creation and `JSON.stringify()` for making my various data payloads readable. I started making my API calls with [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch). Overall it was fairly straightforward to get setup and start using right away. This also gave me plenty of practice with promises. I had heard about promises before but I hadn't really been able to apply the theory behind them into what I was doing until now. This also gave me some really good experience learning about error handling.

```
function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  return Promise.reject(new Error(response.statusText));
}
```

This block of code handles just about all of my errors I found it to be a really eloquent way of doing so. It simply checks to make sure that the status of the response from the API is a success and if it's not then it creates a new error and spits out the reason why.

One of the other things that I ran into was making API calls using `https` instead of just `http`. For example:

```return fetch('https://api.github.com/user/repos', {...}```

This is one of my API calls. Before I was simply using `//api.github.com/user/repos` for the address, letting the browser decide what to use based on what the current domain uses. Github's API was throwing an error because of the requests through `http` so it was a pretty easy fix, but it took a bit of digging to find.

Another issue that I ran into was one with isomorphic-fetch returning a `ReadableStream` after an API call when it should have been JSON. This was because there were a few steps that I was missing in my promise.

```
.then(status)
.then(response => response.json())
.then(response => response[0].object.sha)
.then(sha => ...
```

This block of code is from the `addDevelopmentBranch()` function. It runs our error handler above then takes the response and converts it to JSON, then grabs the data we need. In this case it's the sha of the of the repositry, then it makes the payload to send to github in order to create a development branch on the new repo.
