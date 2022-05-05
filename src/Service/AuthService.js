import axios from 'axios';
import * as a from '../API/Api';
export default new (class AuthService {
  async Post(url, data) {
    let PostUrl = a.API_BASE_URL + url;
    console.log(PostUrl);
    // return

    try {
      let res = await axios.post(PostUrl, data, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      return res.data;
    } catch (e) {
      throw this.handler(e);
    }
  }

  async ThirtPartyGet(url) {
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
  }

  handler(err) {
    let error = err;
    if (err.response && err.response.data.hasOwnProperty('message'))
      error = err.response.data;
    else if (!err.hasOwnProperty('message')) error = err.toJSON();
    return new Error(error.message);
  }
})();
