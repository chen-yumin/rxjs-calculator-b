import Rx from 'rxjs/Rx';

let result = 0;
let operation = '';
let displayRefresh = false;

const btns = document.getElementsByClassName("flex-item");

const stream$ = Rx.Observable.from(btns)
  .map(btn => Rx.Observable.fromEvent(btn, 'click')
    .mapTo(btn.textContent))
  .mergeAll()
  .merge(Rx.Observable.fromEvent(document, 'keypress')
    .pluck('key'));

stream$.subscribe(key => {
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
    const v = parseFloat(document.getElementsByTagName('input')[0].value);
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
    operation = key;
    displayRefresh = true;
  }
});
