function Player( name ) {
  this.name = name;
  this.hand     = new CardCollection();
  this.winnings = new CardCollection();
}

Player.prototype.playCard = function () {
  this.played_card = this.hand.pull();
};
