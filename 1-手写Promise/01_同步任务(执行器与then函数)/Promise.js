// promise自定义  是一个构造函数

function Promise(excutor) {
  // 定义resolve
  function resolve() {
    
  }
  // 定义reject
  function reject() {

  }
  // 调用执行器
  excutor(resolve, reject)
}