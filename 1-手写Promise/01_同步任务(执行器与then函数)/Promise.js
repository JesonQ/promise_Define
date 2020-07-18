// promise自定义  是一个构造函数
console.log("ours")

function Promise(excutor) {
  // 存储this
  let self = this;
  // 定义初始状态
  self.status = "pending"
  // 定义resolve
  function resolve() {
    // 修改状态
    self.status = "resolved"
  }
  // 定义reject
  function reject() {
    // 修改状态
    self.status = "rejected"
  }
  try {
    // 调用执行器
    excutor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}