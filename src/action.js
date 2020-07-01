const glob = require("glob");
const core = require('@actions/core');
const github = require('@actions/github');
const { isJsonTiledMap, processTileset } = require('./tiledOptimizer');

try {
    let mapFiles = [];
    const mapFile = core.getInput('map-file');
    if (mapFile) {
        mapFiles.push(mapFile);
    } else {
        // Let's scan the system for maps.
        mapFiles = glob.sync('**/*.json');
        mapFiles = mapFiles.filter(isJsonTiledMap);
    }

    for (let mapFile in mapFiles) {
        processTileset(mapFile);
    }
} catch (error) {
    console.error(error);
    core.setFailed(error.message);
}
