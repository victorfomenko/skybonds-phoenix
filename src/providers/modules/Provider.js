import {Promise} from 'rsvp'
import http from 'browser-request'

export default {
  get: function(url, params) {
    return new Promise(function(resolve, reject) {
      return http.get({
        url: url,
        qs: params,
        json: true
      }, function(error, response) {
        if (error) {
          return reject(response);
        } else {
          return resolve(response);
        }
      });
    });
  },
  post: function(url, data, params) {
    return new Promise(function(resolve, reject) {
      return http.post({
        url: url,
        body: data,
        qs: params,
        json: true
      }, function(error, response) {
        if (error) {
          return reject(response);
        } else {
          return resolve(response);
        }
      });
    });
  }
};
