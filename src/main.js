{
  window.Rx = require("rxjs");
  const req = require.context('./api-demo', true, /\.js$/);
  let modules = req.keys();
  for (let src of modules) {
    req(src);
  }
}
{
  window.Rx = require("rxjs");
  const req = require.context('./api-demo', true, /\.ts$/);
  let modules = req.keys();
  for (let src of modules) {
    req(src);
  }
}