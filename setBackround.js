

const IMAGES_LENGTH = 5;
let $reloadBackground = document.getElementById('reloadBackground');

const randInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


function setRandomImage() {
  let randomImage = randInt(0, IMAGES_LENGTH);
  let imageUrl = `url(./images/${randomImage}.webp)`;
  let $body = document.body;
  $body.style.backgroundImage = imageUrl;
}

window.onload = () => setRandomImage();
$reloadBackground.onclick = () => setRandomImage();
