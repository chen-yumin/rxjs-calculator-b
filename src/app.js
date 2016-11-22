import Rx from 'rxjs/Rx';

var result = 0;
var operation = '';
var displayRefresh = false;

var calcTempResult = function() {
  var v = parseFloat(document.getElementsByTagName('input')[0].value);
  if (operation === '+') {
    result += v;
  } else if (operation === '-') {
    result -= v;
  } else if (operation === 'x' || operation === '*') {
    result *= v;
  } else if (operation === '÷' || operation === '/') {
    result /= v;
  } else {
    result = v;
  }
  document.getElementsByTagName('input')[0].value = result;
};

var processKey = function(key) {
  if (/\d/.test(key) || key === '.') {
    // If the button is a number
    if (displayRefresh) {
      document.getElementsByTagName('input')[0].value = key;
      displayRefresh = false;
    } else {
      document.getElementsByTagName('input')[0].value += key;
    }
  } else if (key === 'C') {
    result = 0;
    operation = '';
    document.getElementsByTagName('input')[0].value = '0';
  } else {
    calcTempResult();
    operation = key;
    displayRefresh = true;
  }
}

var btns = document.getElementsByClassName("flex-item");
[].forEach.call(btns, function(btn) {
  btn.onclick = function() {
    processKey(btn.textContent);
  };

});

document.getElementsByTagName('body')[0].addEventListener("keypress", function(event) {
  processKey(event.key);
});
