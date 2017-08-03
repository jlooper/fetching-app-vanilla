const observableModule = require("data/observable");
const GridLayout = require("tns-core-modules/ui/layouts/grid-layout");
const ItemSpec = require("tns-core-modules/ui/layouts/grid-layout");
const Layout = require("tns-core-modules/ui/layouts/layout");
var config = require("../../shared/config");



function MatchViewModel(petModel) {
    const viewModel = observableModule.fromObject({
        
        pet: petModel,

        

        getMatches : function(zip) {

            return fetch(config.apiUrl + 'pet.find?&key='+ config.apiKey + '&location=' + zip + '&animal=dog' + '&output=basic' + '&format=json')
            .then(handleErrors)
            .then(function(response) {
                return response.json();
            }).then(function(data) {
                console.log(JSON.stringify(data));
            viewModel.name = data.petfinder.pet.name.$t;
            viewModel.size = data.petfinder.pet.size.$t;
            viewModel.age = data.petfinder.pet.age.$t;
            viewModel.sex = data.petfinder.pet.sex.$t;
            viewModel.zip = data.petfinder.pet.contact.zip.$t;
            viewModel.photo = data.petfinder.pet.media.photos.photo[3].$t;
            if (Array.isArray(data.petfinder.pet.breeds.breed)) {
                viewModel.breed = "";
                var arrayLength = data.petfinder.pet.breeds.breed.length;
                for (var i = 0; i < arrayLength; i++) {
                         viewModel.breed += data.petfinder.pet.breeds.breed[i].$t
                         if (i < arrayLength-1) {
                             viewModel.breed += ', '
                         }
                    }
            }
            else {
                viewModel.breed = "Unknown";
            }
            if(data.petfinder.pet.description.$t){
                var shortDesc = data.petfinder.pet.description.$t.substring(0,100);
                viewModel.description = shortDesc + '...';
            }
            else {
                viewModel.description = "Just a playful pupper, looking for fun!"
            }
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