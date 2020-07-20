// promise自定义  是一个构造函数
console.log("ours")

function Promise(excutor) {
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

// then方法  onResolved   当....的时候...
Promise.prototype.then = function (onResolved, onRejected) {
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

// catch方法
Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected)
}

// Promise.resolve
Promise.resolve = function (value){
  return new Promise((resolve, reject)=>{
    if(value instanceof Promise){
      value.then(resolve, reject)
    }else{
      resolve(value)
    }
  })
}

// 
