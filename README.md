# Request Bin Client

[![codecov](https://codecov.io/gh/jaebradley/request-bin/branch/master/graph/badge.svg)](https://codecov.io/gh/jaebradley/request-bin)
[![Build Status](https://travis-ci.org/jaebradley/request-bin.svg?branch=master)](https://travis-ci.org/jaebradley/request-bin)

### Introduction
[Request Bin](requestb.in) is a pretty useful service (I've used it to test webhooks, for example) and it's [API](https://github.com/Runscope/requestbin/wiki/API) is also relatively straight-forward, to boot!

Currently, there's already a Request Bin client via [the `requestbin` NPM package](https://github.com/fvdm/nodejs-requestbin), however, it has a callback-based API while this client is `Promise`-based.

### Installation
`npm install request-bin`

### API

#### `createBin`
* Creates a bin and returns bin details
* Takes an optional `isPrivate` parameter - the default value is `false`.

```javascript
import { RequestBinClient } from 'request-bin';

// Prints public bin details
RequestBinClient.createBin().then(binDetails => console.log(binDetails));

// Prints private bin details
RequestBinClient.createBin(true).then(binDetails => console.log(binDetails));
```

#### `getBin(binId)`
* Retrieves bin details for a given `binId`

```javascript
import { RequestBinClient } from 'request-bin';

const binId = 'someBinId';

// Prints bin's details
RequestBinClient.getBin(binId).then(binDetails => console.log(binDetails));
```

#### `getRequests(binId)`
* Retrieves details for HTTP requests made against a specific bin

```javascript
import { RequestBinClient } from 'request-bin';

const binId = 'someBinId';

// Prints bin's requests details
RequestBinClient.getRequests(binId).then(requestsDetails => console.log(requestsDetails));
```

#### `getRequest(binId, requestId)`
* Retrieves details for a specific HTTP request made against a specific bin

```javascript
import { RequestBinClient } from 'request-bin';

const binId = 'someBinId';
const requestId = 'someRequestId';

// Prints request details for a specific request in a bin
RequestBinClient.getRequest(binId, requestId).then(requestDetails => console.log(requestDetails));
```
