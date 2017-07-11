import rp from 'request-promise-native';

import RequestBinUriBuilder from './RequestBinUriBuilder';
import RequestBinHttpError from '../errors/RequestBinHttpError';

export default class RequestBinClient {
  static createBin(isPrivate = false) {
    return RequestBinClient.executeHttpRequest(RequestBinUriBuilder.getCreateBinUri(), 'POST', { private: isPrivate });
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

  static getHttpRequestDetails(uri, method, formData) {
    return {
      uri,
      method,
      form: formData,
      headers: {
        'User-Agent': 'request-bin',
      },
      json: true,
    };
  }

  static executeHttpRequest(uri, method = 'GET', formData = {}) {
    return rp(RequestBinClient.getHttpRequestDetails(uri, method, formData))
      .then(data => data)
      .catch(err => Promise.reject(new RequestBinHttpError(
          `Error when making request to ${uri}`,
          err.statusCode,
          err.error,
        )));
  }
}
