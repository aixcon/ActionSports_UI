// streaming controls
const videoPlayer = document.querySelector(".video_player")
const video = videoPlayer.querySelector(".video_player__video")
const playButton = videoPlayer.querySelector('.video_player__controls__play_button')

const liveplayItemOverlayIcon = videoPlayer.querySelector(".liveplay__item__overlay__icon")
const liveplayItemOverlayBox = videoPlayer.querySelector(".liveplay__item__overlay__box")

// Play and Pause button
function displayPauseEffect() {
    video.pause();
    playButton.children[0].classList.replace("bi-pause-fill", "bi-play-fill");
    if (liveplayItemOverlayIcon) liveplayItemOverlayIcon.style.display = "block";
    if (liveplayItemOverlayBox) liveplayItemOverlayBox.style.display = "block";
}

function displayPlayEffect() {
    video.play();
    playButton.children[0].classList.replace("bi-play-fill", "bi-pause-fill");
    if (liveplayItemOverlayIcon) liveplayItemOverlayIcon.style.display = "none";
    if (liveplayItemOverlayBox) liveplayItemOverlayBox.style.display = "none";
}

playButton.addEventListener('click', () => {
    (video.paused) ? displayPlayEffect(): displayPauseEffect();
})

video.addEventListener("click", () => {
    (video.paused) ? displayPlayEffect(): displayPauseEffect();
})

// preferences
const settingButton = videoPlayer.querySelector(".video_player__controls__setting_button")
const preferences = videoPlayer.querySelector(".video_player__preferences");
const preferencesPlaybackSpeedText = preferences.querySelector(".video_player__playback_speed__text");

settingButton.addEventListener("click", (e) => {
    if (preferences.classList.contains("active")) {
        preferences.classList.remove("active");
        resolutionSetting.classList.remove("active");
    } else {
        preferences.classList.add("active");
        resolutionSetting.classList.remove("active");
    }
})

// preferences__resolution
const resolutionButton = videoPlayer.querySelector(".video_player__resolution");
const resolutionSetting = videoPlayer.querySelector(".video_player__resolution__setting");
const resolutionSettingPreviousButton = resolutionSetting.querySelector(".video_player__resolution__setting__previous");

resolutionButton.addEventListener('click', () => {
    if (resolutionSetting.classList.contains("active")) {
        resolutionSetting.classList.remove("active");
        preferences.classList.add("active");
    } else {
        resolutionSetting.classList.add("active");
        preferences.classList.remove("active");
    }
})

resolutionSettingPreviousButton.addEventListener('click', () => {
    resolutionSetting.classList.remove("active");
    preferences.classList.add("active");
})

// preferences__playback_speed
const playbackSpeedButton = videoPlayer.querySelector(".video_player__playback_speed");
const playbackSpeedSetting = videoPlayer.querySelector(".video_player__playback_speed__setting");
const playbackSpeedSettingPreviousButton = playbackSpeedSetting.querySelector(".video_player__playback_speed__setting__previous");
const playbackSpeedSettingItem = playbackSpeedSetting.querySelectorAll(".video_player__playback_speed__setting__item");

playbackSpeedButton.addEventListener('click', () => {
    if (resolutionSetting.classList.contains("active")) {
        playbackSpeedSetting.classList.remove("active");
        preferences.classList.add("active");
    } else {
        playbackSpeedSetting.classList.add("active");
        preferences.classList.remove("active");
    }
})

playbackSpeedSettingPreviousButton.addEventListener('click', () => {
    playbackSpeedSetting.classList.remove("active");
    preferences.classList.add("active");
})

Array.from(playbackSpeedSettingItem).forEach((button) => {
    button.addEventListener('click', () => {
        video.playbackRate = button.value;
        playbackSpeedSetting.classList.remove("active");
        preferences.classList.add("active");
        removeActiveAll(playbackSpeedSettingItem);
        button.classList.add("active");
        preferencesPlaybackSpeedText.innerText = button.innerHTML;
    });
});

function removeActiveAll(items) {
    Array.from(items).forEach((item) => {
        item.classList.remove("active");
    });
}


// full screen
const fullScreenButton = videoPlayer.querySelector(".video_player__controls__full_screen_button");

