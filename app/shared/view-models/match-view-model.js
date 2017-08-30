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
                //build card - this needs to loop through data.petfinder.pets
                var arrayLength = data.petfinder.pets.pet.length;
                console.log(arrayLength)
                for (var i = 0; i < arrayLength; i++) {
                    var stack = new StackLayout();
                    var image = new ImageModule.Image();
                    var nameLabel = new Label();
                    var descriptionLabel = new Label();
                    image.src=data.petfinder.pets.pet[i].media.photos.photo[2].$t;
                    nameLabel.text = data.petfinder.pets.pet[i].name.$t;
                    nameLabel.class = "quicksandBoldLarge";
                    nameLabel.horizontalAlignment="center";
                    descriptionLabel.text = data.petfinder.pets.pet[i].description.$t;
                    descriptionLabel.textWrap = true;
                    descriptionLabel.class="quicksand";
                    descriptionLabel.alignment="top";
                    descriptionLabel.horizontalAlignment="center";
                    image.width = 300;
                    stack.addChild(nameLabel);
                    stack.addChild(image);
                    //stack.addChild(descriptionLabel);
                    
                    cards.push(stack);
                    
                }
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