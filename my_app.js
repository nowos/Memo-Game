var one = 'empty';
var two = 'empty';
var click = 0;
var round = 0;
var matched = 0;
var cards = 0;
var l = 0;

var imagesBox1 = [
   "images/WilkMEM.jpg",
   "images/KonMEM.jpg",
   "images/LionMEM.jpg",
   "images/owcaMEM.jpg",
   "images/LionMEM.jpg",
   "images/WilkMEM.jpg",
   "images/owcaMEM.jpg",
   "images/LionMEM.jpg",
   "images/KonMEM.jpg"
];

var imagesBox2 = [
   "images/ChichenMEM.jpg",
   "images/ColosseumMEM.jpg",
   "images/EifelMEM.jpg",
   "images/ChichenMEM.jpg",
   "images/TajMahalMEM.jpg",
   "images/ColosseumMEM.jpg",
   "images/pyramidMEM.jpg",
   "images/statueMEM.jpg",
   "images/pyramidMEM.jpg",
   "images/TajMahalMEM.jpg",
   "images/EifelMEM.jpg",
   "images/statueMEM.jpg"
];

var imagesBox3 = [
   "images/znak1.png",
   "images/znak2.png",
   "images/znak9.png",
   "images/znak11.png",
   "images/znak5.png",
   "images/znak3.png",
   "images/znak6.png",
   "images/znak1.png",
   "images/znak4.png",
   "images/znak5.png",
   "images/znak6.png",
   "images/znak4.png",
   "images/znak7.png",
   "images/znak9.png",
   "images/znak2.png",
   "images/znak10.png",
   "images/znak7.png",
   "images/znak11.png",
   "images/znak3.png",
   "images/znak10.png"
];

//shuffle function

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
};

//przycisk start
$('.btStart').on('click', function () {
   
   imagesBox1 = shuffle(imagesBox1);
   //wyzeruj rundy
   round = 0;
   //ustaw liczbę kart
   cards = 9;
   //ustaw level
   l = 1;
   
});

//przycisk start
$('.btStart2').on('click', function () {

   imagesBox2 = shuffle(imagesBox2);
   //wyzeruj rundy
   round = 0;
   //ustaw liczbę kart
   cards = 12;
   //ustaw level
   l = 2;

});

//przycisk start
$('.btStart3').on('click', function () {

   imagesBox3 = shuffle(imagesBox3);
   //wyzeruj rundy
   round = 0;
   //ustaw liczbę kart
   cards = 20;
   //ustaw level
   l = 3;

});


var removeImages = function () {
   for (i = 1; i <= cards; i++) {
      //usuń content, a potem samą klasę additional ze wszystkich div-ów, w których jest 
      $('.additional' + i).css({'content': ''});
      $('.d' + i)[0].classList.remove("additional" + i);
   }
   ;
};
var clickCounter = function () {
   if (click >= 2) {
      removeImages();
      click = 0;
   }
};

var roundFunction = function () {
   $('.round').text("Round " + round);
};

var winFunction = function () {
   alert('You won!! Congratulation!!');
   matched = 0;
};

//show image
var clickFunction = function () {

//pętla na divach

   for (i = 0; i <= cards; i++) {
      $('.d' + i).on('click', onClickFunction = function () {

         //wyzeruj obrazki jeśli było ponad 2 cliknięcia
         clickCounter();
         click = click + 1;

//szukanie obrazka do kliknietego pola
         for (var i = 0; i <= cards; i++) {

//jeśli znaleziony będzie obrazek do pola, to:
            if ($(this)[0].className === "emptyImg d" + (i + 1)) {

//znalezienie który div - numer pod var char
               var imgChosen = $(this)[0].className;
               //znalezienie numeru diva po ostatniej literze
               char = imgChosen.charAt(imgChosen.length - 1);
//dodanie klasy 
               $(this).addClass('additional' + char);

//dodanie do dodanej klasy obrazka odpowiadającego kolejności div 
               $('.additional' + char).css({'content': 'url' + "('" + imagesBox1[i] + "')"});
               //jeśli one puste to przypisz nazwę obrazka
               if (one === 'empty') {
                  one = imagesBox1[i];

               }
//jeśli one pełne to przypisz nazwę obrazka do two
               else if (one !== 'empty') {
                  two = imagesBox1[i];
               }
               //MATCHING

//jeśli oba pełne to porównanie wystąpi
               if (one !== 'empty' & two !== 'empty') {
                  //aktualizacja rundy
                  round = round + 1;
                  roundFunction();

                  if (one === two) {
                     one = 'empty';
                     two = 'empty';
                     matched = matched + 1;
                     if (matched === 5) {
                        winFunction();
                     }

//jeśli będzie dopasowanie, to zainstaluj CT obrazek
                     for (i = 1; i <= cards; i++) {
                        if ($('.d' + i).hasClass('additional' + i)) {
                           $('.d' + i).addClass('matched');
                        }
                    ;
                     }
//jeśli są niedopasowane
                  } else {
                     one = 'empty';
                     two = 'empty';
                  }
               }
            }
            ;
         }
         ;
      });//end of onClickFunction
   }
   ;
};

var main = function () {
   clickFunction();
};

$(document).ready(main);


