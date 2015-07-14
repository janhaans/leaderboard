Playerslist = new Mongo.Collection("players");
if (Meteor.isClient) {
  Template.leaderboard.helpers({
    'player': function(){return Playerslist.find({}, {sort: {score:-1, name:1}}) },
    'selectedPlayer': function(){
      var playerId = this._id;
      var selectedPlayerId = Session.get('selectedPlayer');
      if (playerId === selectedPlayerId) {
        return "selected"
      }
    },
    'showselectedplayer': function() {
      var playerId = Session.get('selectedPlayer');
      return Playerslist.findOne(playerId);
    }
  });
  Template.leaderboard.events({
    'click .player': function() {
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
    },
    'click .increment': function(){
      playerId = Session.get('selectedPlayer');
      Playerslist.update(playerId,{$inc: {score:5}});
    },
    'click .decrement' : function() {
     new Promise(function(resolve, reject) {
       playerId = Session.get('selectedPlayer');
       Playerslist.update(playerId, {$inc: {score: -5}});
     });
    }
  });
}
