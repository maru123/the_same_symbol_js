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
    return "first";
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
// SymbolElement
// ---------------------------------
var SymbolElement = function(parent,symbol,callback){
  this.parent = parent;
  this.symbol = symbol;
  this.callback = callback;
  this.status = "closed";
  this.add();
  this.addEvent();
};
SymbolElement.prototype.add = function(){
  this.element = document.createElement("span");
  this.element.id = this.symbol.id;
  this.element.innerHTML = this.symbol.value;
  this.close();
  this.parent.appendChild(this.element);
};
SymbolElement.prototype.remove = function(element){
  this.parent.removeChild(element);
};
SymbolElement.prototype.close = function(){
  this.status == "closed";
  return this.element.className = "closed";
};
SymbolElement.prototype.open = function(){
  this.status == "opened";
  return this.element.className = "opened";
};
SymbolElement.prototype.isClose = function(){
  return this.status == "closed";
};
SymbolElement.prototype.addEvent = function(){
  this.element.addEventListener('click',function(){
    this.callback(this.symbol.id);
  }.bind(this));
};
