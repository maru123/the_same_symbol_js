var ChoiceTheSameSymbol = function() {};
ChoiceTheSameSymbol.prototype.reset = function (setCount) {
  this.symbols = [];
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

// ---------------------------------
// SymbolElement
// ---------------------------------
var SymbolElement = function (stage) {
  this.stage = stage;
};
SymbolElement.prototype.add = function(symbols){
  for(var i = 0;  i < symbols.length; i++){
    var spanElements = document.createElement("span");
    spanElements.id = "symbol"+i;
    spanElements.classList.add("closed");
    spanElements.innerHTML = symbols[i];
    this.stage.appendChild(spanElements);
  }
};
SymbolElement.prototype.remove = function () {
  for(var i = this.stage.childNodes.length-1; i>=0; i--){
    this.stage.removeChild(this.stage.childNodes[i]);
  }
}
SymbolElement.prototype.close = function(Id){
  document.getElementById(Id).className = "closed";
};
