function Card( rank, suit, value ) {
  this.rank  = rank;
  this.suit  = suit;
  this.value = value;
}

Card.prototype.show = function () {
  return [ this.rank.symbol, this.suit.char_code ].join(' of ');
};
