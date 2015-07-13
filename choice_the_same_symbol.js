var ChoiceTheSameSymbol = function() {};
ChoiceTheSameSymbol.prototype.reset = function (pairsCount) {
  this.isFirst = true;
  this.pair = [];
  this.failedCount = 0;
  this.symbols = [];
  for (var i = 1, j = 1; i <= pairsCount; i++, j++) {
    this.symbols.push(new Symbol(j, i));
    this.symbols.push(new Symbol((j+=1), i));
  }
  this.shuffle();
};
ChoiceTheSameSymbol.prototype.choice = function(id){
  var symbol = this.symbols.filter(function(sym){ return sym.id == id && sym.isAvailable })[0];
  // 選べないカードを指定した時
  if (symbol == undefined)  {this.showMessage("It's not available."); return false;};
  if (this.isFirst) {
    // 1回目
    this.pair.push(symbol);
    this.isFirst = false;
  } else {
    // 2回目
    this.pair.push(symbol);
    this.isFirst = true;
    return this.checkPair();
  }
};
ChoiceTheSameSymbol.prototype.checkPair = function(){
  if (this.isWin()) {
    this.win();
    this.clearPair();
    return true;
  } else {
    this.lose();
    this.clearPair();
    return false;
  }
};
ChoiceTheSameSymbol.prototype.isWin = function() {
  return this.pair[0].value == this.pair[1].value;
};
ChoiceTheSameSymbol.prototype.win = function(){
  this.discardPair();
  if (this.isSymbolsAvailable()) return this.showMessage('Conglatulation!!!!');
  return this.showMessage('Good Choice!!');
};
ChoiceTheSameSymbol.prototype.lose = function(){
  this.failedCount++;
  return this.showMessage('Bad!!');
};
ChoiceTheSameSymbol.prototype.isSymbolsAvailable = function(){
  return this.symbols.filter(function(sym){ return sym.isAvailable }).length == 0;
};
ChoiceTheSameSymbol.prototype.discardPair = function() {
  this.pair[0].discard();
  this.pair[1].discard();
  return true;
};
ChoiceTheSameSymbol.prototype.clearPair = function() {
  this.pair = [];
  return true;
};
ChoiceTheSameSymbol.prototype.showMessage = function(msg) {
  return console.log(msg);
};
// private
ChoiceTheSameSymbol.prototype.shuffle = function () {
  var symbols = this.symbols.concat();
  var shuffledsymbols = [];
  for (var i = 0; i < this.symbols.length; i++) {
    var selectedsymbolIndex =Math.floor( Math.random() * symbols.length );
    var selectedsymbol = symbols[selectedsymbolIndex];
    shuffledsymbols.push(selectedsymbol);
    symbols.splice(selectedsymbolIndex,1);
  }
  this.symbols = shuffledsymbols;
};

var Symbol = function(id, value){
  this.id = id;
  this.value = value;
  this.isAvailable = true;
};
Symbol.prototype.discard = function(){
  this.isAvailable = false;
};
// ---------------------------------
// SymbolElements
// ---------------------------------
var SymbolElements = function (stage) {
  this.stage = stage;
};
SymbolElements.prototype.add = function(symbols){
  for(var i = 0;  i < symbols.length; i++){
    var spanElements = document.createElement("span");
    spanElements.id = symbols[i].id;
    spanElements.classList.add("closed");
    spanElements.innerHTML = symbols[i].value;
    this.stage.appendChild(spanElements);
  }
};
SymbolElements.prototype.remove = function () {
  for(var i = this.stage.childNodes.length-1; i>=0; i--){
    this.stage.removeChild(this.stage.childNodes[i]);
  }
}
SymbolElements.prototype.close = function(Id){
  document.getElementById(Id).className = "closed";
};
