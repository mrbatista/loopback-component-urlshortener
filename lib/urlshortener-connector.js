import { UrlshortenerService } from './urlshortener-service'

/**
 * Initialize the urlshortener service as a connector for LoopBack data sources
 * @param {dataSource} dataSource DataSource instance
 * @prop {Object} settings Connector settings
 */
export function initialize(dataSource) {
  const settings = dataSource.settings || {};
  const connector = new UrlshortenerService(settings);
  dataSource.connector = connector;
  dataSource.connector.dataSource = dataSource;
  
  function DataAccessObject () {};
  connector.DataAccessObject = DataAccessObject;
  DataAccessObject.create = connector.create.bind(connector);
  DataAccessObject.get = connector.get.bind(connector);
}
