// map two upd

mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpeWF1dGUiLCJhIjoiY2p5ZXp1b3ZyMDBpMTNjcjdnZ3dnbzJpYyJ9.UiTAUN2b8ASlVnMr_nmn3Q';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/aliyaute/ckhp5zhh72hvs19p9di978qoj',
    zoom: 6.40,
    center: [-105.99, 34.41],
    maxZoom:15,
    minZoom:6,
    fitBounds: [[-109.048428, 31.332406], [-103.000468, 37.000482]]

});

// Zoom Button
map.addControl(new mapboxgl.NavigationControl());


map.on('load', function () {
    // This is the function that prints the layers' IDs to the console
    var layers = map.getStyle().layers;
    for (var i = 0; i < layers.length; i++) {
        console.log(layers[i].id);
    }    


//  add map
    map.addLayer({
        'id': 'Positivity Rate',
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': 'data/correct.geojson'
        },
        'layout': {
            // make layer visible by default
            'visibility': 'visible',
            },
            'paint': {
                'fill-color': [
                    'case', 
                    ['==',['get', 'percent_category'], 1], '#67000d',
                    ['==',['get', 'percent_category'], 2], '#a50f15',
                    ['==',['get', 'percent_category'], 3], '#cb181d',
                    ['==',['get', 'percent_category'], 4], '#fb6a4a', 
                    ['==',['get', 'percent_category'], 5], '#fc9272', 
                    ['==',['get', 'percent_category'], 6], '#fcbba1', 
                    ['==',['get', 'percent_category'], 7], '#fee0d2', 


                    '#d3d3d3',
                ],
                // "fill-outline-color": "#ffffff"
        }
    }, 'landuse'); // Here's where we tell Mapbox where to slot this new layer
 
    map.addLayer({
        'id': 'states-layer-outline',
        'type': 'line',
        'layout': {
            'visibility': 'visible'
        },
        'source': {
          'type': 'geojson',
          'data': 'data/correct.geojson'
        },
        'paint': {
          'line-color': '#737373',
          'line-width': 0.6
        }
    }, 'landuse'); // Here's where we tell Mapbox where to slot this new layer
    
});

// Create the popup for 2nd layer
map.on('click', 'Positivity Rate', function (e) {
    var County = e.features[0].properties.County;
    var NAMELSAD = e.features[0].properties.NAMELSAD;
    // var Area = e.features[0].properties.Area;
    var Number_of_Cases = e.features[0].properties.Number_of_Cases;
    var percent_correct = e.features[0].properties.percent_correct;
    var Percentage_in_Poverty = e.features[0].properties.Percentage_in_Poverty;
    var Population_Size = e.features[0].properties.Population_Size;
    var Percent_White = e.features[0].properties.Percent_White;
    var Percent_Black = e.features[0].properties.Percent_Black;
    var Percent_AIAN = e.features[0].properties.Percent_AIAN;
    var Percent_Hispanic = e.features[0].properties.Percent_Hispanic;
    var Percent_Asian = e.features[0].properties.Percent_Asian;
    var Other_Percent = e.features[0].properties.Other_Percent;
    percent_correct = (percent_correct* 100).toFixed(0);
    if (percent_correct < 1) {
        percent_correct = "< 1";
      }
    if (Percent_Asian < 1) {
        Percent_Asian = "< 1";
      }
    if (Percent_AIAN < 1) {
        Percent_AIAN = "< 1";
      } 
    if (Percent_Hispanic < 1) {
        Percent_Hispanic = "< 1";
      }  
    if (Percent_Black < 1) {
        Percent_Black = "< 1";
      }    
    if (Other_Percent < 1) {
        Other_Percent = "< 1";
      }
    Percentage_in_Poverty = (Percentage_in_Poverty* 100).toFixed(0);
    Number_of_Cases = Number_of_Cases.toLocaleString();
    County = County.toUpperCase().bold();
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>' + County + ' COUNTY </h4>'
            + '<p>' + NAMELSAD + '</p>'
            + '<p>' + Percentage_in_Poverty  + '% live in poverty </p>'
            + '<h2>' + Number_of_Cases + ' cases (' + percent_correct + '%) </h2>'
            + '<p>' + 'population: ' + Population_Size + '</p>'
            + '<p>' + 'White: ' + Percent_White + '% </p>'
            + '<p>' + 'Black/African American: ' + Percent_Black + '% </p>'
            + '<p>' + 'Native American: ' + Percent_AIAN + '% </p>'
            + '<p>' + 'Hispanic/Latino: ' + Percent_Hispanic + '% </p>'
            + '<p>' + 'Asian: ' + Percent_Asian + '% </p>'
            + '<p>' + 'Other: ' + Other_Percent + '% </p>')

        .addTo(map);
});

// Change the cursor to a pointer when the mouse is over the countiesNY layer.
map.on('mouseenter', 'Positivity Rate', function () {
    map.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'Positivity Rate', function () {
    map.getCanvas().style.cursor = '';

 

});