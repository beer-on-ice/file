const fs = require('fs-extra')
const compressing = require('compressing')

async function start() {
    try {
        await fs.remove('dist.zip')
        await compressing.zip.compressDir('dist', 'dist.zip')
        console.log('zip success');
    } catch (error) {
        console.error(error)
    }
}

start()