//读取 1.html 和 2.html 两个文件内容, 然后合并后输出到控制台

const fs = require("fs");
const util = require("util");
const mineReadFile = util.promisify(fs.readFile);


// async 与 await
async function main(){
    //读取第一个文件的内容
    let one = await mineReadFile(__dirname+"/resource/1.html");
    //读取第二个文件的内容
    let two = await mineReadFile(__dirname+"/resource/2.html");
    //读取第三个文件的内容
    let three = await mineReadFile(__dirname+"/resource/3.html");
    console.log(one + two + three);
}

main();