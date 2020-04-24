let buttons =  document.querySelectorAll('[data-time]');
let input = document.querySelector('input');


const timer = (function() {
    let countDown,
        timerDisplay,
        endTime,
        alarmSound;

    function init(settings) {
       
        timerDisplay = document.querySelector(settings.timeLeftSelector);
        endTime = document.querySelector(settings.timeEndSelector);

        if(settings.alarmSound) {
            alarmSound = new Audio(settings.alarmSound);
        }

    }    
    function start(seconds) {
        if(!timerDisplay || !endTime) return console.log('Please init module');
        if(!seconds || typeof seconds !== 'number') return console.log('Please provide seconds');
        
        alarmSound.currentTime = 0;
        clearInterval(countDown);
        displayTimeLeft(seconds);

        const now = Date.now();
        const then = now + seconds * 1000;
        displayEndTime(then);
        countDown = setInterval(() => {
            const secondsLeft = Math.round((then - Date.now()) / 1000);
            if(secondsLeft < 0){
                clearInterval(countDown);
                playSound()
                return
            }
            displayTimeLeft(secondsLeft);
        },1000)

    }
    function displayTimeLeft(seconds) {
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds/60)%24);
        const minutes = Math.floor((seconds/60)%60);;
        const reminderSeconds = seconds % 60;
		const display = `${days < 10 ? '0':''}${days}:${hours < 10 ? '0': ''}${hours}:${minutes < 10 ? '0': ''}${minutes}:${reminderSeconds < 10 ? '0' : ''}${reminderSeconds}`;
        timerDisplay.textContent = display;

    }

    function displayEndTime(timestamp) {

        const weekDay = ['Mon', 'Thu', 'wed', 'Th', 'Fr', 'Sat', 'sun']
		const end = new Date(timestamp);
        const year = end.getFullYear();
        const month = end.getMonth();
        const dayOfWeek = weekDay[end.getDay()];
        const days =     end.getDate();
        const hours = end.getHours();
        const minuts = end.getMinutes();
        
        
        endTime.textContent = `will finish ${year}.${month < 10 ? '0': ''}${month}.${days < 10 ? '0': ''}${days}   ${hours < 10 ? '0': ''}${hours}:${minuts < 10 ? '0' : ''}${minuts}`;
    }
    function stop() {

    }
    function playSound() {
        alarmSound.play();
         

    }
    return {
        init,
        start,
        stop
    }

}());

//  init timer
timer.init({
    timeLeftSelector:'.display_time_left',
    timeEndSelector: '.display_end_time',
    alarmSound: './audio/bell.mp3'

})

//  start by click

function startTimer(e) {
     
    const seconds = parseInt(this.dataset.time);
   
    
    timer.start(seconds);

};

buttons.forEach( btn => btn.addEventListener( 'click', startTimer) );


let form = document.querySelector('.customForm');


form.addEventListener('submit', function(e) {
    
    e.preventDefault();
    let inputNum = parseInt(input.value); 
    if(!inputNum || typeof(inputNum) !== 'number') return console.log('Shoud be num')
    submitSecToMin(inputNum)
    
})
function submitSecToMin (minutes) { //меняет мин на сек и и запускает таймер
    let seconds = minutes * 60;
    timer.start(seconds);
}



