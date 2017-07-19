var config = require("../../shared/config");
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;

function PetListViewModel(items) {
    var viewModel = new ObservableArray(items);

    viewModel.load = function() {
        return fetch(config.apiUrl + 'breed.list?&key='+ config.apiKey + '&animal=dog' + '&format=json')
        .then(handleErrors)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            data.petfinder.breeds.breed.forEach(function(data) {
                console.log(JSON.stringify(data))
                viewModel.push({
                    name: data.$t
                });
            });
        });
    };

    viewModel.empty = function() {
        while (viewModel.length) {
            viewModel.pop();
        }
    };

    return viewModel;
}

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

module.exports = PetListViewModel;