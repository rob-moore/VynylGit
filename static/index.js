'use strict';

function createRepo() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const repoName = document.getElementById('repoBox').value;
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

  const token = window.btoa(`${username}:${password}`);
  sessionStorage.setItem('token', token);

  if (privateBox.checked === false) {
    payload.private = false;
  }

  fetch('https://api.github.com/user/repos', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    if (response.status >= 400) {
      return console.error('i had an error', response);
    } else {
      console.log('Repo created', response);
      return response;
    }
  })
  .catch(err => {
    console.log('error in post', err);
  });
}

function addDevelopmentBranch() {

}
// TODO: Run GET command from postman and put values into variables
// fetch(`https://api.github.com/repos/${username}/${repoName}/git/refs/head`, {
//   method: 'GET',
//   'Content-Type': 'application/json',
//   Accept: 'application/json',
// })
// .then(response => {
//   if (response.status <= 400) {
//     throw new Error('Server responded with error < 400');
//   }
//   const sha = response[0].object.sha;
//   return sha;
// })
//   .catch(next);
//
// // TODO: Run POST command to add development branch
// fetch(`//api.github.com/repos/${username}/${repoName}/git/refs`, {
//   method: 'POST',
//   'Content-Type': 'application/json',
//   body: {
//     ref: 'refs/heads/development',
//     sha,
//   },
// });
//
//
// // TODO: Run PATCH command from postman with custom variables to make development branch default
// fetch(`//api.github.com/repos/${username}/${repoName}`, {
//   method: 'PATCH',
//   'Content-Type': 'application/json',
//   body: {
//     name: `${repoName}`,
//     default_branch: 'development',
//   },
// });
//
//
// // TODO: Run PUT command from postman to add branch protection
// fetch(`//api.github.com/repos/${username}/${repoName}/branches/development/protection`, {
//   method: 'PUT',
//   'Content-Type': 'application/json',
//   body: {
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
//         'whoever',
//       ],
//       teams: [
//         'web',
//         'leads',
//       ],
//     },
//
//   },
// });
