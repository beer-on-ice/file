import got = require('got')
import axios from 'axios'
import fs = require('fs-extra')
import path = require('path')
import md5 = require('md5')
import tunnel = require('tunnel')
const config = {
    proxy: {
        host: '127.0.0.1',
        port: 8100,
    },
}
const agent = tunnel.httpsOverHttp({ proxy: config.proxy });

(async () => {
    try {
        let url = 'https://www.google.com.hk/search?hl=zh-CN&q='
        let ext = path.extname(url) || '.html'
        let hash = md5(url).slice(0, 8)
        let fname = hash + ext
        let res = await axios.get(url, {
            timeout: 10 * 1000,
            httpAgent: agent,
            httpsAgent: agent,
            proxy: false,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3676.400 QQBrowser/10.4.3505.400'
            }
        })
        await fs.writeFile(path.join(__dirname, `../public/${fname}`), res.data)
        console.log('ok')
    } catch (err) {
        console.error(err)
    }
})()