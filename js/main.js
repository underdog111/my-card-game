var ranks = [
  { name: 'ace',   symbol:  'A' },
  { name: 'two',   symbol:  '2' },
  { name: 'three', symbol:  '3' },
  { name: 'four',  symbol:  '4' },
  { name: 'five',  symbol:  '5' },
  { name: 'six',   symbol:  '6' },
  { name: 'seven', symbol:  '7' },
  { name: 'eight', symbol:  '8' },
  { name: 'nine',  symbol:  '9' },
  { name: 'ten',   symbol: '10' },
  { name: 'jack',  symbol:  'J' },
  { name: 'queen', symbol:  'Q' },
  { name: 'king',  symbol:  'K' }
];

var suits = [
  { name: 'clubs',    char_code: '\u2663', color: 'black' },
  { name: 'spades',   char_code: '\u2660', color: 'black' },
  { name: 'diamonds', char_code: '\u2666', color: 'red'   },
  { name: 'hearts',   char_code: '\u2665', color: 'red'   }
];

function createNumberedPlayer( index ) {
  var player_number = index + 1;
  var player_name = 'Player ' + player_number;
  return new Player( player_name );
}

function playRound( players, round_number ) {
  console.log( "\nPlaying round " + round_number );

  players.forEach( function (player) {
    player.playCard();
    var log_of_play = [
      player.name,
      player.played_card.show()
    ].join(' played: ');
    console.log( log_of_play );
  });

  var round_winner = _.max( players, function (player) {
    return player.played_card.value;
  });
  var log_of_win = [
    round_winner.name,
    round_winner.played_card.show()
  ].join(' won round with: ');
  console.log( log_of_win );

  var played_cards = players.map( function (player) {
    return player.played_card;
  });
  round_winner.winnings.insert( played_cards );
  players.forEach( function (player) {
    delete player.played_card;
  });
}

$( document ).ready( function () {
  var deck = new Deck( ranks, suits );
  var players = _.times( 4, createNumberedPlayer );
  deck.shuffle();
  deck.dealAll( players );
  players.forEach( function (player) {
    var show_of_hand = [ player.name, player.hand.show() ].join(' has ');
    console.log( show_of_hand );
  });
  var number_of_cards = _.first( players ).hand.count();
  _.times( number_of_cards, function (number) {
    playRound( players, number + 1 );
  });
  var game_winner = _.max( players, function (player) {
    return player.winnings.count();
  });
  var log_of_win = [
    game_winner.name,
    game_winner.winnings.show()
  ].join(' won game with: ');
  console.log( '\n' + log_of_win );

});
