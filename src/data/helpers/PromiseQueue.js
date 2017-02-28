class PromiseQueue {
  constructor() {
    this.queue = Promise.resolve();
  }

  add(callback, errorCallback){
    this.queue = this.queue.then(callback).catch(errorCallback)
    return this.queue;
  }
}
//
export default PromiseQueue
