const observableModule = require("data/observable");
var StackLayout = require("ui/layouts/stack-layout").StackLayout;
var Label = require("tns-core-modules/ui/label").Label;
var config = require("../../shared/config");



function MatchViewModel(petModel) {
    const viewModel = observableModule.fromObject({
        
        pet: petModel,
        
        
        getMatches : function(zip) {

            console.log("getting matches")
            
            var petCards = [];

            //hard-coding isn't happy either
            /*var stack1 = new StackLayout();
            var label1 = new Label();
            label1.text="one";
            stack1.verticalAlignment = "middle";
            stack1.addChild(label1);

            var stack2 = new StackLayout();
            var label2 = new Label();
            label2.text="two";
            stack2.verticalAlignment = "middle";
            stack2.addChild(label2);

            petCards = [stack1,stack2];
            viewModel.petCards = petCards; */
            
            return fetch(config.apiUrl + 'pet.find?&key='+ config.apiKey + '&location=' + zip + '&animal=dog&output=basic&count=10&format=json')
                .then(handleErrors)
                .then(function(response) {
                    return response.json();
                }).then(function(data) {
                console.log(JSON.stringify(data))
                
                //build card - this needs to loop
                var stack = new StackLayout();
                var image = new Image();
                image.src=data.petfinder.pet.media.photos.photo[3].$t;
                image.height=100;
                image.width=100;
                stack.verticalAlignment = "middle";
                stack.addChild(image);
                petCards = [stack];
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