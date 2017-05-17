 var time="";
 var fl=0;
 var markers = [];
 var dtsahr=[];//affordable housing and rental dataset chicago
 var mrkahr=[];
 var tir=[];
var chicago = {lat: 41.85, lng: -87.65};
 var urlsahr = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?";
 var xmlhttp = new XMLHttpRequest();
 var km;
        //json format data resource url 

function rfdst()
{
    km=document.getElementById("RangNumber").value;
    loadminimum();
}

xmlhttp.open("GET", urlsahr, true);
xmlhttp.send();

function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
}

function compare(a,b) {
  if (a["distancia"] < b["distancia"])
    return -1;
  if (a["distancia"] > b["distancia"])
    return 1;
  return 0;
}

function addMarker(location) {
        var marker = new google.maps.Marker({
          position: location,
          map: map
        });
         marker.addListener('click', function() {
                        document.getElementById("pr").innerHTML = "Name: " + this["title"] + " Address: " + this["address"]; //json.data[i][15]"";
                        var latLng = marker.getPosition();
                        panTo(latLng);
                    });
        markers.push(marker);

      }

 function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }

function tiempos()
{
    alert("markers.length "+mrkahr.length);
    for (i=0;i<mrkahr.length;i++)
    {
        var destination = mrkahr[i]["position"]; // using string
        var directionsService = new google.maps.DirectionsService();
        var request = {
            origin: chicago, // LatLng|string
            destination: destination, // LatLng|string
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };

         directionsService.route( request, function( response, status ) 
        {            
            if ( status === 'OK' ) {
                var point = response.routes[ 0 ].legs[ 0 ];
                time=point.duration.text;
                alert(time);
                mrkahr[i]["tiempo"]=point.duration.text;                
               // alert(position+" " +time);
                //$( '#travel_data' ).html( 'Estimated travel time: ' + point.duration.text + ' (' + point.distance.text + ')' );
            }
        } );
           marker.addListener('click', function() {
                        //alert(this["tiempo"]);
                        var latLng = marker.getPosition();
                        map.setCenter( latLng );
                                              //panTo(latLng);
                        alert(this["position"]+this["distancia"]);                        

                    });
    }
}


function loadminimum()
{
    if(fl==0)
    {
        loadDtsahr();        
    }
    clearDtsahr();
    mrkahr.sort(compare);

    for (i = 0; i < dtsahr.length; i++) 
    {        
        if(mrkahr[i]["distancia"]<=km)
        {
         mrkahr[i].setMap(map);
        }
    }
}

function loadDtsahr()
{

    for (i = 0; i < dtsahr.length; i++) 
    {
        var lat2=dtsahr[i][19];
        var lon2=dtsahr[i][20];
        var position = new google.maps.LatLng(lat2,lon2);
               // using google.maps.LatLng class   

            marker = new google.maps.Marker({
            position: position,
            map: map,
            title: dtsahr[i][15],
            address: dtsahr[i][12],
            tiempo:"",             
            distancia: distance(41.85, -87.65, lat2, lon2, "K"),
            icon: 'images/house.png'
        });     
        marker.addListener('click', function() {
                        //alert(this["tiempo"]);
                        var latLng = this["position"];
                        map.setCenter( latLng );
                                              //panTo(latLng);
                        alert(this["position"]+this["distancia"]);                        

                    });
        mrkahr.push(marker);
    }
    mrkahr.sort(compare);
    flag="1";
}

function clearDtsahr()
{
    for (var i = 0; i < mrkahr.length; i++) {
          mrkahr[i].setMap(null);
    }      
    //mrkahr = [];
}

xmlhttp.onreadystatechange = function() 
{
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
    {
    var myArr = xmlhttp.responseText;
    var text = myArr;
    var json = JSON.parse(text);

    for (i = 0; i < Object.keys(json.data).length; i++) 
    {
        dtsahr.push(json.data[i]);
        /*
        var position = new google.maps.LatLng(json.data[i][19], json.data[i][20]);
         marker = new google.maps.Marker({
            position: position,
            map: map,
            title: json.data[i][15],
            address: json.data[i][12]
        });
        markers.push(marker);*/ 
    /*
        var position = new google.maps.LatLng(json.data[i][19], json.data[i][20]);       
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: json.data[i][15],
            address: json.data[i][12]
        });*/
    }
}
}
