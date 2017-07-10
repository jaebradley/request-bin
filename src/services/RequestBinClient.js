import rp from 'request-promise-native';

import RequestBinUriBuilder from './RequestBinUriBuilder';
import RequestBinHttpError from '../errors/RequestBinHttpError';

export default class RequestBinClient {
  static createBin() {
    return RequestBinClient.executeHttpRequest(RequestBinUriBuilder.getCreateBinUri());
  }

  static getBin(binId) {
    return RequestBinClient.executeHttpRequest(RequestBinUriBuilder.getBinUri(binId));
  }

  static getRequests(binId) {
    const uri = RequestBinUriBuilder.getBinRequestsUri(binId);
    return RequestBinClient.executeHttpRequest(uri);
  }

  static getRequest(binId, requestId) {
    const uri = RequestBinUriBuilder.getBinRequestUri(binId, requestId);
    return RequestBinClient.executeHttpRequest(uri);
  }

  static buildApiRequestDetails(uri) {
    return {
      uri,
      headers: {
        'User-Agent': 'request-bin',
      },
      json: true,
    };
  }

  static executeHttpRequest(uri) {
    return rp(RequestBinClient.buildApiRequestDetails(uri))
      .then(data => data)
      .catch((err) => {
        Promise.reject(new RequestBinHttpError(
          `Error when querying: ${uri}`,
          err.statusCode,
          err.error,
        ));
      });
  }
}
