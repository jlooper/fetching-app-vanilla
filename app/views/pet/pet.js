var PetViewModel = require("../../shared/view-models/pet-view-model");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var page;

var pet = new PetViewModel();


exports.loaded = function(args) {
    page = args.object;
    pet.load()
    .catch(function(error){
        console.log(error);
        return Promise.reject();
    }).then(function(){
        page.bindingContext = pet;
    });

};