//读取 1.html 和 2.html 两个文件内容, 然后合并后输出到控制台

let fs = require("fs")
let util = require("util")
let mainReadFile = util.promisify(fs.readFile)

// fs读取  回调地狱
// fs.readFile("./resource/1.html", function (err,data){
//     fs.readFile("./resource/2.html", function (err,data2){
//         fs.readFile("./resource/3.html", function (err,data3){
//             console.log((data+data2+data3).toString())
//         })
//     })
// })

// fs读取 Promise
// new Promise((resolve, reject)=>{
//     fs.readFile("./resource/1.html", function (err,data){
//         resolve(data.toString())
//     })
// })
// .then(
//     (v)=>{
//         return new Promise((resolve, reject)=>{
//             fs.readFile("./resource/2.html", function (err,data){
//                 resolve((v+data).toString())
//             })
//         }) 
//     }
// )
// .then(
//     v=>{
//         console.log(v)
//     }
// )

// async与await
async function main(){
   let one = await mainReadFile("./resource/1.html");
   let two = await mainReadFile("./resource/2.html");
   let three = await mainReadFile("./resource/3.html");
   console.log(one+two+three+"")
}
main()