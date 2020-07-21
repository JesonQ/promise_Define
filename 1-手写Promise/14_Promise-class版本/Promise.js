
// Promise的class版本
class Promise {
  constructor(excutor) {  // 构造器
    // 存储this
    let self = this;
    // 定义初始状态
    self.status = "pending"
    // 定义数据
    self.data = ""
    // 存储回调
    self.callbacks = []
    // 定义resolve
    function resolve(value) {
      // 判断状态
      if (self.status !== "pending") return
      // 修改状态
      self.status = "resolved"
      // 修改数据
      self.data = value
      // 调用成功的回调
      if (self.callbacks.length > 0) {
        self.callbacks.forEach(callbackObj => {
          callbackObj.success(self.data)
          // console.log(res)
        });
      }
    }
    // 定义reject
    function reject(reason) {
      // 判断状态
      if (self.status !== "pending") return
      // 修改状态
      self.status = "rejected"
      // 修改数据
      self.data = reason
      // 调用失败的回调
      if (self.callbacks.length > 0) {
        self.callbacks.forEach(callbackObj => {
          callbackObj.fail(self.data)
        });
      }
    }
    // 如果执行器抛出错误,状态为rejected
    try {
      // 调用执行器
      excutor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  // then方法
  then(onResolved, onRejected) {
    if (onRejected === undefined) {
      onRejected = reason => { throw reason }
    }
    if (onResolved === undefined) {
      onResolved = v => { return v }
    }
    // 存储this
    let self = this
    // 返回promise
    return new Promise((resolve, reject) => {
      // 封装回调调用
      function callback(type) {
        setTimeout(() => {
          try {
            // 获取成功回调的返回结果
            let res = type(self.data)
            // 判断
            if (res instanceof Promise) {
              res.then(  // promise实例身上必然有then方法
                (value) => {
                  resolve(value)
                },
                (reason) => {
                  reject(reason)
                }
              )
            } else {
              resolve(res)
            }
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      // 当状态为resolved
      if (self.status === "resolved") {
        callback(onResolved)
      }
      // 当状态为rejected
      if (self.status === "rejected") {
        callback(onRejected)
      }
      // 异步任务 存储回调
      if (self.status === "pending") {
        // 异步任务的存储
        self.callbacks.push({
          success: function () {
            try {  // 异步错误捕获
              callback(onResolved)
            } catch (e) {
              reject(e)  // 抛出异常调用失败
            }
          },
          fail: function () {
            try {
              callback(onRejected)
            } catch (e) {
              reject(e)
            }
          }
        })
      }
    })
  }
  // catch 
  catch(onRejected) {
    return this.then(undefined, onRejected)
  }
  // Promise.resolve
  static resolve(value) {
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {
        value.then(resolve, reject)
      } else {
        resolve(value)
      }
    })
  }
  // Promise.reject
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }
  // all
  static all(promiseArr) {
    return new Promise((resolve, reject) => {
      let num = 0;   // 定义计数器 在for循环之外
      let proArr = []; // 定义数组,用来存储值 
      for (let i in promiseArr) {
        // console.log(promiseArr[i])
        promiseArr[i].then(
          (v) => {
            num++;  // 累加
            proArr.push(v)  // 将每一项的值放到数组中
            // console.log(proArr)
            if (num === promiseArr.length) {  // 判断长度
              // console.log("都成功了")
              resolve(proArr)
            }
          },
          (r) => {
            reject(r)
          }
        )
      }
    })
  }
  // race
  static race(promiseArr) {
    return new Promise((resolve, reject) => {
      for (let i in promiseArr) {
        promiseArr[i].then(
          (v) => {
            resolve(v)
          },
          (r) => {
            reject(r)
          }
        )
      }
    })
  }
}