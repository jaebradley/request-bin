import rp from 'request-promise-native';

export default class RequestBinClient {
  static createBin() {
    const uri = `${RequestBinClient.getHost()}/bins`;
    return RequestBinClient.executeHttpRequest(uri);
  }

  static getBin(binId) {
    const uri = `${RequestBinClient.getHost()}/bins/${binId}`;
    return RequestBinClient.executeHttpRequest(uri);
  }

  static getRequests(binId) {
    const uri = `${RequestBinClient.getHost()}/bins/${binId}/requests`;
    return RequestBinClient.executeHttpRequest(uri);
  }

  static getRequest(binId, requestId) {
    const uri = `${RequestBinClient.getHost()}/bins/${binId}/requests/${requestId}`;
    return RequestBinClient.executeHttpRequest(uri);
  }

  static getCreateEndpoint() {
    return `${RequestBinClient.getHost()}/bins`;
  }

  static getRequestsEndpoint() {
    return `${RequestBinClient.getHost()}/bins/`;
  }

  static getHost() {
    return 'https://requestb.in/api/v1';
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
      .catch(err => Promise.reject(err));
  }
}
