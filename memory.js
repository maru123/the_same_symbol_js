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
    var selectedCsrdIndex = Math.floor( Math.random() * cards.length );
    var selectedCsrd = cards[selectedCsrdIndex];
    shuffledCards.push(selectedCsrd);
    cards.splice(selectedCsrdIndex,1);
    this.createSpanElement(selectedCsrd,i);
  }
};
Memory.prototype.createSpanElement = function(card,i){
  var spanElements = document.createElement("span");//子要素を作成する
  spanElements.id = "card"+i;
  spanElements.innerHTML = card;//子要素に値を与える
  document.getElementById("cards").appendChild(spanElements);//子要素(span)を親要素()に追加する
};
