var arr;
var markers = [];
var active=0;
var centers={lat: 41.8708, lng: -87.6505};
 var chicago = {lat: 41.85, lng: -87.65};



function reset()//Funcion necesaria para la visualización correcta del mapa
{
    if(map!=null){
    google.maps.event.trigger(map, 'resize'); 
    map.setCenter(centers); 
    }    
}

function initMap() 
{
    var mapCanvas = document.getElementById("map");
    var mapOptions = 
      {
        center: centers,
        zoom: 14,
        mapTypeControl: true,
          mapTypeControlOptions: {
              style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
              position: google.maps.ControlPosition.TOP_CENTER
          },
          zoomControl: true,
          zoomControlOptions: {
              position: google.maps.ControlPosition.LEFT_CENTER
          },
          scaleControl: true,
          streetViewControl: true,
          streetViewControlOptions: {
              position: google.maps.ControlPosition.LEFT_TOP
          },
          fullscreenControl: true
      }
    

    map = new google.maps.Map(mapCanvas, mapOptions);   


    map.data.loadGeoJson('https://data.cityofchicago.org/api/geospatial/cauq-8yn6?method=export&format=GeoJSON');
    //map.data.loadGeoJson('https://storage.googleapis.com/maps-devrel/google.json');

        map.data.setStyle({
            fillColor: 'green',
            title: 'LALAALALAND',
            strokeColor: 'blue'
            });

    //Para solucionar el problema de tamaño
    map.data.addListener('click', function(event) 
    {
        
        document.getElementById("barrio").innerHTML = event.feature.getProperty('community');

        alert(event.latLng);
        //alert(  google.maps.geometry.poly.containsLocation(event.latLng, this) );
        if(active!=0)
        {
             map.data.overrideStyle(active,{ fillColor: 'green' });
        }
        active=event.feature;

        map.data.overrideStyle(event.feature, { fillColor: 'red' });

        //alert(map.data.type);
        //document.getElementById("geo").innerHTML = map.data.type;
    }
    );
    // Set the global styles.

    var myLatLng = centers;
    //Illinois University Marker
    var image = 'images/ill.png';

    //marcador de la U de illinois
    var Umarker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Department of Computer Science – University of Illinois!',
        icon: image
    });

       //función ONCLICK de la universidad de Illinois
     Umarker.addListener('click', function() {
                        map.setCenter( centers );
                    });

    google.maps.event.addListenerOnce(map, 'idle', function() {
        window.dispatchEvent(new Event('resize'));
    });

    //agrega la funcionalidad de carga al btn para mostrar todo
    ButtonAll();
    ButtonNeighborhood();
      
      
    // Setup the click event listeners: simply set the map to Chicago.
        var centerControlDiv = document.createElement('div');
        var centerControl = new CenterControl(centerControlDiv, map);
        centerControlDiv.index = 1;
        map.controls[google.maps.ControlPosition.RIGHT_TOP].push(centerControlDiv);        
}

    