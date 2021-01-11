import { addZero } from './supScipt.js'
export const videoPlayerInit = () => {
  // video-player
  // video-button__play
  // video-button__stop
  // video-time__passed
  // video-progress
  // video-time__total

  const videoPlayer = document.querySelector('.video-player');
  const videoButtonPlay = document.querySelector('.video-button__play');
  const videoButtonStop = document.querySelector('.video-button__stop');
  const videoProgress = document.querySelector('.video-progress');
  const videoTimePassed = document.querySelector('.video-time__passed');
  const videoTimeTotal = document.querySelector('.video-time__total');
  const videoFullScreen = document.querySelector('.video-fullscreen');
  const videoVolume = document.querySelector('.video-volume');
  const videoVolumeOff = document.querySelector('.fa-volume-down');

  videoFullScreen.addEventListener('click', () => {
    videoPlayer.requestFullscreen();
  });
  videoPlayer.addEventListener('fullscreenchange', () => {
    if(document.fullscreen){
      videoPlayer.controls = true;
    } else {
      videoPlayer.controls = false;
    }
  });

  const toggleIcon = () => {
    if (videoPlayer.paused) {
      videoButtonPlay.classList.remove('fa-pause');
      videoButtonPlay.classList.add('fa-play');
    } else {
      videoButtonPlay.classList.add('fa-pause');
      videoButtonPlay.classList.remove('fa-play');
    }
  };

  const togglePlay = event => {
    event.preventDefault();
    if (videoPlayer.paused) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }
  };
  
  const stopPlay = () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  };

  const changeValue = () => {
    const valueVolume = videoVolume.value;
    videoPlayer.volume = valueVolume / 100;
  };
  // Отключение звука через мут
  const changeValueOff = () => {
    if(!videoPlayer.muted){
      videoVolumeOff.classList.toggle('fa-volume-down');
      videoVolumeOff.classList.toggle('fa-volume-off');
      videoPlayer.muted = true;          // Через мут, звук остается на прежнем уровне
    } else {
      videoVolumeOff.classList.toggle('fa-volume-down');
      videoVolumeOff.classList.toggle('fa-volume-off');
      videoPlayer.muted = false;
    }
  };

  videoPlayer.addEventListener('click', togglePlay);
  videoButtonPlay.addEventListener('click', togglePlay);

  videoPlayer.addEventListener('play', toggleIcon);
  videoPlayer.addEventListener('pause', toggleIcon);

  videoButtonStop.addEventListener('click', stopPlay);

  videoPlayer.addEventListener('timeupdate', () => {
    const currentTime = videoPlayer.currentTime; // Текущее время, которое не меняется
    const duration = videoPlayer.duration; // НЕ меняющееся время, то, какая длительность видео

    videoProgress.value = (currentTime / duration) * 100;

    let minutePassed = Math.floor(currentTime / 60);
    let secondsPassed = Math.floor(currentTime % 60);

    let minuteTotal = Math.floor(duration / 60);
    let secondsTotal = Math.floor(duration % 60);
    
    videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
    videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;

  });

  videoProgress.addEventListener('input', () => {
    const duration = videoPlayer.duration;
    const value = videoProgress.value;

    videoPlayer.currentTime = (value * duration) / 100;
  })

  videoVolume.addEventListener('input', changeValue);

  videoPlayer.addEventListener('volumechange', () => {
    videoVolume.value = Math.round(videoPlayer.volume * 100)
  });

  changeValue();

  //когда происходит клик - вызываем фунцию отключения звука
  videoVolumeOff.addEventListener('click', changeValueOff);

  videoPlayerInit.stop = () => {
    videoPlayer.pause();
    toggleIcon();
  };
};



  