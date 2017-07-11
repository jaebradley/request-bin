import chai from 'chai';
import RequestBinUriBuilder from '../../src/services/RequestBinUriBuilder';

chai.should();

describe('Test Request Bin Uri Builder', () => {
  describe('#getHost', () => {
    it('should return the host', () => {
      RequestBinUriBuilder.getHost().should.equal('https://requestb.in/api/v1');
    });
  });

  describe('#getCreateBinUri', () => {
    it('should return the URI to create a bin', () => {
      RequestBinUriBuilder.getCreateBinUri().should.equal('https://requestb.in/api/v1/bins');
    });
  });

  describe('#getBinUri', () => {
    it('should return the URI to fetch a specific bin', () => {
      const binId = 'binId';
      RequestBinUriBuilder.getBinUri(binId).should.equal('https://requestb.in/api/v1/bins/binId');
    });
  });

  describe('#getBinRequestsUri', () => {
    it('should return the URI to fetch requests for a specific bin', () => {
      const binId = 'binId';
      RequestBinUriBuilder.getBinRequestsUri(binId).should.equal('https://requestb.in/api/v1/bins/binId/requests');
    });
  });

  describe('#getBinRequestUri', () => {
    it('should return the URI to fetch a specific request for a specific bin', () => {
      const binId = 'binId';
      const requestId = 'requestId';
      RequestBinUriBuilder.getBinRequestUri(binId, requestId).should.equal('https://requestb.in/api/v1/bins/binId/requests/requestId');
    });
  });
});
