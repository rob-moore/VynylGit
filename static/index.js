'use strict';

const userToCreate = 'rob-moore';
let repoName;
let token;

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  return Promise.reject(new Error(response.statusText));
}

// Create Repo based on user input
function createRepo() {
  repoName = document.getElementById('repoBox').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const privateBox = document.getElementById('privateBox');
  const payload = {
    name: `${repoName}`,
    homepage: 'https://vynyl.com',
    auto_init: true,
    private: true,
    has_issues: false,
    has_wiki: false,
    has_downloads: true,
  };

  token = window.btoa(`${username}:${password}`);

  if (privateBox.checked === false) {
    payload.private = false;
  }

  return fetch('https://api.github.com/user/repos', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
  })
  .then(status)
  .catch(err => {
    console.log('error in post', err);
  });
}

//  Adds development branch and sets development to default
function addDevelopmentBranch() {
  return fetch(`https://api.github.com/repos/${userToCreate}/${repoName}/git/refs/head`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${token}`,
    },
  })
  .then(status)
  .then(response => response.json())
  .then(response => response[0].object.sha)
  .then(sha => {
    const payload = {
      ref: 'refs/heads/development',
      sha,
    };
    return fetch(`https://api.github.com/repos/${userToCreate}/${repoName}/git/refs`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${token}`,
      },
      body: JSON.stringify(payload),
    });
  })
  .then(() => {
    const payload = {
      name: `${repoName}`,
      default_branch: 'development',
    };
    return fetch(`https://api.github.com/repos/${userToCreate}/${repoName}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Basic ${token}`,
      },
      body: JSON.stringify(payload),
    });
  })
  .catch(err => {
    console.log('error in add development', err);
  });
}

// TODO: Sets branch permissions
// function setPermissions() {
//   const payload = {
//     required_status_checks: {
//       include_admins: true,
//       strict: true,
//       contexts: [
//         'continuous-integration/travis-ci', // Probably something different here
//       ],
//     },
//     required_pull_request_reviews: {
//       include_admins: false,
//     },
//     restrictions: { // This is where teams and specific users are specified for protections.
//       users: [
//         'rob-moore',
//       ],
//       teams: [
//         'web',
//         'leads',
//       ],
//     },
//
//   };
//   return fetch(`https://api.github.com/repos/${userToCreate}/${repoName}/branches/development/protection`, {
//     method: 'PUT',
//     headers: {
//       Authorization: `Basic ${token}`,
//       Accept: 'application/vnd.github.v3+json',
//     },
//     body: JSON.stringify(payload),
//   });
// }

// Main function that runs everything
function create() {
  createRepo()
  .then(addDevelopmentBranch);
  // .then(setPermissions);
}
//
//
// // TODO: Run PUT command from postman to add branch protection
