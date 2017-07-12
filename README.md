# Request Bin Client

[![codecov](https://codecov.io/gh/jaebradley/request-bin/branch/master/graph/badge.svg)](https://codecov.io/gh/jaebradley/request-bin)
[![Build Status](https://travis-ci.org/jaebradley/request-bin.svg?branch=master)](https://travis-ci.org/jaebradley/request-bin)
[![npm version](https://badge.fury.io/js/request-bin.svg)](https://badge.fury.io/js/request-bin)

[![NPM](https://nodei.co/npm/request-bin.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/request-bin/)

### Introduction
[Request Bin](requestb.in) is a pretty useful service (I've used it to test webhooks, for example) and it's [API](https://github.com/Runscope/requestbin/wiki/API) is relatively straight-forward, to boot!

Currently, there's a Request Bin client via the [`requestbin` NPM package](https://github.com/fvdm/nodejs-requestbin), however, it has a callback-based API while this client is `Promise`-based.

### Installation
Install via the [NPM package](https://www.npmjs.com/package/request-bin)

`npm install request-bin`

### API

#### `createBin`
* Creates a bin and returns a `Promise` containing bin details
* Takes an optional `isPrivate` parameter - the default value is `false`

```javascript
import { RequestBinClient } from 'request-bin';

// Prints public bin details
RequestBinClient.createBin().then(binDetails => console.log(binDetails));

// Prints private bin details
RequestBinClient.createBin(true).then(binDetails => console.log(binDetails));
```

#### `getBin(binId)`
* Returns a `Promise` containing bin details for a given `binId`

```javascript
import { RequestBinClient } from 'request-bin';

const binId = 'someBinId';

// Prints bin's details
RequestBinClient.getBin(binId).then(binDetails => console.log(binDetails));
```

#### `getRequests(binId)`
* Returns a `Promise` containing for HTTP request details for a specific bin

```javascript
import { RequestBinClient } from 'request-bin';

const binId = 'someBinId';

// Prints bin's requests details
RequestBinClient.getRequests(binId).then(requestsDetails => console.log(requestsDetails));
```

#### `getRequest(binId, requestId)`
* Returns a `Promise` containing details for a specific HTTP request made against a specific bin

```javascript
import { RequestBinClient } from 'request-bin';

const binId = 'someBinId';
const requestId = 'someRequestId';

// Prints request details for a specific request in a bin
RequestBinClient.getRequest(binId, requestId).then(requestDetails => console.log(requestDetails));
```
