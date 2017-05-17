
function reset()/*Funcion necesaria para la visualización correcta del mapa debido a la incompatibilidad inicial de la plantilla*/
{
    if(map!=null){
    google.maps.event.trigger(map, 'resize'); 
    map.setCenter(centering()); 
    }    
}

function initMap() 
{
    ini();
    var centers={lat: 41.8708, lng: -87.6505};
 var chicago = {lat: 41.85, lng: -87.65};
    var active=0;
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

        map.data.setStyle({
            fillColor: 'green',
            title: 'LALAALALAND',
            strokeColor: 'blue'
            });
   
    map.data.addListener('click', function(event) 
    {
        
        document.getElementById("barrio").innerHTML = event.feature.getProperty('community');

        alert(event.latLng);
        
        if(active!=0)
        {
             map.data.overrideStyle(active,{ fillColor: 'green' });
        }
        active=event.feature;

        map.data.overrideStyle(event.feature, { fillColor: 'red' });

    }
    );

    /*Illinois University Marker*/
    var myLatLng = centers;
    
    var image = 'images/ill.png';
    var Umarker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Department of Computer Science – University of Illinois!',
        icon: image
    });


     Umarker.addListener('click', function() {
                        map.setCenter( centering() );
                    });

    google.maps.event.addListenerOnce(map, 'idle', function() {
        window.dispatchEvent(new Event('resize'));
    });

    /*Add controls behavior from controls.js*/
    ButtonAll();
    ButtonNeighborhood();
      
      
    /* Setup the click event listeners: simply set the map to Chicago.*/
    var centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, map);
    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(centerControlDiv);        
}

    