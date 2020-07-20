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
    if(self.status !== "pending") return
    // 修改状态
    self.status = "resolved"
    // 修改数据
    self.data = value
    // 调用成功的回调
    if (self.callbacks.length > 0) {
      self.callbacks.forEach(callbackObj => {
        callbackObj.success(self.data)
      });
    }
  }
  // 定义reject
  function reject(reason) {
    // 判断状态
    if(self.status !== "pending") return
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
  // 存储this
  let self = this
  // 当状态为resolved
  if (self.status === "resolved") {
    return new Promise((resolve, reject)=>{
      // 获取成功回调的返回结果
      let res = onResolved(self.data)
      if(res instanceof Promise){

      }else{
        resolve(res)
      }
    })
  }
  // 当状态为rejected
  if (self.status === "rejected") {
    onRejected(self.data)
  }
  // 异步任务 存储回调
  if (self.status === "pending") {
    self.callbacks.push({
      success: onResolved,
      fail: onRejected
    })
  }
}
