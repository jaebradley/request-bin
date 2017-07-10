export default class RequestBinUriBuilder {
  static getCreateBinUri() {
    return `${RequestBinUriBuilder.getHost()}/bins`;
  }

  static getBinUri(binId) {
    return `${RequestBinUriBuilder.getHost()}/bins/${binId}`;
  }

  static getBinRequestsUri(binId) {
    return `${RequestBinUriBuilder.getHost()}/bins/${binId}/requests`;
  }

  static getBinRequestUri(binId, requestId) {
    return `${RequestBinUriBuilder.getHost()}/bins/${binId}/requests/${requestId}`;
  }

  static getHost() {
    return 'https://requestb.in/api/v1';
  }
}
