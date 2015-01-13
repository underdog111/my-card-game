function Deck( ranks, suits ) {
  var cards = [];
  var number_of_suits = suits.length;
  ranks.forEach( function (rank, rank_index) {
    suits.forEach( function (suit, suit_index) {
      var card_value = rank_index * number_of_suits + suit_index + 1;
      var card = new Card( rank, suit, card_value );
      cards.push( card );
    });
  });
  this.cards = cards;
}

Deck.prototype = new CardCollection();

Deck.prototype.dealOne = function (player) {
  var card = this.cards.shift();
  player.hand.insert( [card] );
};

Deck.prototype.dealOneToEach = function (players) {
  var deck = this;
  players.forEach( function (player) {
    deck.dealOne( player );
  });
};

Deck.prototype.dealAll = function (players) {
  var deck = this;
  var cards = this.cards;
  var cards_per_player = _.parseInt( cards.length / players.length );
  _.times( cards_per_player, function () {
    deck.dealOneToEach( players );
  });
};
