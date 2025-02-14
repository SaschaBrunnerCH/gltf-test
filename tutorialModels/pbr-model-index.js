// TODO: Since the let variable of the external file cannot be referenced from the ES6 module in Safari, I temporarily changed it back to var.
//let TutorialPbrModelIndex = {};
var TutorialPbrModelIndex = {};

TutorialPbrModelIndex.List = [
    {category:'tutorialModels', name:'Avocado', screenshot:'screenshot/screenshot.jpg', scale:30},
    {category:'tutorialModels', name:'BarramundiFish', screenshot:'screenshot/screenshot.jpg', scale:5},
    {category:'tutorialModels', name:'BoomBox', screenshot:'screenshot/screenshot.jpg', scale:100},
    {category:'tutorialModels', name:'Corset', screenshot:'screenshot/screenshot.jpg', scale:30},
    {category:'tutorialModels', name:'DamagedHelmet', screenshot:'screenshot/screenshot.png', scale:1},
    {category:'tutorialModels', name:'FlightHelmet', screenshot:'screenshot/screenshot.jpg', scale:3},
    {category:'tutorialModels', name:'Lantern', screenshot:'screenshot/screenshot.jpg', scale:0.06},
    {category:'tutorialModels', name:'WaterBottle', screenshot:'screenshot/screenshot.jpg', scale:10},
    {category:'tutorialModels', name:'Sponza', screenshot:'screenshot/screenshot.jpg', scale:1},
];

TutorialPbrModelIndex.getScreenshot = function(name) {
    const model = this.List.find(model => model.name === name);
    const defaultScreenshot = 'screenshot/screenshot.png';
    return model ? `${name}/${model.screenshot || defaultScreenshot}` : `${name}/${defaultScreenshot}`;
};

TutorialPbrModelIndex.getModelInfoCollection = function() {
    let numModels = TutorialPbrModelIndex.List.length;
    let modelInfoCollection = {};
    for (let i = 0; i < numModels; ++i) {
        let category = TutorialPbrModelIndex.List[i].category;
        let name = TutorialPbrModelIndex.List[i].name;
        let scale = TutorialPbrModelIndex.List[i].scale;
        modelInfoCollection[name] = {
            category: category,
            name: name,
            scale: scale
        };
    }
    return modelInfoCollection;
}

TutorialPbrModelIndex.getCurrentModel = function() {
    let modelInfoCollection = TutorialPbrModelIndex.getModelInfoCollection();
    let queryString = window.location.search.substring(1);
    let parts = queryString.replace(/\+/g, '%20').split('&');
    let options = {};
    for (let i = 0, len = parts.length; i < len; ++i) {
        let subparts = parts[i].split('=');

        let name = decodeURIComponent(subparts[0]);
        let value = subparts[1];
        if (value) {
            options[name] = decodeURIComponent(value);
        }
    }
    if (options.type === undefined) {
        options.type = 'glTF';
    }
    if (options.model && modelInfoCollection.hasOwnProperty(options.model)) {
        document.title += ' + ' + options.model + '.gltf';
        if (options.scale !== undefined) {
            modelInfoCollection[options.model].scale = options.scale;
        }
        if (options.type == 'glTF-Binary') {
            modelInfoCollection[options.model].path = modelInfoCollection[options.model].name + '/' + options.type + '/' + modelInfoCollection[options.model].name + '.glb';
        } else {
            modelInfoCollection[options.model].path = modelInfoCollection[options.model].name + '/' + options.type + '/' + modelInfoCollection[options.model].name + '.gltf';
        }
        return modelInfoCollection[options.model];
    }
    return undefined;
};