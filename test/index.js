import * as chai from 'chai'
import dirtyChai from 'dirty-chai'
import loopback from 'loopback';
import * as UrlshortenerConnector from '../lib'
chai.use(dirtyChai);
const expect = chai.expect;

describe('loopback-component-urlshortener', () => {
  const app = loopback();
  const ds = loopback.createDataSource({
    connector: UrlshortenerConnector,
    apiKey: 'API_KEY',
  });

  const Urlshortener = ds.createModel('Urlshortener');
  app.model(Urlshortener);
  const urlToShorten = 'https://www.google.com/';

  it('create a shortened url', (done) => {
    Urlshortener.create(urlToShorten).then((shortUrl) => {
      expect(shortUrl).to.exist();
      done();
    }).catch(function onError(err) {
      done(err);
    });
  });

  it('get a shortened url', (done) => {
    Urlshortener.create(urlToShorten).then((shortUrl) => {
      expect(shortUrl).to.exist();
      return Urlshortener.get(shortUrl).then((longUrl) => {
        expect(longUrl).to.be.equal(urlToShorten);
        done();
      });
    }).catch(function onError(err) {
      done(err);
    });
  });

  it.skip('list a shortened urls', (done) => {
    Urlshortener.list().then((list) => {
      done();
    }).catch(function onError(err) {
      done(err);
    });
  });
});
