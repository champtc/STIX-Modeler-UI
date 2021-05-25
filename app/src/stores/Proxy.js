import axios from 'axios';

class Proxy {
    constructor() {
        this.apiRoot = process.env.API_ROOT;
        this.port = process.env.PORT;
    }

    async submit(bundle) {
        console.log('Submitting:')
        console.log(bundle);
        console.log(`https://${this.apiRoot}${this.port}`)

        const response = await axios({
            method: 'post',
            url: `https://${this.apiRoot}${this.port}`,
            data: { bundle },
            headers: { 'Content-Type': 'application/vnd.dl.tipping.submission+json;version=1' }
        });
        console.log(`Received code: ${response.status}`);
    }
}

export default new Proxy();
