import chai from 'chai';
import RequestBinUriBuilder from '../../src/services/RequestBinUriBuilder';

chai.should();

describe('Test Request Bin Uri Builder', () => {
  describe('#getHost', () => {
    it('should return the host', () => {
      RequestBinUriBuilder.getHost().should.equal('https://requestb.in/api/v1');
    });
  });
});
