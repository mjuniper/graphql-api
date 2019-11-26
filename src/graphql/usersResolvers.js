const fetch = require('node-fetch')

const blogBaseURL = 'https://jsonplaceholder.typicode.com';

const log = url => {
  console.log(`>> ${url}`);
  return url;
};
const get = url => {
  log(url);
  return fetch(url)
  .then(res => res.json());
};

exports.resolvers = {
  Query: {
    users: () => {
      const url = `${blogBaseURL}/users`;
      return get(url);
    },
    user: (parent, args) => {
      const { id } = args;
      const url = `${blogBaseURL}/users/${id}`;
      return get(url);
    },
  },
  User: {
    posts: parent => {
      const { id } = parent;
      const url = `${blogBaseURL}/users/${id}/posts`;
      return get(url);
      // return fetch(`${baseURL}/posts?userId=${id}`).then(res => res.json())
    }
  }
}
