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
    vm.shuffle = shuffle;
    vm.deal = deal;
    vm.handSize = 3;
    vm.suitsLen = vm.suits.length;
    vm.cardsLen = vm.cards.length;
    vm.Math = window.Math;
    vm.refresh = refresh;

    vm.calcArcXOffset = function($index){
      var n = vm.Math.PI * $index / vm.deck.length  ;
      var v = vm.Math.sin( n - vm.Math.PI / 2 );
      return v * vm.deck.length / 3 + vm.deck.length / 3 ;
    }

    vm.calcArcYOffset = function($index){
      var n = vm.Math.PI * $index / vm.deck.length;
      var v =  - vm.Math.cos( n - vm.Math.PI / 2 );
      return v * vm.deck.length / 3 + vm.deck.length / 3;
    }

    vm.calcArcRotation = function($index){
      var n = 180 * $index / vm.deck.length - 90;
      return n;
    }

    function generateDeck(){
      for (var i = 0; i < vm.suitsLen; i++) {
        for(var j=0; j<vm.cardsLen; j++) {
          vm.deck.push(vm.suits[i] + vm.cards[j]);
        }
      }
    }

    generateDeck();

    function shuffle() {
      var arr = vm.deck,
          randomIndex, itemAtIndex, i;

      for (i = 0; i < arr.length; i++) {
        randomIndex = Math.floor(Math.random() * arr.length);
        itemAtIndex = arr[randomIndex];
        arr[randomIndex] = arr[i];
        arr[i] = itemAtIndex;
      }
    }

    function deal(number) {
      number = number* 1;

      if(vm.deck.length < number){
        return;
      }

      vm.hands.unshift(vm.deck.splice(0, number));
    }

    function refresh(){
      vm.deck = [];
      vm.hands=[];
      generateDeck();
    }
  }
}());
