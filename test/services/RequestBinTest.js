import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import RequestBinClient from '../../src/services/RequestBinClient';
import RequestBinUriBuilder from '../../src/services/RequestBinUriBuilder';

chai.should();
chai.use(sinonChai);

describe('Test RequestBin Client', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('#createBin', () => {
    it('should create public bin', () => {
      const createBinUri = 'createBinUri';
      sandbox.stub(RequestBinUriBuilder, 'getCreateBinUri').returns(createBinUri);
      const stubbedHttpRequestExecutor = sandbox.stub(RequestBinClient, 'executeHttpRequest');
      RequestBinClient.createBin();
      stubbedHttpRequestExecutor.should.have.been.calledWith(createBinUri, 'POST', { private: false });
    });

    it('should create private bin', () => {
      const createBinUri = 'createBinUri';
      sandbox.stub(RequestBinUriBuilder, 'getCreateBinUri').returns(createBinUri);
      const stubbedHttpRequestExecutor = sandbox.stub(RequestBinClient, 'executeHttpRequest');
      RequestBinClient.createBin(true);
      stubbedHttpRequestExecutor.should.have.been.calledWith(createBinUri, 'POST', { private: true });
    });
  });

  describe('#getBin', () => {
    it('should get bin', () => {
      const binUri = 'binUri';
      const binId = 'binId';
      const stubbedRequestBinUri = sandbox.stub(RequestBinUriBuilder, 'getBinUri').returns(binUri);
      const stubbedHttpRequestExecutor = sandbox.stub(RequestBinClient, 'executeHttpRequest');
      RequestBinClient.getBin(binId);
      stubbedRequestBinUri.should.have.been.calledWith(binId);
      stubbedHttpRequestExecutor.should.have.been.calledWith(binUri);
    });
  });

  describe('#getRequests', () => {
    it('should get requests', () => {
      const requestsUri = 'requestsUri';
      const binId = 'binId';
      const stubbedRequestsUri = sandbox.stub(RequestBinUriBuilder, 'getBinRequestsUri').returns(requestsUri);
      const stubbedHttpRequestExecutor = sandbox.stub(RequestBinClient, 'executeHttpRequest');
      RequestBinClient.getRequests(binId);
      stubbedRequestsUri.should.have.been.calledWith(binId);
      stubbedHttpRequestExecutor.should.have.been.calledWith(requestsUri);
    });
  });

  describe('#getRequest', () => {
    it('should get a request', () => {
      const requestUri = 'requestUri';
      const binId = 'binId';
      const requestId = 'requestId';
      const stubbedRequestUri = sandbox.stub(RequestBinUriBuilder, 'getBinRequestUri').returns(requestUri);
      const stubbedHttpRequestExecutor = sandbox.stub(RequestBinClient, 'executeHttpRequest');
      RequestBinClient.getRequest(binId, requestId);
      stubbedRequestUri.should.have.been.calledWith(binId, requestId);
      stubbedHttpRequestExecutor.should.have.been.calledWith(requestUri);
    });
  });

  describe('#getHttpRequestDetails', () => {
    it('should return request details', () => {
      const uri = 'uri';
      const method = 'method';
      const formData = 'formData';
      const expected = {
        uri,
        method,
        form: formData,
        headers: {
          'User-Agent': 'request-bin',
        },
        json: true,
      };
      RequestBinClient.getHttpRequestDetails(uri, method, formData).should.eql(expected);
    });
  });
});
