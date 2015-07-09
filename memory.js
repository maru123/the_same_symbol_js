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
Memory.prototype.isPairs = function (card,anotherCard) {
  if(card === anotherCard){
    return true;
  } else {
    this.failedCount++;
    return false;
  };
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
};
// ---------------------------------
// Render
// ---------------------------------
var Render = function () {
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
