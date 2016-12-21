'use strict';

function createRepo() {
  const userInput = document.getElementById('repoBox').value;
  // TODO: Variable for github username through Auth

  const privateBox = document.getElementById('privateBox');
  const payload = {
    name: `${userInput}`,
    homepage: 'https://github.com',
    auto_init: true,
    private: false,
    has_issues: false,
    has_wiki: false,
    has_downloads: true,
  };

  if (privateBox.checked === true) {
    payload.private = true;
    return true;
  }
  console.log(payload);
}

// TODO: Run GET command from postman and put values into variables
// https://api.github.com/repos/rob-moore/postmanTest/git/refs/head

// TODO: Run POST command to add development branch
// https://api.github.com/repos/rob-moore/postmanTest/git/refs
// {
//     "ref": "refs/heads/development",
//     "sha": "HASH FROM GET"
// }

// TODO: Run PATCH command from postman with custom variables to make development branch default
// https://api.github.com/repos/rob-moore/postmanTest
// {
// "name": `${userInput}`,
// "default_branch": "development"
// }

// TODO: Run PUT command from postman to add branch protection
// https://api.github.com/repos/rob-moore/postmanTest/branches/development/protection
// {
//   "required_status_checks": {
//     "include_admins": true,
//     "strict": true,
//     "contexts": [
//       "continuous-integration/travis-ci" Probably something different here
//     ]
//   },
//   "required_pull_request_reviews": {
//     "include_admins": false
//   },
//   "restrictions": null
//    This will NOT be null, fill it in with organization and teams
// }

//   fetch(`//api.github.com/${userInput}`, { method: 'POST' })
//       .then(response => {
//         if (response.status >= 400) {
//           // TODO: Do I need to pass this error to next()?
//           throw new Error('Bad response from server');
//         }
//         return response.json();
//       })
//       .then(stories => {
//         res.send(stories);
//         return next();
//       })
//       .catch(next);
// }