fullScreenButton.addEventListener("click", () => {
    return toggleFullScreen();
})

function isFullScreen() {
    return (document.fullScreenElement && document.fullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null) ||
        (document.mozFullScreen || document.webkitIsFullScreen);
}

function enterFullScreen() {
    const page = videoPlayer
    if (page.requestFullscreen) {
        page.requestFullscreen();
        toggleActiveElement(page);
    } else if (page.mozRequestFullScreen) page.mozRequestFullScreen();
    else if (page.msRequestFullscreen) page.msRequestFullscreen();
    else if (page.webkitRequestFullScreen) page.webkitRequestFullScreen();
}



function exitFullScreen() {
    if (document.exitFullScreen) {
        toggleActiveElement(videoPlayer);
        return document.exitFullScreen();
    } else if (document.webkitExitFullscreen) {
        toggleActiveElement(videoPlayer);
        return document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        toggleActiveElement(videoPlayer);
        return document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        toggleActiveElement(videoPlayer);
        return document.mozCancelFullScreen();
    }
}

function toggleFullScreen() {
    if (!isFullScreen()) {
        return enterFullScreen();
    } else {
        return exitFullScreen();
    }
}


const videoPlayerCloseButton = videoPlayer.querySelector(".video_player__close")

videoPlayerCloseButton.addEventListener("click", () => {
    if (document.exitFullscreen) {
        document.exitFullscreen();
        videoPlayer.classList.remove("active");
    }
})


// volume
const videoPlayerControlsLeft = document.querySelector('.video_player__controls__left');
const volumeControl = document.querySelector('.video_player__controls__volume');
const volumePanel = document.querySelector('.video_player__controls__volume__panel');
const volumeRange = volumePanel.querySelector('input');
const volumeProgress = volumePanel.querySelector('.volume-progress');
const volumeButton = document.querySelector('.video_player__controls__volume_button');

const fullVolumeButton = volumeButton.querySelector('.full-volume');
const halfVolumeButton = volumeButton.querySelector('.half-volume');
const mutedButton = volumeButton.querySelector('.muted');

halfVolumeButton.style.display = 'none';
mutedButton.style.display = 'none';

function toggleMute() {
    video.muted = !video.muted;
    if (video.muted) {
        fullVolumeButton.style.display = 'none';
        halfVolumeButton.style.display = 'none';
        mutedButton.style.display = '';
        volumeRange.value = '0';
    } else {
        volumeRange.value = video.volume * 100;

        if (video.volume <= 0.5) {
            fullVolumeButton.style.display = 'none';
            halfVolumeButton.style.display = '';
            mutedButton.style.display = 'none';
        } else if (video.volume > 0.5) {
            fullVolumeButton.style.display = '';
            halfVolumeButton.style.display = 'none';
            mutedButton.style.display = 'none';
        }
    }
};

volumeButton.addEventListener('click', toggleMute);

volumeRange.addEventListener('input', () => {
    volumeProgress.style.width = volumeRange.value + '%';
    video.volume = volumeRange.value / 100;

    if (volumeRange.value <= 0) {
        fullVolumeButton.style.display = 'none';
        halfVolumeButton.style.display = 'none';
        mutedButton.style.display = '';
    } else if (volumeRange.value <= 50) {
        video.muted = false;
        fullVolumeButton.style.display = 'none';
        halfVolumeButton.style.display = '';
        mutedButton.style.display = 'none';
    } else if (volumeRange.value > 50) {
        video.muted = false;
        fullVolumeButton.style.display = '';
        halfVolumeButton.style.display = 'none';
        mutedButton.style.display = 'none';
    }
}, false);

volumeButton.addEventListener('mouseenter', () => {
    volumeControl.style.margin = '0px 2px 0px 0px';
    volumePanel.style.width = '110px';
});

videoPlayerControlsLeft.addEventListener('mouseleave', () => {
    volumeControl.style.margin = '0px 0px 0px 0px';
    volumePanel.style.width = '0px';
});

setInterval(() => {
    volumeProgress.style.width = volumeRange.value + '%';
}, 1);


function toggleActiveElement(element) {
    return (!element.classList.contains("active")) ? element.classList.add("active") : element.classList.remove("active");
}