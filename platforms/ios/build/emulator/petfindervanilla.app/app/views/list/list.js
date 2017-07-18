var PetListViewModel = require("../../shared/view-models/pet-list-view-model");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var page;

var petList = new PetListViewModel([]);
var pageData = new observableModule.fromObject({
    petList: petList
});

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;

    petList.empty();
    petList.load();
};