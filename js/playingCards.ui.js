(function($, window, document, undefined) {

  if ($.fn) {
     $.fn.playingCards = playingCards;
  }

  playingCards.prototype.spread = function(dest) {
    if (!this.conf.el && !dest) {
      return false;
    }
    var to = this.conf.el || dest,
      l = this.cards.length,
      i;
    to.html('');

    for (i = 0; i < l; i++) {
      to.append(this.cards[i].getHTML());
    }
  };

  playingCards.card.prototype.getHTML = function() {
    if (this.html) {
      return this.html;
    }
    this.suitCode = "&nbsp;";
    this.colorCls = '';
    switch (this.suit) {
    case "S":
      this.suitCode = "&spades;";
      break;
    case "D":
      this.colorCls = "red";
      this.suitCode = "&diams;";
      break;
    case "C":
      this.suitCode = "&clubs;";
      break;
    case "H":
      this.colorCls = "red";
      this.suitCode = "&hearts;";
      break;
    }

    var txt = this.rank;
    if (this.rank === "N") {
      txt = this.rankString.split('').join('<br />');
    }
    var strBuild = ['<div class="playingCard"><div class="front ', this.colorCls, '"><div class="corner">', txt, '<br />', this.suitCode, '</div>'];
    strBuild = strBuild.concat(this.buildIconHTML());
    strBuild = strBuild.concat('<div class="corner cornerBR flip">', txt, '<br />', this.suitCode, '</div></div></div>');
    this.html = strBuild.join('');
    return this.html;
  };

  playingCards.card.prototype.buildIconHTML = function() {

    if (this.rank === "A") {
      return ['<div class="suit suit0">', this.suitCode, '</div>'];
    }
    if (this.rank === "J" || this.rank === "Q" || this.rank === "K" || this.rank === "N") {
      var n = 'D';
      var imgPrefix = this.conf.imgPrefix || '';
      if (!this.conf.singleFace) {
        n = this.suit;
      }
      return [
      '<div class="suit A1">', this.suitCode, '</div>',
      '<img class="suit ', this.rank, ' face" src="', imgPrefix, 'img/', this.rank, n, '.gif"/>',
      '<div class="suit C5 flip">', this.suitCode, '</div>'
      ];
    }
    var ret = [],
      list = ['4', '5', '6', '7', '8', '9', '10'];

    if (list.indexOf(this.rank) !== -1) {
      ret = ret.concat([
      '<div class="suit A1">', this.suitCode, '</div>',
      '<div class="suit A5 flip">', this.suitCode, '</div>',
      '<div class="suit C1">', this.suitCode, '</div>',
      '<div class="suit C5 flip">', this.suitCode, '</div>'
      ]);
    }
    list = ['2', '3'];
    if (list.indexOf(this.rank) !== -1) {
      ret = ret.concat([
      '<div class="suit B1">', this.suitCode, '</div>',
      '<div class="suit B5 flip">', this.suitCode, '</div>'
      ]);
    }
    list = ['3', '5', '9'];
    if (list.indexOf(this.rank) !== -1) {
      ret = ret.concat([
      '<div class="suit B3">', this.suitCode, '</div>'
      ]);
    }
    list = ['6', '7', '8'];
    if (list.indexOf(this.rank) !== -1) {
      ret = ret.concat([
      '<div class="suit A3">', this.suitCode, '</div>',
      '<div class="suit C3">', this.suitCode, '</div>'
      ]);
    }
    list = ['7', '8', '10'];
    if (list.indexOf(this.rank) !== -1) {
      ret = ret.concat([
      '<div class="suit B2">', this.suitCode, '</div>'
      ]);
    }
    list = ['8', '10'];
    if (list.indexOf(this.rank) !== -1) {
      ret = ret.concat([
      '<div class="suit B4 flip">', this.suitCode, '</div>'
      ]);
    }
    list = ['9', '10'];
    if (list.indexOf(this.rank) !== -1) {
      ret = ret.concat([
      '<div class="suit A2">', this.suitCode, '</div>',
      '<div class="suit A4 flip">', this.suitCode, '</div>',
      '<div class="suit C2">', this.suitCode, '</div>',
      '<div class="suit C4 flip">', this.suitCode, '</div>'
      ]);
    }
    return ret;
  };

})

(typeof(jQuery) !== 'undefined' ? jQuery: function(){}, this, this.document);
