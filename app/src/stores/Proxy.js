import axios from 'axios';

class Proxy {
    constructor() {
        this.apiRoot = process.env.API_ROOT;
        this.port = process.env.PORT;
        this.apikey = process.env.API_KEY;
        this.contentType = process.env.CONTENT_TYPE;
    }

    async submit(bundle) {
        console.log('Submitting:')
        console.log(bundle);

        if (this.validateEnvironmentVariables([this.apiRoot, this.port, this.contentType])) {
            console.log(`https://${this.apiRoot}${this.port}`)

            const response = await axios({
                method: 'post',
                url: `https://${this.apiRoot}${this.port}`,
                data: { bundle },
                headers: { 'Api-Key': this.apiKey, 'Content-Type': this.contentType }
            });
            console.log(`Received code: ${response.status}`);
        }

    }

    validateEnvironmentVariables(environmentVariables) {
        return (environmentVariables.every(variable => variable)) ? true : false;
    }
}

export default new Proxy();
