var Memory = function() {
  this.cards = [];
};
Memory.prototype.deal = function (pairs) {
  for(var i = 1; i <= pairs; i++){
    this.cards.push(i,i);
  }
  return shuffledCards = this.shuffle();
};
Memory.prototype.shuffle = function () {
  var cards = this.cards.concat();
  var shuffledCards = [];

  for (var i = 0; i < this.cards.length; i++) {
    var selectedCsrdIndex = Math.floor( Math.random() * cards.length );
    var selectedCsrd = cards[selectedCsrdIndex];
    shuffledCards.push(selectedCsrd);
    cards.splice(selectedCsrdIndex,1);
    // console.log("----------------------")
    // console.log(cards)
    // console.log(selectedCsrdIndex)
    // console.log(selectedCsrd)
    // console.log(shuffledCards)
  }
  return shuffledCards;
};
