const exercises = [
    {
        type: 'syllables',
        text: 'der Hase',
        syllables: [ 'der', '\xa0', 'Ha', 'se'],
        image: 'rabbit.jpg',
        sound: 'der-hase'
    }, {
        type: 'syllables',
        text: 'der Löwe',
        syllables: [ 'der', '\xa0', 'Lö', 'we'],
        image: 'lion.jpg',
        sound: 'der-löwe'
    }, {
        type: 'syllables',
        text: 'die Katze',
        syllables: [ 'die', '\xa0', 'Kat', 'ze'],
        image: 'cat.png',
        sound: 'die-katze'
    }, {
        type: 'syllables',
        text: 'das Paket',
        syllables: [ 'das', '\xa0', 'Pa', 'ket'],
        image: 'package.jpg',
        sound: 'das-paket'
    }, {
        type: 'letters',
        text: 'Hase',
        syllables: [ 'H', 'a', 's', 'e'],
        image: 'rabbit.jpg',
        sound: 'hase'
    }, {
        type: 'words',
        text: 'dieKatzehatHunger',
        syllables: [ 'die', 'Katze', 'hat', 'Hunger'],
        image: 'hungry-cat.gif',
        sound: 'die-katze-hat-hunger'
    }
/*    , {
        type: 'pictures',
        text: 'Katze',
        images: [
            { name: 'Katze', src: 'cat.png'}, 
            { name: 'Hase', src: 'rabbit.jpg'}, 
            { name: 'Paket', src: 'package.jpg'}, 
            { name: 'Löwe', src: 'lion.jpg'}
        ] 
    }
    */
];
const snd = new Audio();

let randomIndexes = shuffle(Array.from(exercises.keys()));
let currentIndex = 0;

nextExercise();

function loadExercise() {

    $('#workarea').removeClass();
    $('#workarea').addClass(exercise.type);
    $('<button />', {
        'id': 'speaker',
        'type': 'button',
        'class': 'btn btn-outline-secondary',
        'text': '🔊',
    }).appendTo('#workarea');

    if (exercise.type == 'pictures') {
        $('#exercise .container').text(exercise.text);
        $('#exercise .container img').hide();
        $('#speaker').hide();
        
        exercise.images = shuffle(exercise.images);
        $.each(exercise.images, function(index, value) {
            let $imageContainer = $('<div />').appendTo('#workarea');
            $('<img />', {
                'data-name': value.name,
                'src': 'img/' + value.src
            }).appendTo($imageContainer);
        });
        
        $('#workarea').on('click', 'div', function(){
            $('#workarea div').removeClass('selected');
            $(this).addClass('selected');
        });
    } else {
        $('<p />', {
            'id': 'user-answer',
        }).appendTo('#workarea');
        $('<p />', {
            'id': 'available-syllables',
        }).appendTo('#workarea');

        $('#exercise .container img').show();
        $('#exercise .container img').attr('src', 'img/' + exercise.image);
        $('#speaker').show();

        $('#user-answer').empty();
        $('#available-syllables').empty();

        exercise.syllables = shuffle(exercise.syllables);
        $.each(exercise.syllables, function(index, value) {
            $('<button />', {
                'type': 'button',
                'class': "btn btn-outline-secondary",
                'text': value
            }).appendTo('#available-syllables');
        });

        $('#available-syllables').on('click', 'button', function(e){
            moveSyllable($(e.target), $('#user-answer'));
            if ($(e.target).text()!='\xa0') {
                var sndFile = $(e.target).text().toLowerCase();
                playSound(sndFile);
            }
        });
        $('#user-answer').on('click', 'button', function(e){
            moveSyllable($(e.target), $('#available-syllables'));
        });
    }

    $('#main-action').text('✓').removeClass('btn-success').addClass('btn-info');
    $('#main-action').data('action', 'check-answer');

    // check current events on a jQuery object
    // var foo = $._data( $('#speaker').get(0), 'events' );
    // $.each( foo, function(guid, handler) { console.log(guid); console.log(handler) });

    $('#speaker').click(function(){
        let sound = playSound(exercise.sound);
        sound.addEventListener("ended", function(){
            // this will remove the :focus but, in mobile, it will still show :hover
            // mobile browsers apply :hover to the last clicked element
            $('#speaker').blur();
        });
    });

}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

function playSound(fileName) {
    snd.src = 'snd/' + fileName + '.mp3';
    //snd.currentTime = 0;
    snd.play();
    return snd;
}


function moveSyllable($syllable, destination) {
    $('#user-answer button').removeClass('btn-danger');
    $syllable.toggleClass('btn-info');
    $syllable.toggleClass('btn-outline-secondary');
    $syllable.appendTo(destination);
}

$('#main-action').click(function() {
   $(this).data('action') == "check-answer" ? checkAnswer() : nextExercise();
});

function checkAnswer() {
    var userAnswer = $('#user-answer button').map((i, el) => el.innerText).get().join('');

    if (userAnswer.replace('\xa0', ' ') == exercise.text) {
        $('#overlay').animate({
            opacity: 'toggle',
            top: 0
          }, 1000);
        playSound('yay');
        $('#user-answer').css('background-color', 'transparent');
        $('#user-answer button').css('border-radius', 0);
        $('#user-answer button').removeClass('btn-info').addClass('btn-success');
        $('#main-action').text('➜').removeClass('btn-info').addClass('btn-success');
        $('#main-action').data('action', 'nextExercise');
    } else {
        $('#user-answer button').addClass('btn-danger');
        playSound('uh-oh');
    }
}

function reset() {
    $('#overlay').hide();
    $('#overlay').css('top', '-100%');
    $('#speaker').remove(); // .remove() includes .off();
    $('#available-syllables').remove();
    $('#user-answer').remove();
}

function nextExercise() {
    reset();
    exerciseIndex = randomIndexes[currentIndex];
    exercise = exercises[exerciseIndex];
    currentIndex++;
    if (currentIndex >= randomIndexes.length ) {
        randomIndexes = shuffle(randomIndexes);
        currentIndex = 0;
    }
    loadExercise();
}