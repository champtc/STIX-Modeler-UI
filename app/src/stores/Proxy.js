import axios from 'axios';

class Proxy {
  constructor() {
    this.apiRoot = process.env.API_ROOT;
    this.port = process.env.PORT;
    this.endpoint = process.env.ENDPOINT;
    this.apikey = process.env.API_KEY;
    this.contentType = process.env.CONTENT_TYPE;
  
  }

  async submit(bundle) {
    console.log('Submitting:');
    console.log(bundle);

    if (!this.validateEnvironmentVariables([this.apiRoot, this.contentType])) {
      throw 'Missing env vars: either API_ROOT or CONTENT_TYPE';
    }
    this.compiledUrl = `${this.apiRoot}${this.port ? ':' + this.port : ''}${
      this.endpoint
        ? this.endpoint.startsWith('/')
          ? this.endpoint
          : '/' + this.endpoint
        : ''
    }`;
    let compiledHeaders = { 'Content-Type': this.contentType };
    if (this.apikey) {
      compiledHeaders['Api-Key'] = this.apikey;
    }

    const response = await axios({
      method: 'post',
      url: this.compiledUrl,
      data: { bundle },
      headers: compiledHeaders
    });
    console.log(`Received code: ${response.status}`);
  }

  validateEnvironmentVariables(environmentVariables) {
    return environmentVariables.every(variable => variable) ? true : false;
  }
}

export default new Proxy();
