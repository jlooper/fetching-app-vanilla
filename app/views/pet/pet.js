var PetViewModel = require("../../shared/view-models/pet-view-model");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var page;
var pet = new PetViewModel();
const topmost = require("ui/frame").topmost;


exports.navigated = function(args) {
    page = args.object;
    pickPet();
};

exports.onRefresh = function(){
    pickPet();
}

exports.match = function(args) {
    topmost().navigate({
        moduleName: "views/match/match",
        context: pet,
        animated: true,
        transition: {
            name: "slide",
            duration: 200,
            curve: "ease"
        }
    });
};

function pickPet(){
    pet.empty()
    pet.load()
    .catch(function(error){
        return Promise.reject();
    }).then(function(){
        console.log(pet);
        page.bindingContext = {
            "name" : pet.name,
            "photo" : pet.photo,
            "breed" : pet.breed,
            "age" : pet.age,
            "sex" : pet.sex,
            "description" : pet.description,
        }
    });
}