(function() {
  "use strict";

  angular.module("cardDealer")
    .controller("cardDealerCtrl", cardDealer);

  function cardDealer() {
    var vm = this;
    vm.suits = ['♥', '♣', '♦', '♠'];
    vm.suitColors = {'♥': "red", '♣' : "black", '♦': "red", '♠': "black"};
    vm.cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    vm.deck = [];
    vm.hands = [];
    vm.handSize = 3;
    vm.suitsLen = vm.suits.length;
    vm.cardsLen = vm.cards.length;
    vm.Math = window.Math;
    var radius = 52 / vm.Math.PI ;
    var circleRad = vm.Math.PI * 1.5;

    function calcArcXOffset($index){
      var offsetIndex = (52 - vm.deck.length) + $index;
      var angle = vm.Math.PI / 2 + circleRad / 2 - offsetIndex * circleRad / 52
      var v = vm.Math.cos(angle) * radius;
      return v + 20 ;
    }

    function calcArcYOffset($index){
      var offsetIndex = (52 - vm.deck.length) + $index;
      var angle = vm.Math.PI / 2 + circleRad / 2 - offsetIndex * circleRad / 52
      var v = - vm.Math.sin(angle) * radius;
      return v + 20;
    }

    function calcArcRotation($index){
      var offsetIndex = (52 - vm.deck.length) + $index;
      var n = vm.Math.PI / 2 + circleRad / 2 + circleRad / 52 * offsetIndex ;
      return n;
    }


    vm.shuffle = function () {
      var arr = vm.deck,
        randomIndex, itemAtIndex, i;

      for (i = 0; i < arr.length; i++) {
        randomIndex = Math.floor(Math.random() * arr.length);
        itemAtIndex = arr[randomIndex];
        arr[randomIndex] = arr[i];
        arr[i] = itemAtIndex;
      }
    };

    function generateDeck(){
      for (var i = 0; i < vm.suitsLen; i++) {
        for(var j=0; j<vm.cardsLen; j++) {
          vm.deck.push(vm.suits[i] + vm.cards[j]);
        }
      }
    }

    vm.deal = function (number) {
      number = +number;

      if(vm.deck.length < number){
        return;
      }

      vm.hands.unshift(vm.deck.splice(0, number));
    }

    vm.refresh = function refresh(){
      vm.deck = [];
      vm.hands=[];
      generateDeck();
    }

    vm.positionStyle = function($index){
      var x = calcArcXOffset($index);
      var y = calcArcYOffset($index);
      var r = calcArcRotation($index);

      return {'transform': 'translateX('+ x + 'em) translateY('+ y + 'em) rotate('+ r + 'rad)',
        '-webkit-transform' : 'translateX('+ x + 'em) translateY('+ y + 'em) rotate('+ r + 'rad)',
        '-ms-transform': 'translateX('+ x + 'em) translateY('+ y + 'em) rotate('+ r + 'rad)'};

    };

    generateDeck();
  }
}());
