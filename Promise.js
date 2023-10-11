class MyPromise {
  
  constructor(executor) {
    this._state = 'pending';
    this._callbacks = [];
    try {
      executor(this._resolve.bind(this), this._reject.bind(this));
    } catch (err) {
      this._reject(err);
    }
  }
  
  _resolve(value) {
    if (this._state !== 'pending') return;
    this._state = 'fulfilled';
    this._result = value;
    this._handleSettled('onFulfilled');
  }
  
  _reject(err) {
    if (this._state !== 'pending') return;
    this._state = 'rejected';
    this._result = err;
    this._handleSettled('onRejected');    
  }
  
  _handleSettled(onSettled) {
    queueMicrotask(() => {
      for(const cb of this._callbacks) {
        try {
          const returned = cb[onSettled](this._result);
          if (returned instanceof MyPromise) {
            returned.then(cb.resolve, cb.reject);
          } else {
            cb.resolve(returned);
          }
        } catch (err) {
          cb.reject(err);
        }
      }
    });
  }
  
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this._callbacks.push({
        onFulfilled: onFulfilled ?? ((value) => value),
        onRejected: onRejected ?? ((err) => { throw err }),
        resolve,
        reject
      })
    });
  }
  
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
  
  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise((res) => res(value));
  }
  
  static reject(err) {
    return new MyPromise((_,rej) => rej(err));
  }
}
