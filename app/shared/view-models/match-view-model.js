const observableModule = require("data/observable");
const GridLayout = require("tns-core-modules/ui/layouts/grid-layout");
const ItemSpec = require("tns-core-modules/ui/layouts/grid-layout");
const Layout = require("tns-core-modules/ui/layouts/layout");
var matches = new MatchViewModel();

function MatchViewModel(petModel) {
    const viewModel = observableModule.fromObject({
        pet: petModel
    });

    return viewModel;
}

module.exports = MatchViewModel;