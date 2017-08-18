const observableModule = require("data/observable");
var StackLayout = require("ui/layouts/stack-layout").StackLayout;
var Label = require("tns-core-modules/ui/label").Label;
var config = require("../../shared/config");
var ImageModule = require("tns-core-modules/ui/image");


function MatchViewModel(petModel) {
    const viewModel = observableModule.fromObject({
        
        pet: petModel,
        
        
        getMatches : function(zip) {

            console.log("getting matches")
            
            var petCards = [];
            
            return fetch(config.apiUrl + 'pet.find?&key='+ config.apiKey + '&location=' + zip + '&animal=dog&output=basic&count=10&format=json')
                .then(handleErrors)
                .then(function(response) {
                    return response.json();
                }).then(function(data) {
                //console.log(JSON.stringify(data.petfinder.pets))
                //build card - this needs to loop through data.petfinder.pets
                var arrayLength = data.petfinder.pets.pet.length;
                console.log(arrayLength)
                for (var i = 0; i < arrayLength; i++) {
                    var stack = new StackLayout();
                    var image = new ImageModule.Image();
                    image.src=data.petfinder.pets.pet[i].media.photos.photo[3].$t;
                    console.log(image.src)
                    image.height=100;
                    image.width=100;
                    stack.verticalAlignment = "middle";
                    stack.addChild(image);
                    petCards.push(stack);
                }
                viewModel.petCards = petCards;            
            });
            
        }
    });
   
    
    return viewModel;
}

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

module.exports = MatchViewModel;