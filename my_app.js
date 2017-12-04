var one = 'empty';
var two = 'empty';
var click = 0;
var round = 0;
var matched = 0;
var cards;
var name;
var lastName;
var username;
var imagesBox = new Array;
var rank;
var minPair;
var lvl;
var level;

var imagesBox1 = [
   "images/WilkMEM.jpg",
   "images/KonMEM.jpg",
   "images/LionMEM.jpg",
   "images/owcaMEM.jpg",
   "images/LionMEM.jpg",
   "images/WilkMEM.jpg",
   "images/owcaMEM.jpg",
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
   "images/statueMEM.jpeg",
   "images/pyramidMEM.jpg",
   "images/TajMahalMEM.jpg",
   "images/EifelMEM.jpg",
   "images/statueMEM.jpeg"
];
var imagesBox3 = [
   "images/znak1.png",
   "images/znak2.png",
   "images/znak9.png",
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
   "images/znak7.png",
   "images/znak3.png"

];

var removedItems = new Array;

//shuffle function

var setRemovedItems = function () {

   for (z = 0; z < 30; z++) {
      var itemR = removedItems[z];
      if (itemR !== null && itemR !== 'undefined') {
         localStorage.setItem(lvl + " " + z, removedItems[z]);
      }
   }

};

var setRanking = function () {

   Loop1:
           for (i = 1; i <= 10; i++) {
      Loop2:
              for (z = minPair; z < 25; z++) {
         //jeśli ilość rund mniejsza od któregoś z obecnych
         var sc = $(rank + 'Score' + i).html();
         //jeśli wynik w tdScore < i zaaplikuj nowe username o wyniku 'i' jeśli znajdziej w localSorage
         if (z < sc) {
            var item = localStorage.getItem(lvl + " " + z);
            if (item !== null && item !== 'undefined') {
               //to dodaj w tym miejscu wartość round i username i przerwij pętle
               $(rank + 'Score' + i).html(z);
               $(rank + 'User' + i).html(item);
               localStorage.removeItem(lvl + " " + z);
               removedItems[z] = item;
               continue Loop1;
            }
         }
      }
   }
   setRemovedItems();
};

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

var buttons = function () {

   $('.btStart').on('click', function () {
      
      location.reload();

      window.location.hash = "#view";

      imagesBox1 = shuffle(imagesBox1);
      //wyzeruj rundy
      round = 0;

   });

   $('.btStart2').on('click', function () {
      
      location.reload();

      window.location.hash = "#view";

      imagesBox2 = shuffle(imagesBox2);
      //wyzeruj rundy
      round = 0;

   });

   $('.btStart3').on('click', function () {
      
      location.reload();

      window.location.hash = "#view";

      imagesBox3 = shuffle(imagesBox3);
      //wyzeruj rundy
      round = 0;

   });
};

var removeImages = function () {

   for (i = 1; i <= cards; i++) {
      //usuń content, a potem samą klasę additional ze wszystkich div-ów, w których jest 
      $('.additional' + i).css({'content': ''});
      $('.d' + i)[0].classList.remove("additional" + i);
   };
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
   window.location.hash = "#view2";
};

var setLevel = function () {
   level = $('#view').text();
   
   switch (level) {
      case '1':
         cards = 8;
         imagesBox = imagesBox1;
         //ustal level do rankingu
         rank = '.l1';
         //minimalna ilość par
         minPair = 4;
         //lvl
         lvl = 1;
         break;
      case '2':
         cards = 12;
         imagesBox = imagesBox2;
         //ustaw liczbę kart
         rank = '.l2';
         //minimalna ilość par
         minPair = 6;
         lvl = 2;
         break;
      case '3':
         cards = 16;
         imagesBox = imagesBox3;
         //ustaw liczbę kart
         rank = '.l3';
         //minimalna ilość par
         minPair = 8;
         lvl = 3;
         break;
   };
};

var userName = function () {

   $('.submit').on('click', function () {
      name = $('#inlineFormName').val();
      lastName = $('#inlineFormLastName').val();
      username = name + ' ' + lastName;
      window.location.hash = "#view2";
      
//wrzuc do LS daną round pod wywołaniem username
Loop3:
      for (i = 1; i <= 10; i++) {
         //jeśli ilość rund mniejsza od któregoś z obecnych
         var sc = $(rank + 'Score' + i).html();

         if (round < $(rank + 'Score' + i).html()) {

            //to dodaj w tym miejscu wartość round i username i przerwij pętle
            $(rank + 'Score' + i).html(round);
            $(rank + 'User' + i).html(username);
            localStorage.setItem(lvl + " " + round, username);

            break Loop3;
         }
      }
  setRanking();
   });
};

//show image
var clickFunction = function () {

//pętla na divach
//ustawienia różnych leveli
   for (i = 1; i <= cards; i++) {
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

               //znalezienie numeru diva po ostatnim znaku lub znakach (>10 obiekt)
               if (i <= 8) {
                  char = imgChosen.charAt(imgChosen.length - 1);
               }
               //jeśli numer karty >= 10
               else if (i === 9) {
                  char = 10;
               } else if (i > 9) {
                  var firstChar = imgChosen.charAt(imgChosen.length - 2);

                  var secondChar = imgChosen.charAt(imgChosen.length - 1);

                  char = firstChar + secondChar;
               }
//dodanie klasy 
               $(this).addClass('additional' + char);
//dodanie do dodanej klasy obrazka odpowiadającego kolejności div 
               $('.additional' + char).css({'content': 'url' + "('" + imagesBox[i] + "')"});
               //jeśli one puste to przypisz nazwę obrazka
               if (one === 'empty') {
                  one = imagesBox[i];
               }
//jeśli one pełne to przypisz nazwę obrazka do two
               else if (one !== 'empty') {
                  two = imagesBox[i];
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
                     var pairs = cards / 2;
                     if (matched === pairs) {
                        winFunction();
                     }

//jeśli będzie dopasowanie, to zainstaluj CT obrazek
                     for (i = 1; i <= cards; i++) {
                        if ($('.d' + i).hasClass('additional' + i)) {
                           $('.d' + i).addClass('matched');
                        };
                     }
//jeśli są niedopasowane
                  } else {
                     one = 'empty';
                     two = 'empty';

                  }
               }
            };
         };
      }); //end of onClickFunction
   };
};
var main = function () {
   setLevel();
   buttons();
   clickFunction();
   userName();
};

$(document).ready(main);


//diagnoza - nie zamienia w CT obrazki po zmaczowaniu
//nie usuwa contentu obrazków w lev 2 i 3