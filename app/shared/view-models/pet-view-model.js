var config = require("../../shared/config");
var fetchModule = require("fetch");
var Observable = require("data/observable").Observable;
function PetViewModel() {
    /*
    var viewModel = new ObservableArray(items);

    viewModel.load = function() {
        return fetch(config.apiUrl + 'pet.getRandom?&key='+ config.apiKey + '&animal=dog' + '&output=full' + '&format=json')
        .then(handleErrors)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(JSON.stringify(data));
            viewModel.push({
                name: data.petfinder.pet.name.$t,
                size: data.petfinder.pet.size.$t, 
                age: data.petfinder.pet.age.$t,
                sex: data.petfinder.pet.sex.$t,
                photo: data.petfinder.pet.media.photos.photo[3].$t,
                breed: data.petfinder.pet.breeds.breed.$t,
            });
        });
    };

    viewModel.empty = function() {
        while (viewModel.length) {
            viewModel.pop();
        }
    };
*/
    viewModel = new Observable();

    viewModel.load = function() {
        return fetch(config.apiUrl + 'pet.getRandom?&key='+ config.apiKey + '&animal=dog' + '&output=full' + '&format=json')
        .then(handleErrors)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(JSON.stringify(data));
            viewModel.name = data.petfinder.pet.name.$t;
            viewModel.size = data.petfinder.pet.size.$t;
            viewModel.age = data.petfinder.pet.age.$t;
            viewModel.sex = data.petfinder.pet.sex.$t;
            viewModel.photo = data.petfinder.pet.media.photos.photo[3].$t;
            viewModel.breed = data.petfinder.pet.breeds.breed.$t;
        });
    };

    viewModel.empty = function(){
        viewModel.name = "";
        viewModel.size = "";
        viewModel.age = "";
        viewModel.sex = "";
        viewModel.photo = "";
        viewModel.breed = "";
    }
    return viewModel;
}

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

module.exports = PetViewModel;