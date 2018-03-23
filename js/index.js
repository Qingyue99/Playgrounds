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
}).setView([42.3692, -71.0189], 13);

var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// L.shapefile('/Users/safehaven/Documents/project2_Qingyue/assets/openSpace_EBonly.shp').addTo(map);
// console.log(openSpace_EBonly);



var myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
};

var style1 = {
    onEachFeature: function(feature, layer) {
    },
    style: function(feature) {
        return {
            opacity: 0.8,
            fillOpacity:0.6,
            radius:0.05,
            color: '#2D3246'
        }
    }
};
var Playground= {
    onEachFeature: function(feature, layer) {
    },
    style: function(feature) {
        return {
            opacity: 0.8,
            fillOpacity:0.6,
            radius:0.05,
            color: '#4170A6'
        }
    }
};


var PlaygroundIcon = L.icon({
    iconUrl: "../images/playground_new.png",
    iconSize:     [25, 25], // size of the icon
    // shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

L.marker([42.3692, -71.0189], {icon: PlaygroundIcon}).addTo(map);


var School = {
    onEachFeature: function(feature, layer) {
    },
    style: function(feature) {
        return {
            opacity: 0.8,
            fillOpacity:0.6,
            radius:0.05,
            color: '#ff0000'
        }
    }
};


L.shapefile('../assets/ttt2.zip',style1).addTo(map);

L.shapefile('../assets/East Boston Playlots.zip',Playground).addTo(map);

L.shapefile('../assets/School Playlots Polygons East Boston.zip',School).addTo(map);
