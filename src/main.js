/* {
  window.Rx = require("rxjs/Rx");
  const req = require.context('./api-demo', true, /\.js$/);
  let modules = req.keys();
  for (let src of modules) {
    req(src);
  }
} */
/*{
  const req = require.context('./api-demo', true, /\.ts$/);
  let modules = req.keys();
  for (let src of modules) {
    req(src);
  }
}*/
require('./icon-manager/icon-manager.js')