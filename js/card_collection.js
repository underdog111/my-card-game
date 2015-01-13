function CardCollection() {
  this.cards = [];
}

CardCollection.prototype.count = function () {
  return this.cards.length;
};

CardCollection.prototype.show = function () {
  return this.cards.map( function (card) {
    return card.show();
  }).join(', ');
};

CardCollection.prototype.insert = function (cards) {
  this.cards = this.cards.concat( cards );
};

CardCollection.prototype.shuffle = function () {
  this.cards = _.shuffle( this.cards );
};

CardCollection.prototype.pull = function () {
  return this.cards.shift();
};
