const FS_LAYERS = [
    'app',
    'processes',
    'pages',
    'widgets',
    'features',
    'entities',
    'shared',
];

const getLowerLayers = (layer) => FS_LAYERS.slice(FS_LAYERS.indexOf(layer) + 1);

const getLayersRules = () =>
    FS_LAYERS.map((layer) => ({
        from: layer,
        allow: getLowerLayers(layer),
    }));

const getLayersBoundariesElements = () =>
    FS_LAYERS.map((layer) => ({
        type: layer,
        pattern: `${layer}/*`,
        mode: 'folder',
        capture: ['slices'],
    }));

module.exports = { getLayersBoundariesElements, getLayersRules };
