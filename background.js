loadMusic();

var audio;

//播放音乐
function startMusic(){
    var sound = audio;
    if (sound && sound.src) {
        //如果处于播放状态，则不处理
        if (!sound.paused) {
            return;
        }

        // Sometimes, when playing multiple times, readyState is HAVE_METADATA.
        if (sound.readyState == 0) {  // HAVE_NOTHING
            console.log("bad ready state: " + sound.readyState);
        } else if (sound.error) {
            console.log("media error: " + sound.error);
        } else {
            sound.play();
        }
    } else {
        console.log("bad playSound: ");
    }
}
//停止音乐
function stopMusic(){
    audio.pause();
    audio.currentTime = 0;
}
//加载音乐
function loadMusic(callback){
    audio = new Audio();
    //audio.id = id;
    audio.onerror = function() {
        console.log("音乐加载失败");
    };
    audio.addEventListener("canplaythrough", function() {
        //soundLoaded(audio, id);
    }, false);

    audio.src = "music.mp3";
    audio.load();
    window.setTimeout(function(){
        callback();
    },200);
}
chrome.extension.onRequest.addListener(contentScriptHandler);

function contentScriptHandler(request){
    switch(request.eventName){
        case "start":
            startMusic();
            break;
        case "stop":
            stopMusic();
            break;
    }
}


