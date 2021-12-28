import fs = require('fs-extra')
import path = require('path')
// (async () => {
//     try {
//         if (!(await fs.pathExists(path.join(__dirname, '../dist')))) {
//             await fs.mkdir(path.join(__dirname, '../dist'))
//         }
//         await fs.writeFile(path.join(__dirname, '../public/test.json'),
//             JSON.stringify({
//                 msg: 'hello world'
//             }, null, 4)
//         )
//         await fs.copyFile(path.join(__dirname, '../public/test.json'), path.join(__dirname, '../dist/test.json'))
//         let json = (await fs.readFile(path.join(__dirname, '../dist/test.json'))).toString()
//         console.log(JSON.parse(json))

//     } catch (err) {
//         console.error(err)
//     }
// })()
// async function copyFiles() {
//     try {
//         await fs.copy('/tmp/myfile', '/tmp/mynewfile')
//         console.log('success!')
//     } catch (err) {
//         console.error(err)
//     }
// }

// copyFiles()
// (async () => {

// })()

/**
 * 删除空文件夹
 *
 * @author CaoMeiYouRen
 * @date 2019-12-01
 * @param {string} [root=path.resolve('./')] 要判断的文件夹的根路径
 */
async function deleteEmptyFolder(root: string = path.resolve('./')) {
    try {
        let stat = await fs.stat(root)
        if (!stat.isDirectory()) {//如果根路径不是文件夹直接返回
            return
        }
        let files = await fs.readdir(root)
        let n = files.length
        if (n <= 0) {//如果为空就删除
            await fs.rmdir(root)
            return
        }
        for (let i = 0; i < n; i++) {
            let file = files[i]
            let p = path.join(root, file)
            await deleteEmptyFolder(p)//递归
        }
    } catch (error) {
        console.error(error)
    }
}
deleteEmptyFolder(path.join(__dirname, '../public'))