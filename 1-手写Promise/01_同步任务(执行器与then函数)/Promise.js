// promise自定义  是一个构造函数
console.log("ours")

function Promise(excutor) {
  // 存储this
  let self = this;
  // 定义初始状态
  self.status = "pending"
  // 定义数据
  self.data = ""
  // 定义resolve
  function resolve(value) {
    // 修改状态
    self.status = "resolved"
    // 修改数据
    self.data = value
  }
  // 定义reject
  function reject(reason) {
    // 修改状态
    self.status = "rejected"
    // 修改数据
    self.data = reason
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
Promise.prototype.then = function (onResolved, onRejected){
  
}