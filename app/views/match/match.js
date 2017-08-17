const topmost = require("ui/frame").topmost;
var SwipeEvent = require('nativescript-swipe-card');

var MatchViewModel = require("../../shared/view-models/match-view-model");
var match = new MatchViewModel ();

exports.onNavigatingTo = function(args) {
    const page = args.object;
    page.bindingContext = new MatchViewModel(page.navigationContext);
    const binding = page.bindingContext;
    getMatches(binding.pet.zip);
   
    //let swipeCard = page.getViewById("swipe");
    // swipeCard.on("swipeEvent", (args:SwipeEvent) => {
    //     if (args.direction === 1) {
    //         console.log('Swiped to right');
    //     } else {
    //         console.log('Swiped to left');
    //     }
    // });
}

getMatches = function(zip) {
    match.getMatches(zip)
    var petCards = match.petCards;
    console.log(match.petCards)
}