const topmost = require("ui/frame").topmost;
var SwipeEvent = require("nativescript-swipe-card");
var MatchViewModel = require("../../shared/view-models/match-view-model");


exports.onNavigatingTo = function(args) {
  const page = args.object;
  page.bindingContext = new MatchViewModel(page.navigationContext);
  const binding = page.bindingContext;
  binding.getMatches(binding.pet.zip).then(
    function() {},
    function(err) {
      console.log("getMatches error", err);
    }
  );
};
