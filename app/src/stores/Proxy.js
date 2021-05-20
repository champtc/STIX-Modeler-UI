import axios from 'axios';

class Proxy {
    constructor() {
        this.apiGateway = process.env.API_GATEWAY;
        this.apiKey = process.env.KONG_CONSUMER_API_KEY;
        this.endpoint = process.env.TIPPING_ENDPOINT;
    }

    async submit(bundle) {
        console.log('Submitting:')
        console.log(bundle);
        console.log(`https://${this.apiGateway}${this.endpoint}`)

        const response = await axios({
            method: 'post',
            url: `https://${this.apiGateway}${this.endpoint}`,
            data: { bundle },
            headers: {'Api-Key': this.apiKey, 'Content-Type': 'application/vnd.dl.tipping.submission+json;version=1'}
        });
        console.log(`Received code: ${response.status}`);
    }
}

export default new Proxy();
