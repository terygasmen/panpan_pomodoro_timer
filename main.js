var num = document.getElementsByClassName('num');
var tickAudio = new Audio('https://freesound.org/data/previews/254/254316_4062622-lq.mp3');

// navigation
var start = document.getElementById('start');
var pause = document.getElementById('pause');
var restart = document.getElementById('restart');

// focus timer
var f_min_timer = document.getElementById('f_min_timer');
var f_sec_timer = document.getElementById('f_sec_timer');

// break timer
var b_min_timer = document.getElementById('b_min_timer');
var b_sec_timer = document.getElementById('b_sec_timer');

//reference to a timer variable
var startTimer;

// start timer button function
start.addEventListener(
    'click', function(){
        if(startTimer === undefined){
            startTimer = setInterval(timer, 1000)
        }
        else {
            alert("timer has already started");
        }
    }
)

// restart timer button function
restart.addEventListener(
    'click', function(){
        //hide the break timer while focus timer is active
        $('#focus_timer').removeClass('hide_timer');
        $('#break_timer').addClass('hide_timer');

        f_min_timer.innerText = '25';
        f_sec_timer.innerText = 0 + '0';

        b_min_timer.innerText = '5';
        b_sec_timer.innerText = 0 + '0';

        document.getElementById('counter').innerText = '0';
        stopInterval()
        startTimer = undefined;
    }
)

// pause timer button function
pause.addEventListener(
    'click', function(){
        stopInterval()
        startTimer = undefined;
    }
)


// start timer function
function timer(){
    tickAudio.play();
    //hide break timer while focus timer is active
    $('#focus_timer').removeClass('hide_timer');
    $('#break_timer').addClass('hide_timer');

    //focus timer countdown
    if(f_sec_timer.innerText != 0){
        f_sec_timer.innerText--;
        if (f_sec_timer.innerText < 10) {
            parseInt(f_sec_timer.innerText = '0' + f_sec_timer.innerText.toString()); 
        }
    }
    else if(f_min_timer.innerText != 0 && f_sec_timer.innerText == 0){
        f_sec_timer.innerText = 59;
        f_min_timer.innerText--;
        if (f_min_timer.innerText < 10) {
            parseInt(f_min_timer.innerText = '0' + f_min_timer.innerText.toString()); 
        }
    }

    // break timer countdown
    if(f_min_timer.innerText == 0 && f_sec_timer.innerText == 0){
        // hide focus timer while the break timer is active
        $('#focus_timer').addClass('hide_timer');
        $('#break_timer').removeClass('hide_timer');
        if(b_sec_timer.innerText != 0){
            b_sec_timer.innerText--;
            if (b_sec_timer.innerText < 10) {
                parseInt(b_sec_timer.innerText = '0' + b_sec_timer.innerText.toString()); 
            }
        }
        else if(b_min_timer.innerText != 0 && b_sec_timer.innerText == 0){
            b_sec_timer.innerText = 59;
            b_min_timer.innerText--;
            if (b_min_timer.innerText < 10) {
                parseInt(b_min_timer.innerText = '0' + b_min_timer.innerText.toString()); 
            }
        }
    }

    //increment pomodoros by one if one full cycle is completed
    if(f_min_timer.innerText==0 && f_sec_timer.innerText==0 && b_min_timer.innerText==0 && b_sec_timer.innerText == 0){
        //reset timer
        f_min_timer.innerText = 25;
        f_sec_timer.innerText = '00';
        b_min_timer.innerText = 05;
        b_sec_timer.innerText = '00';

        document.getElementById('counter').innerText++;
    }
}

//stop timer function
function stopInterval(){
    clearInterval(startTimer);
}
