const topmost = require("ui/frame").topmost;

var MatchViewModel = require("../../shared/view-models/match-view-model");

exports.onNavigatingTo = function(args) {
    const page = args.object;
    page.bindingContext = new MatchViewModel(page.navigationContext);
};
