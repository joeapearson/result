# opres - Operation Result

Rust-inspired `std::result` object for JavaScript.

## Usage

The idea is to return `OperationResult` objects from places where you expect failures - database
calls, file I/O, remote APIs and so on.  `OperationResult` encapsulates success of the operation,
any data returned, and any errors that occurred along the way, allowing you to cleanly write your
failure-handling logic on top.

```js
const OperationResult = require('opres');

const goodApiCall = () => {
  return new OperationResult('my returned data');
}

const badApiCall = () => {
  return new OperationResult(null, new Error('something went wrong'));
}

// later on in your calling code somewhere
const res1 = goodApiCall();

if (res1.ok) {
  console.log(res1.data);
} else {
  console.error(res1.error);
}

// You can also cause errors to throw using `expect()`.  In this case an error would throw.
const res2 = badApiCall().expect('could not call API');
// However, `expect()` is a no-op for successful operations:
const res3 = goodApiCall().expect('this will not throw');
```

## Other notes

### Pattern matching

JavaScript can't really do any of the nice pattern matching stuff that Rust can do so that's not
supported.

The closest you can get is an if statement as seen above:

```js
if (res.ok) {
  // successful
} else {
  // not
}
```

You'll probably recognise the fetch-style `.ok`.

### Contributions

Pull requests are welcome.

### Thanks

If this is useful for you let me know!
