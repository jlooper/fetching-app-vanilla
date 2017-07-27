const observableModule = require("data/observable");

function MatchViewModel(petModel) {
    const viewModel = observableModule.fromObject({
        pet: petModel
    });

    return viewModel;
}

module.exports = MatchViewModel;