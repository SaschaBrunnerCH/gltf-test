// TODO: Since the let variable of the external file cannot be referenced from the ES6 module in Safari, I temporarily changed it back to var.
//let TutorialModelIndex = {};
var TutorialModelIndex = {};

TutorialModelIndex.List = [
    {category:'tutorialModels', name:'TriangleWithoutIndices', screenshot:'screenshot/screenshot.png', scale:1},
    {category:'tutorialModels', name:'Triangle', screenshot:'screenshot/screenshot.png', scale:1},
    {category:'tutorialModels', name:'AnimatedTriangle', screenshot:'screenshot/screenshot.gif', scale:1},
    {category:'tutorialModels', name:'AnimatedMorphCube', screenshot:'screenshot/screenshot.gif', scale:1},
    {category:'tutorialModels', name:'AnimatedMorphSphere', screenshot:'screenshot/screenshot.gif', scale:1},
    {category:'tutorialModels', name:'SimpleMaterial', screenshot:'screenshot/screenshot.png', scale:1},
    {category:'tutorialModels', name:'SimpleMeshes', screenshot:'screenshot/screenshot.png', scale:1},
    {category:'tutorialModels', name:'SimpleTexture', screenshot:'screenshot/screenshot.png', scale:1},
    {category:'tutorialModels', name:'SimpleInstancing', screenshot:'screenshot/screenshot.png', scale:0.1},
    {category:'tutorialModels', name:'MeshPrimitiveModes', screenshot:'screenshot/screenshot.png', scale:0.5},
    {category:'tutorialModels', name:'MultipleScenes', screenshot:'screenshot/screenshot.png', scale:1},
    {category:'tutorialModels', name:'SimpleMorph', screenshot:'screenshot/screenshot.png', scale:1},
    {category:'tutorialModels', name:'SimpleSparseAccessor', screenshot:'screenshot/screenshot.png', scale:1},
    {category:'tutorialModels', name:'SimpleSkin', screenshot:'screenshot/screenshot.gif', scale:1},
    {category:'tutorialModels', name:'Cameras', screenshot:'screenshot/screenshot.png', scale:1},
    {category:'tutorialModels', name:'InterpolationTest', screenshot:'screenshot/screenshot.gif', scale:0.2, allAnimations:true},  // Play all model animations at the same time
    {category:'tutorialModels', name:'Unicode❤♻Test', screenshot:'screenshot/screenshot.png', scale:1},
];


TutorialModelIndex.getScreenshot = function(name) {
    const model = this.List.find(model => model.name === name);
    const defaultScreenshot = 'screenshot/screenshot.png';
    return model ? `${name}/${model.screenshot || defaultScreenshot}` : `${name}/${defaultScreenshot}`;
};

TutorialModelIndex.getEmbeddedFolderName = function(name) {
    let suffixHash = {
        'AnimatedMorphCube': '-Binary',
        'AnimatedMorphSphere': '-Binary',
        'SimpleMaterial': '-Embedded-buffer',
        'AdvancedMaterial': '-Embedded-buffer',
        'SimpleOpacity': '-Embedded-buffer',
        'SimpleTexture': '-Embedded-buffer',
        //'SimpleSkin': '-Embedded-buffers'
        'SimpleInstancing': '-Binary',
        'InterpolationTest':  '-Binary',
        'Unicode❤♻Test': '-Binary',
    };
    let suffix = suffixHash[name] === undefined ? '-Embedded' : suffixHash[name];
    return 'glTF' + suffix;
};

TutorialModelIndex.getModelInfoCollection = function() {
    let numModels = TutorialModelIndex.List.length;
    let modelInfoCollection = {};
    for (let i = 0; i < numModels; ++i) {
        let category = TutorialModelIndex.List[i].category;
        let name = TutorialModelIndex.List[i].name;
        let scale = TutorialModelIndex.List[i].scale;
        let allAnimations = TutorialModelIndex.List[i].allAnimations;
        modelInfoCollection[name] = {
            category: category,
            name: name,
            scale: scale,
            allAnimations: allAnimations
        };
    }
    return modelInfoCollection;
};

TutorialModelIndex.getCurrentModel = function() {
    let modelInfoCollection = TutorialModelIndex.getModelInfoCollection();
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
