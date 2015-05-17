
/**
* @description listen links intelligence to the user interface.
* @function listen
*/
function listen(selectorForCumWrap) {
  var elem = global.document.querySelector(selectorForCumWrap);
  elem.onkeyup = function (e) {
    console.log(e);
  };
}
