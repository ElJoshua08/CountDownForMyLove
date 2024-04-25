function setDate() {
  let $date = document.getElementById('date');
  let currentDate = new Date();
  let formattedDay = `${currentDate.getDate()}`;
  let formattedMonth = `${months[currentDate.getMonth() + 1]} `;
  let formattedYear = `${currentDate.getFullYear()}`;

  $date.innerHTML = `
    <div>${formattedDay}</div>
    <div>${formattedMonth}</div>
    <div>${formattedYear}</div>
  `;
}

function setDigits(container, digitNumber) {
  for (let digit = 1; digit <= digitNumber; digit++) {
    let $digit = document.createElement('div');
    for (let number = 0; number <= 9; number++) {
      let $number = document.createElement('div');
      $number.classList.add('number');
      $number.classList.add(number);
      $number.textContent = number;
      $digit.appendChild($number);
    }
    $digit.classList.add('digit');
    container.appendChild($digit);
  }
}

function setDisplayHeight() {
  let $container = document.getElementById('time');
  let $time = document.getElementById('hours');
  let $number = $time
    .getElementsByClassName('digit')[0]
    .getElementsByClassName('0')[0];
  let numberRect = $number.getBoundingClientRect();

  // Set the height of the container to the height of the number
  $container.style.height = `${numberRect.height + 30}px`;
}

function setNumber(container, number) {
  let parsedNumber = number.toString().split('');
  let $digits = container.querySelectorAll('.digit');

  $digits.forEach((digit, index) => {
    let $number = digit.getElementsByClassName(parsedNumber[index])[0];

    // Calculate the position of the number relative to the digit container
    let numberPosition = $number.offsetTop - digit.offsetTop;

    // Set the scroll position to align the number at the center of the digit container
    digit.scrollTo({
      top: numberPosition - (digit.clientHeight - $number.clientHeight) / 2,
      behavior: 'smooth',
    });
  });
}

function createClock() {
  let $hours = document.getElementById('hours');
  let $minutes = document.getElementById('minutes');
  let $seconds = document.getElementById('seconds');

  setDigits($hours, 2);
  setDigits($minutes, 2);
  setDigits($seconds, 2);
}

function setHour() {
  let $hour = document.getElementById('hours');
  let $minutes = document.getElementById('minutes');
  let $seconds = document.getElementById('seconds');

  let currentHour = new Date();
  let formattedHours = ('0' + currentHour.getHours()).slice(-2);
  let formattedMinutes = ('0' + currentHour.getMinutes()).slice(-2);
  let formattedSeconds = ('0' + currentHour.getSeconds()).slice(-2);

  setNumber($hour, formattedHours);
  setNumber($minutes, formattedMinutes);
  setNumber($seconds, formattedSeconds);

  console.log(formattedHours, formattedMinutes, formattedSeconds);
}

window.addEventListener('load', () => {
  createClock();
  setDisplayHeight();
  setInterval(() => {
    setDate();
    setHour();
  }, 1000);
});

window.addEventListener('resize', () => {
  setDisplayHeight();
});
