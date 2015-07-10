var ChoiceTheSameSymbol = function(setCount) {
  this.symbols = [];
};
ChoiceTheSameSymbol.prototype.set = function (setCount) {
  for(var i = 1; i <= setCount; i++){this.symbols.push(i,i);}
  this.shuffle();
};
// praivate
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
ChoiceTheSameSymbol.prototype.isSameSymbol = function (choicedFirst,choicedSecond) {
  if(choicedFirst === choicedSecond)  return true;
};
ChoiceTheSameSymbol.prototype.reset = function () {
  this.symbols = [];
};
// ---------------------------------
// Render
// ---------------------------------
var Render = function () {};
Render.prototype.createSpanElement = function(symbols){
  for(var i = 0;  i<symbols.length; i++){
    var spanElements = document.createElement("span");
    spanElements.id = "symbol"+i;
    spanElements.classList.add("closedSymbol");
    spanElements.innerHTML = symbols[i];
    document.getElementById("symbols").appendChild(spanElements);
  }
};
Render.prototype.deleteSpanElement = function (symbols) {
  for(var i = symbols.childNodes.length-1; i>=0; i--){
    symbols.removeChild(symbols.childNodes[i]);
  }
}
Render.prototype.closeSymbols = function(Id){
  document.getElementById(Id).className = "closedSymbol";
};
// ---------------------------------
// Choice
// ---------------------------------
var Choice = function () {
  this.Symbols = [];
  this.failCounter = 0;
}
Choice.prototype.checkSymbols = function(value,id){
  this.Symbols.push({index:id,symbol:value});
  console.log(this.Symbols.length)
  if(this.Symbols.length >= 2){
    if(this.choiceTheSameSymbol.isSameSymbol(this.Symbols[0].symbol,this.Symbols[1].symbol)){
      this.Symbols.splice(0,2);
    } else {
      if(this.Symbols.length === 3) this.fail();
    };
  };
};
Choice.prototype.fail = function(){
  this.render.closeSymbols(this.Symbols[0].index);
  this.render.closeSymbols(this.Symbols[2].index);
  this.failCounter++;
  this.failedCount.innerHTML = this.failCounter;
  this.Symbols.splice(0,2);
};
Choice.prototype.reset = function () {
  this.Symbols = [];
  this.failCounter = 0;
}
