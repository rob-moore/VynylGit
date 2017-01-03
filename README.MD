## Really cool Vynyl Git tool

## Setup
* Clone repository
* `yarn install`
* `npm start`

## Process
I wanted to create an app that dealt with Github for in order to fill a need for the company but also to practice my javascript as well as making API calls, manipulating data, starting a project from scratch, and choosing what stack to use for my project.

This project was originally going to be handling all of the API calls with Express through the backend, however, given the time constraints the MVP is handling that on the front end. While everything currently works it is very insecure if it were to be released to the public for mass use.

With this being the MVP, there is still plenty of things to do. I'd like to incorporate OAuth for added security. There is also some more functionality that needs to be added. I need to add the ability to copy files from exsisting repos as well as make one more API call to set all the teams and the last of the permissions on the newly created repo.

For the frontend of this project I used [bulma](https://bulma.io). It's a really lightweight grid setup that was really easy to use. It's in a similar vein to Bootstrap, just much lighter it also seemed to follow a material design kind of setup that I really liked aesthetically.

I used [Postman](https://www.getpostman.com/) to create and test all of my API calls. I was really excited about this because I had wanted more postman experience for a while now. It was great for testing issues that I was a having.

## Challenges
There were plenty of challenges that I ran into with this project. Prior to the this project my javascript knowledge was really minimal. Many of the roadblocks that I ran into during the start of this project were related to sytnax.

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
