var fs = require('fs')
var path = require('path')
const args = require('yargs').argv;

var inArg = args.in || './images'
var outArg = args.out || './images/index.js'

var tempate = `
const images = {
{0}
}
export default images
`

function checkImageType(fileName){
    var re = new RegExp('(jpg|png|jpeg)$');
    return re.test(fileName)
}

function getExtension(filename) {
    var i = filename.lastIndexOf('.');
    return (i < 0) ? '' : filename.substr(i);
}

function getFileName(filename) {
    var i = filename.lastIndexOf('.');
    return (i < 0) ? filename : filename.substr(0, i);
}

function getListFile(dir){
    var files = []
    fs.readdirSync(dir).forEach(file => {
        if (checkImageType(file)) {
            var name = getFileName(file)
            files.push(`    ${name}: require('./${path.join(file)}')`)
        }
    });
    return files
}

function writeFile(filename, content){
    fs.writeFileSync(path.join(filename), content)
}


function main(){
    let files = getListFile(inArg)
    let code = tempate.replace('{0}', files.join(`, \n`))
    console.log(code)
    writeFile(outArg, code)
}


main()