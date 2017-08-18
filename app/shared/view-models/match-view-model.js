const observableModule = require("data/observable");
var StackLayout = require("ui/layouts/stack-layout").StackLayout;
var Label = require("tns-core-modules/ui/label").Label;
var config = require("../../shared/config");
var ImageModule = require("tns-core-modules/ui/image");
var Layout = require("tns-core-modules/ui/layouts/layout");

function MatchViewModel(petModel) {
    const viewModel = observableModule.fromObject({
        
        pet: petModel,
        
        petCards: Array<Layout>=[],
        
        getMatches : function(zip) {

            console.log("getting matches")
            
            var cards = [];
            
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
                    image.src=data.petfinder.pets.pet[i].media.photos.photo[1].$t;
                    console.log(image.src)
                    image.height=100;
                    image.width=100;
                    stack.verticalAlignment = "middle";
                    stack.addChild(image);
                    cards.push(stack);
                    
                }
                //viewModel.petCards = cards; 
                //petCards: Array<Layout>=cards
                viewModel.set('petCards',cards)
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