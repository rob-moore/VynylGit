'use strict';

function createRepo() {
  const userInput = document.getElementById('repoBox').value;
  // TODO: Variable for github username
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
}
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
