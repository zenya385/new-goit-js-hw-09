import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputDate = document.querySelector('#datetime-picker');
const btn = document.querySelector('[data-start]');

const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');
btn.disabled = true;
btn.addEventListener('click', onTimerClick);

function onTimerClick(e) {
  const userDate = Date.parse(inputDate.value);
  // console.log(Date.parse(inputDate.value));
  setInterval(() => {
    const time = userDate - Date.now();

    const date = convertMs(time);
    refreshTimer(date);
  }, 1000);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      // alert('Please choose a date in the future');
    } else {
      btn.disabled = false;
    }
  },
};

flatpickr(inputDate, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function refreshTimer({ days, hours, minutes, seconds }) {
  daysRef.textContent = String(days).padStart(2, 0);
  hoursRef.textContent = String(hours).padStart(2, 0);
  minutesRef.textContent = String(minutes).padStart(2, 0);
  secondsRef.textContent = String(seconds).padStart(2, 0);
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
