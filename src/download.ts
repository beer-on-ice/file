import fs = require('fs-extra')
import download = require('download')
import path = require('path')
import md5 = require('md5')

(async () => {
    let dir = path.join(__dirname, '../public')
    if (!(await fs.pathExists(dir))) {
        await fs.mkdir(dir)
    }
    console.log('开始下载')
    // let url = 'http://i0.hdslb.com/bfs/archive/7197cae46569a49abd98e0c51348068831be6a85.png'
    // let url = 'https://i.pximg.net/img-master/img/2017/05/27/15/56/20/63092091_p0_master1200.jpg'
    // let url = 'https://www.google.com.hk/search?hl=zh-CN&q='
    // let url = 'https://www.pixiv.net/artworks/66081567'
    let url = 'https://i.pixiv.cat/img-master/img/2017/11/29/00/01/04/66081567_p1_master1200.jpg'
    let ext = path.extname(url) || '.html'
    let hash = md5(url).slice(0, 8)
    let fname = hash + ext
    try {
        let data = await download(url, null, {
            // proxy: 'http://127.0.0.1:8100',
            timeout: 10,
            headers: {
                Referer: 'https://www.pixiv.net/',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3676.400 QQBrowser/10.4.3505.400'
            }
        })
        await fs.writeFile(path.join(__dirname, `../public/${fname}`), data)
        console.log('下载完毕')
    } catch (err) {
        console.error(err)
    }

    //.pipe(fs.createWriteStream())
})()