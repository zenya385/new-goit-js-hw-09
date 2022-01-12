import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const inputdelay = document.querySelector('[name="delay"]');
const inputstep = document.querySelector('[name="step"]');
const inputamount = document.querySelector('[name="amount"]');
// const btnCreatePromises = document.querySelector('[type="submit"]');

form.addEventListener('submit', e => {
  e.preventDefault();
  let delayValue = +inputdelay.value;
  let stepValue = +inputstep.value;
  const amountValue = +inputamount.value;
  console.log(delayValue);
  for (let i = 1; i <= amountValue; i++) {
    createPromise(i, delayValue)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayValue += stepValue;
  }
});

function createPromise(position, delay) {
  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });
  return promise;
}
