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
            return d.factor + ' ' + d.per + '/90';
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
}).setView([42.3792, -71.0179], 14);

var OpenMapSurfer_Grayscale  = L.tileLayer('https://korona.geog.uni-heidelberg.de/tiles/roadsg/x={x}&y={y}&z={z}', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://giscience.uni-hd.de/">OpenStreetMap</a>'
}).addTo(map);



var myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
};
var PlaygroundIcon = L.icon({
    iconUrl: "images/playground_new.png",
    iconSize:     [25, 25], // size of the icon
    // shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});





var  option1 = {
    onEachFeature: function(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
    },
    style: function(feature) {
         if(feature.properties["Ball_Field"]!=0||feature.properties.Path!=0){
            return {
                opacity: 0.8,
                fillOpacity:0.6,
                color: '#ff5325'
            }

        } else {
            return {
                opacity: 0.8,
                fillOpacity:0.7,
                color: '#ff5325'
            }
        }
    }
};
var Playground= {
    onEachFeature: function(feature, layer) {
    },
    // style: function(feature) {
    //     return {
    //         opacity: 0.8,
    //         fillOpacity:0.6,
    //         radius:0.05,
    //         color: '#4170A6'
    //     }
    // }
    pointToLayer: function(feature, latlng) {
        // return L.circleMarker(latlng, {
        //     opacity: 1,
        //     fillOpacity: 0.7,
        //     color: feature.properties.__color__
        // });
        return L.marker(latlng, {icon: PlaygroundIcon}).addTo(map);
    }
};





L.marker([42.3692, -71.0189], {icon: PlaygroundIcon}).addTo(map);


var School = {
    onEachFeature: function(feature, layer) {
    },
    style: function(feature) {
        return {
            opacity: 0.8,
            fillOpacity:0.6,
            radius:0.05,
            color: '#2172a7'
        }
    }
};


var openspace = L.shapefile('assets/OpenSpace.zip', option1).addTo(map);

L.shapefile('assets/East Boston Playlots.zip',Playground).addTo(map);

L.shapefile('assets/School Playlots Polygons East Boston.zip',School).addTo(map);

d3.select('#path').on('click', function () {
    console.log('clicked');
    // openspace.resetStyle(function (layer) {
    //     console.log(layer);
    // })
});

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (obj) {
    console.log(obj);
    this._div.innerHTML = "<h4>Playground</h4>" +  (obj ?
        "<b>" + obj["site_name"]+ "</b><br /> <img style='width:20px' src='assets/ballfield.png'>&nbsp;Ball Field:"+ obj["Ball_Field"]+"</b><br /> <img style='width:20px' src='assets/path.png'>&nbsp;Path:"+ obj["Path"]
        +"</b><br /> <img style='width:20px' src='assets/garden.png'>&nbsp;Garden:"+ obj["Garden"]+"</b><br /> <img style='width:20px' src='assets/waterspray.png'>&nbsp;Waterspray:"+ obj["Waterspray"]: "Hover over to explore the detailed amenities of each playground");
    // this._div.style.left = "-500px";
};

info.addTo(map);


function resetHighlight(e) {
    openspace.resetStyle(e.target);
    info.update();
}
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 5,
//        color: '#666',
        color: '#F6C900',
        dashArray: '',
        fillOpacity: 0.8
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
}
