const isb = new Int32Array(new SharedArrayBuffer(4))
function sleep (ms) {
    Atomics.wait(isb, 0, 0, ms)
}
