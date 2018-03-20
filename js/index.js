//barChart


//import data here
d3.csv('assets/top3factors.csv', parse, function(data) {
    console.log(data);

    var screenWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    console.log(screenWidth);
    // var max = d3.max(data, function (t) {
    //     return t.per;
    // });
    // var scaleX =
    d3.select("#barChart")
        .selectAll("div")
        .data(data)
        .enter()
        .append("div")
        .style("width", function(d) {
            return d.per*screenWidth*0.4/100+'px'
        })
        .classed('bars', true);
    // <p>data.per</p>
    d3.select("#barChart")
        .selectAll("p")
        .data(data)
        .enter()
        .append("p")
        .classed('barText', true)
        .style('top', function (d, i) {
            return i*60+18+'px' //i = 0,1,2,3
        })
        .text(function (d) {
            return d.factor;
        });

});

function parse(d) {
    return{
        factor: d['factor'],
        per: +d['percent']
    }
}




// MAP
// initialize the map on the "map" div with a given center and zoom
var map = L.map('map',{
    scrollWheelZoom: false,
    zoomSnap: 0.2
}).setView([42.3702, -71.0389], 13);

var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// L.shapefile('/Users/safehaven/Documents/project2_Qingyue/assets/openSpace_EBonly.shp').addTo(map);
// console.log(openSpace_EBonly);


var geojsonLayer = L.GeoJSON.AJAX("openSpace_EB.geojson").addTo(map);
myLayer.addData(geojsonFeature);

var myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
};

// INTERACTIVE MAP
// initialize the map on the "map" div with a given center and zoom
var interactiveMap = L.map('interactiveMap',{
    scrollWheelZoom: false,
    zoomSnap: 0.2
}).setView([42.3702, -71.0389], 13);

var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoicXF5dWUiLCJhIjoiY2lpcGJtNG13MDFvNXRya244MGVmNWpseSJ9.Cjq1RBJLYTgEawZX--r_FQ'}).addTo(interactiveMap);

