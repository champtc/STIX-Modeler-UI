import axios from 'axios';

class Proxy {
    constructor() {
        this.url = process.env.URL;
        this.endpoint = process.env.ENDPOINT;
    }

    async submit(bundle) {
        console.log('Submitting:')
        console.log(bundle);
        console.log(`https://${this.url}${this.endpoint}`)

        const response = await axios({
            method: 'post',
            url: `https://${this.url}${this.endpoint}`,
            data: { bundle },
            headers: { 'Content-Type': 'application/vnd.dl.tipping.submission+json;version=1' }
        });
        console.log(`Received code: ${response.status}`);
    }
}

export default new Proxy();
