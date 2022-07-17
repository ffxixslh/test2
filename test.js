let names = ["iliakan", "remy", "jeresig"];

let requests = names.map((name) =>
  fetch(`https://api.github.com/users/${name}`)
);

Promise.all(requests)
  .then((responses) => {
    for (let response of responses) {
      console.log(`${response.url}: ${response.status}`);
    }
    return responses;
  })
  .then((responses) => Promise.all(responses.map((r) => r.json())))
  .then((users) => users.forEach((user) => console.log(user.name)));
