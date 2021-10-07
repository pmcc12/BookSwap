// import { dbname } from '/../config';

// TODO set a config file

const apiServiceJWT = {};

import {API_BASE_URL} from "@env";

apiServiceJWT.register = (user) => {
  return (
    fetch(`http://${API_BASE_URL}:3000/register`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      // .then((whatever) => console.log(whatever))
      .catch((err) => console.log(err))
  );
};

apiServiceJWT.login = (user) => {
  console.log('my base url: ', API_BASE_URL)
  return fetch(`http://${API_BASE_URL}:3000/login`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export default apiServiceJWT;
