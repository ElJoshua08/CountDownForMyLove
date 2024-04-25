let months = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

function setDate() {
  let $date = document.getElementById('date');
  let currentDate = new Date();
  let currentDay = currentDate.getDate();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();
  let targetMonth = currentMonth;
  let targetYear = currentYear;

  // Si estamos después del día 14 del mes actual, apuntamos al próximo mes
  if (currentDay > 14) {
    targetMonth = (currentMonth + 1) % 12; // Aseguramos que estemos dentro de los límites de los meses
    if (targetMonth === 0) {
      // Si el próximo mes es enero, incrementamos el año
      targetYear++;
    }
  }

  let formattedDay = '14'; // Siempre establecemos el día 14
  let formattedMonth = months[targetMonth + 1];
  let formattedYear = `${targetYear}`;

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
  let $days = document.getElementById('days');

  setDigits($days, 2);
  setDigits($hours, 2);
  setDigits($minutes, 2);
  setDigits($seconds, 2);
}

function setHour() {
  function formatNumber(num) {
    return num < 10 ? `0${num}` : num;
  }

  let $days = document.getElementById('days');
  let $hour = document.getElementById('hours');
  let $minutes = document.getElementById('minutes');
  let $seconds = document.getElementById('seconds');

  let currentDate = new Date();
  let targetDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    14
  ); // Fecha objetivo: 14 del próximo mes
  let timeDifference = targetDate - currentDate; // Diferencia de tiempo en milisegundos

  // Convertir la diferencia de tiempo a días, horas, minutos y segundos
  let remainingDays = formatNumber(
    Math.floor(timeDifference / (1000 * 60 * 60 * 24))
  );
  let remainingHours = formatNumber(
    Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  );
  let remainingMinutes = formatNumber(
    Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
  );
  let remainingSeconds = formatNumber(
    Math.floor((timeDifference % (1000 * 60)) / 1000)
  );


  setNumber($days, remainingDays);
  setNumber($hour, remainingHours);
  setNumber($minutes, remainingMinutes);
  setNumber($seconds, remainingSeconds);

  console.log(
    remainingDays,
    remainingHours,
    remainingMinutes,
    remainingSeconds
  );
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
