//PRAJIT
var viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: new Cesium.CesiumTerrainProvider({
        url : 'https://assets.agi.com/stk-terrain/v1/tilesets/world/tiles'
    }),
    imageryProviderViewModels: Cesium.createDefaultImageryProviderViewModels(),
    imageryProviderViewModel: Cesium.createDefaultImageryProviderViewModels()[0],
    selectedImageryProviderViewModel: Cesium.createDefaultImageryProviderViewModels()[0],
    baseLayerPicker: true,
    timeline: false,
    animation: false
});


viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 10000.0)
});

viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    url : 'https://your-server.com/tileset.json'
}));

var droneModel = viewer.entities.add({
    name: 'Drone',
    position: Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 500.0),
    model: {
        uri: 'https://cesium.com/downloads/cesiumjs/releases/1.93/Apps/SampleData/models/CesiumDrone/CesiumDrone.glb',
        scale: 1.0
    }
});

var clippingPlanes = new Cesium.ClippingPlaneCollection({
    planes : [
        new Cesium.ClippingPlane(Cesium.Cartesian3.UNIT_X, 0.0),
        new Cesium.ClippingPlane(Cesium.Cartesian3.UNIT_Y, 0.0)
    ],
    unionClippingRegions : true
});
viewer.scene.globe.clippingPlanes = clippingPlanes;

var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction(function(movement) {
    var cartesian = viewer.camera.pickEllipsoid(movement.endPosition);
    if (cartesian) {
        var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        console.log('Longitude:', Cesium.Math.toDegrees(cartographic.longitude), 
                    'Latitude:', Cesium.Math.toDegrees(cartographic.latitude));
    }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
