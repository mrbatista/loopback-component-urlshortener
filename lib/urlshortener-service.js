import {urlshortener} from 'googleapis'

export class UrlshortenerService {
  constructor(options) {
    options = options || {};
    var settings = {};
    settings.version = options.version || 'v1';
    if (options.apiKey) {
      settings.auth = options.apiKey;
    }
    this.client = urlshortener(settings);
  }

  /**
   * Create a shortened url
   * @param {String} longUrl The long url
   * @returns {Promise}
   */
  create(longUrl) {
    return new Promise((resolve, reject) => {
      const data = {resource: {longUrl: longUrl}};
      this.client.url.insert(data, (err, response) => {
        if (err) return reject(err);
        return resolve(response && response.id);
      });
    });
  }

  /**
   * Retrieve information for specific short url
   * @param {String} shortUrl The short url
   * @returns {Promise}
   */
  get(shortUrl) {
    return new Promise((resolve, reject) => {
      const data = {shortUrl: shortUrl};
      this.client.url.get(data, (err, response) => {
        if (err) return reject(err);
        resolve(response && response.longUrl);
      });
    });
  }
}
