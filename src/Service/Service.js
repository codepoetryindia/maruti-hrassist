import axios from 'axios';
import * as a from '../api/api';
export const Post = async (url, data) => {
  let PostUrl = a.API_URL + url;
  console.log(PostUrl);
  // return

  try {
    let res = await axios.post(PostUrl, data, {
      headers: {
        'Content-Type': 'application/json',
        
      },
    });
    return res.data;
  } catch (e) {
    throw this.handler(e);
  }
};

export const ThirdPartyGet = async url => {
  let postUrl = url;
  try {
    let res = await axios.get(postUrl, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    return res.data;
  } catch (e) {
    throw handler(e);
  }
};

function handler(err) {
  let error = err;
  if (err.response && err.response.data.hasOwnProperty('message'))
    error = err.response.data;
  else if (!err.hasOwnProperty('message')) error = err.toJSON();
  return new Error(error.message);
}
