if (Array.indexOf === undefined) {
  Array.prototype.indexOf = function(v) {
    for (var i = 0; i < this.length; ++i) {
      if (this[i] === v) {
      return i;
      }
    }
    return - 1;
  };
}

(function (window, document, undefined) {
  var playingCards = window.playingCards = function (conf) {
    var c = objExtend(playingCards.defaults, conf);
    if (! (this instanceof playingCards)) {
      c.el = $(this);
      return new playingCards(c);
    }
    this.conf = c;
    this.init();
    if (this.conf.startShuffled) {
      this.shuffle(5);
    }
    return this;
  };

  playingCards.prototype.init = function() {
    this.cards = [];
    var o = this.conf, l, i, s, r, j;
    for (i = 0; i < o.decks; i++) {
      for (s in o.suits) {
        for (r in o.ranks) {
          l = this.cards.length;
          this.cards[l] = new playingCards.card(r, o.ranks[r], s, o.suits[s]);
        }
      }
      for (j = 0; j < o.jokers; j++) {
        l = this.cards.length;
        this.cards[l] = new playingCards.card("N", o.jokerText, (j % 2) + 1, '');
      }
    }
  };

  playingCards.prototype.draw = function() {
    return this.cards.length > 0 ? this.cards.pop() : null;
  };

  playingCards.prototype.addCard = function(card) {
    this.cards.push(card);
  };

  playingCards.prototype.count = function() {
    return this.cards.length;
  };

  playingCards.prototype.shuffle = function(n) {
    if (!n) {
      n = 5;
    }
    var l = this.cards.length, r, tmp, i, j;

    for (i = 0; i < n; i++) {
      for (j = 0; j < l; j++) {
        r = Math.floor(Math.random() * l);
        tmp = this.cards[j];
        this.cards[j] = this.cards[r];
        this.cards[r] = tmp;
      }
    }
  };

  playingCards.prototype.orderByRank = function() {
    this.cards.sort(compareRank);
  };

  playingCards.prototype.orderBySuit = function() {
    this.init();
  };

  playingCards.prototype.spread = function(dest) {
    if (!this.conf.el && !dest) {
      return false;
    }
    var to = this.conf.el || dest, l = this.cards.length, i;
    to.html('');
    for (i = 0; i < l; i++) {
      to.append(this.cards[i].getHTML());
    }
  };

  playingCards.defaults = {
    "decks": 1,
    "renderMode": 'css',
    "ofString": " of ",
    "startShuffled": true,
    "jokers": 2,
    "jokerText": "Joker",
    "ranks": {
      "2": "Two",
      "3": "Three",
      "4": "Four",
      "5": "Five",
      "6": "Six",
      "7": "Seven",
      "8": "Eight",
      "9": "Nine",
      "10": "Ten",
      "J": "Jack",
      "Q": "Queen",
      "K": "King",
      "A": "Ace"
    },
    "suits": {
      "S": "Spades",
      "D": "Diamonds",
      "C": "Clubs",
      "H": "Hearts"
    }
  };

  playingCards.card = function(rank, rankString, suit, suitString, conf) {
    if (! (this instanceof playingCards.card)) {
      return new playingCards.card(rank, rankString, suit, suitString, conf);
    }

    this.conf = objExtend(playingCards.card.defaults, conf);

    if (suit === undefined) {
      suit = rankString;
      rankString = playingCards.defaults.ranks[rank];
      suitString = playingCards.defaults.suits[suit];
    }

    this.rank = rank;
    this.rankString = rankString;
    this.suit = suit;
    this.suitString = suitString;
    return this;
  };

  playingCards.card.defaults = {
    "singleFace": false
  };

  playingCards.card.prototype.toString = function() {
    return this.suitString !== "" ? this.rankString + playingCards.defaults.ofString + this.suitString: this.rankString;
  };

  function objExtend(o, ex) {
    if (!ex) {
      return o;
    }
    for (var p in ex) {
      o[p] = ex[p];
    }
    return o;
  }

  function compareRank(a, b) {
    var intRegex = /^\d+$/;

    if (a.rank == b.rank)       return 0;
    if (a.rank == "N")        return 1;
    if (b.rank == "N")        return -1;
    if (a.rank == "A")        return 1;
    if (b.rank == "A")        return -1;
    if (!isNaN(a.rank - b.rank))    return a.rank - b.rank;
    if (a.rank == "K" && b.rank == "J")   return 1;
    if (a.rank == "J" && b.rank == "K")   return -1;
    if (a.rank == "K" && b.rank == "Q")   return 1;
    if (a.rank == "Q" && b.rank == "K")   return -1;
    if (a.rank == "Q" && b.rank == "J")   return 1;
    if (a.rank == "J" && b.rank == "Q")   return -1;
    if (a.rank == "K" && intRegex.test(b.rank)) return 1;
    if (a.rank == "Q" && intRegex.test(b.rank)) return 1;
    if (a.rank == "J" && intRegex.test(b.rank)) return 1;
    if (intRegex.test(a.rank) && b.rank == "K") return -1;
    if (intRegex.test(a.rank) && b.rank == "Q") return -1;
    if (intRegex.test(a.rank) && b.rank == "J") return -1;
  }

})

(this,this.document);
