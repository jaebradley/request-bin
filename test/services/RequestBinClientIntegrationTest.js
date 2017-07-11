/* eslint no-console: ["error", { allow: ["log", "error"] }] */

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiThings from 'chai-things';

import rp from 'request-promise-native';

import RequestBinClient from '../../src/services/RequestBinClient';

chai.use(chaiThings);
chai.use(chaiAsPromised);
chai.should();

describe('Integration Test for RequestBin Client', () => {
  describe('#createBin', () => {
    it('should create a public bin', () => {
      const request = RequestBinClient.createBin();

      return Promise.all([
        request.should.be.fulfilled,
        request.should.eventually.have.property('name'),
        request.should.eventually.have.property('request_count'),
        request.should.eventually.have.property('color'),
        request.should.eventually.have.property('private').that.is.false,
      ]);
    });

    it('should create a private bin', () => {
      const request = RequestBinClient.createBin(true);

      return Promise.all([
        request.should.be.fulfilled,
        request.should.eventually.have.property('name'),
        request.should.eventually.have.property('request_count'),
        request.should.eventually.have.property('color'),
        request.should.eventually.have.property('private').that.is.true,
      ]);
    });
  });

  describe('#getBin', () => {
    let bin;
    let binId;

    before(() => RequestBinClient.createBin().then((data) => {
      bin = data;
      binId = data.name;
    }));

    it('should get a bin', () => {
      const request = RequestBinClient.getBin(binId);

      return Promise.all([
        request.should.be.fulfilled,
        request.should.eventually.eql(bin),
      ]);
    });
  });

  describe('#getRequests', () => {
    let binId;

    before(() => RequestBinClient.createBin().then((data) => {
      console.log(`Bin data: ${JSON.stringify(data)}`);
      binId = data.name;
    }).then(() => rp(`https://requestb.in/${binId}`)
      .then(data => console.log(`Response from RequestBin: ${data}`))
      .catch(err => console.error(err))),
    );

    it('should get requests for a bin', () => {
      const request = RequestBinClient.getRequests(binId);

      return Promise.all([
        request.should.be.fulfilled,
        request.should.eventually.be.a('array'),
        request.should.eventually.have.lengthOf(1),
        request.should.eventually.contain.a.thing.with.property('query_string'),
        request.should.eventually.contain.a.thing.with.property('content_type'),
        request.should.eventually.contain.a.thing.with.property('path', `/${binId}`),
        request.should.eventually.contain.a.thing.with.property('headers'),
        request.should.eventually.contain.a.thing.with.property('remote_addr'),
        request.should.eventually.contain.a.thing.with.property('content_length'),
        request.should.eventually.contain.a.thing.with.property('raw'),
        request.should.eventually.contain.a.thing.with.property('body'),
        request.should.eventually.contain.a.thing.with.property('time'),
        request.should.eventually.contain.a.thing.with.property('form_data'),
        request.should.eventually.contain.a.thing.with.property('method'),
        request.should.eventually.contain.a.thing.with.property('id'),
      ]);
    });
  });

  describe('#getRequest', () => {
    let binId;
    let requestId;
    let request;

    before(() => RequestBinClient.createBin()
      .then((data) => {
        console.log(`Bin data: ${JSON.stringify(data)}`);
        binId = data.name;
      }).then(() => rp(`https://requestb.in/${binId}`)
        .then(data => console.log(`Response from RequestBin: ${data}`))
        .catch(err => console.error(err)))
      .then(() => RequestBinClient.getRequests(binId)
        .then((requests) => {
          console.log(`Bin requests: ${JSON.stringify(requests)}`);
          request = requests[0];
          requestId = requests[0].id;
        }),
      ),
    );

    it('should get request for a bin', () => {
      const fetchedRequest = RequestBinClient.getRequest(binId, requestId);
      return Promise.all([
        fetchedRequest.should.be.fulfilled,
        fetchedRequest.should.eventually.deep.eql(request),
      ]);
    });
  });
});
