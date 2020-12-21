import { radioPlayerInit } from './radioPlayer.js';
import { musicPlayerInit } from './musicPlayer.js';
import { videoPlayerInit } from './videoPlayer.js';

const playerBtn = document.querySelectorAll('.player-btn');
const playerBlock = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');

const deactivationPlayer = () => {
  temp.style.display = 'none';
  playerBtn.forEach(item => item.classList.remove('active'));
  playerBlock.forEach(item => item.classList.remove('active'));
}

// forEack - метод принимает колбек функцию(запущена внутри функции) 
playerBtn.forEach((btn, i) => btn.addEventListener('click', () => {
  deactivationPlayer();
  // У classList есть еще 3 метод - toggle - удаляет, если есть, добавляет, если нет
  btn.classList.add('active');
  playerBlock[i].classList.add('active');
}));


radioPlayerInit();
musicPlayerInit();
videoPlayerInit();