export default class RequestBinHttpError extends Error {
  constructor(message, code, error) {
    super(message);
    this.message = message;
    this.code = code;
    this.error = error;
    this.name = 'Request Bin HTTP Error';
  }
}
