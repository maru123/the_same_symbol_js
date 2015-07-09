// ---------------------------------
// Memory
// ---------------------------------
var Memory = function(pairsCount) {
  this.cards = [];
  this.failedCount = 0;
};
Memory.prototype.deal = function (pairsCount) {
  for(var i = 1; i <= pairsCount; i++){
    this.cards.push(i,i);
  }
  this.shuffle();
};
// ---------------------------------
// praivate
// ---------------------------------
Memory.prototype.shuffle = function () {
  var cards = this.cards.concat();
  var shuffledCards = [];
  console.log(this.cards.length)
  for (var i = 0; i < this.cards.length; i++) {
    var selectedCardIndex =Math.floor( Math.random() * cards.length );
    var selectedCard = cards[selectedCardIndex];
    shuffledCards.push(selectedCard);
    cards.splice(selectedCardIndex,1);
  }
  this.cards = shuffledCards;
};
// ---------------------------------
// Render
// ---------------------------------
var Render = function () {
  this.coicedCards = [];
};
Render.prototype.createSpanElement = function(cards){
  for(var i = 0;  i<cards.length; i++){
    var spanElements = document.createElement("span");
    spanElements.id = "card"+i;
    spanElements.classList.add("closedCard");
    spanElements.innerHTML = cards[i];
    document.getElementById("cards").appendChild(spanElements);
  }
};
Render.prototype.deleteSpanElement = function (cards) {
  for(var i = cards.childNodes.length-1; i>=0; i--){
    cards.removeChild(cards.childNodes[i]);
  }
}
Render.prototype.closeCards = function(cardId,anotherCardId){
  document.getElementById("failed-count").innerHTML = memory.failedCount;
  document.getElementById(cardId).className = "closedCard";
  document.getElementById(anotherCardId).className = "closedCard";
};

Render.prototype.checkCards = function(value,id){
  this.coicedCards.push(value,id);
  console.log(value,id)
  if(this.coicedCards.length === 6){
    if(this.coicedCards[0] !== this.coicedCards[2]){
      this.failedCount++;
      render.closeCards(this.coicedCards[1],this.coicedCards[3]);
    };
  this.coicedCards.splice(0,4);
  };
};
