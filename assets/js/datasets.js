 var fl=0; /* flag */
 var dtsahr=[];/* DaTaset Affordable Housing Rentaing. */
 var mrkahr=[]; /*MR= MaRkers, AHR= Affordable House Renting ---> MrAhr.*/

function rfdst()/*function to load markers in select range*/
{
    var km=document.getElementById("RangNumber").value;
    loadminimum(km);

        function loadminimum(distance)
    {
        if(fl==0)
        {
            loadDtsahr();        
        }
        clearDtsahr();
        mrkahr.sort(compare);

        for (i = 0; i < dtsahr.length; i++) 
        {        
            if(mrkahr[i]["distancia"]<=distance)
            {
                mrkahr[i].setMap(map);
            }
        }
    }
}



function loadneighborhood(community)
{

    if(community===undefined)
  {
    return;
  }
    if(fl==0)
    {
        loadDtsahr();        
    }

    clearDtsahr();

    for (i = 0; i < dtsahr.length; i++) 
    {     
        console.log(mrkahr[i]["comunidad"]);

        if(mrkahr[i]["comunidad"].toLowerCase()===community.toLowerCase())
        {
            mrkahr[i].setMap(map);
        }
    }
}


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

function compare(a,b) /*Custom function to compare closeness to University between two markers*/
{
  if (a["distancia"] < b["distancia"])
    return -1;
  if (a["distancia"] > b["distancia"])
    return 1;
  return 0;
}

function tiempos(posicion) /*Custom function to get Google maps estimated time from marker to university*/
{
        var chicago = {lat: 41.85, lng: -87.65};
        var destination = posicion; 
        var directionsService = new google.maps.DirectionsService();
        var request = {
            origin: chicago, 
            destination: destination, 
            travelMode: 'WALKING'
        };

         directionsService.route( request, function( response, status ) 
        {            
            if ( status === 'OK' ) {
                var point = response.routes[ 0 ].legs[ 0 ];
                var time=point.duration.text;
                document.getElementById("walk").innerHTML=time;
            }
        } ); 

          var request = {
            origin: chicago, 
            destination: destination,
            travelMode: 'DRIVING'
        };

         directionsService.route( request, function( response, status ) 
        {            
            if ( status === 'OK' ) {
                var point = response.routes[ 0 ].legs[ 0 ];
                var time=point.duration.text;
                document.getElementById("drive").innerHTML=time;
            }
        } ); 

          var request = {
            origin: chicago, 
            destination: destination, 
            travelMode: 'BICYCLING'
        };

         directionsService.route( request, function( response, status ) 
        {            
            if ( status === 'OK' ) {
                var point = response.routes[ 0 ].legs[ 0 ];
                var time=point.duration.text;
                document.getElementById("cycle").innerHTML=time;
            }
        } ); 
    
}


function loadDtsahr() /*Custom function to load all the house renting options with their main caracteristics*/
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
            comunidad: dtsahr[i][8],
            icon: 'images/house.png'
        });     
        marker.addListener('click', function() {
                        var latLng = this["position"];
                        map.setCenter( latLng );
                        document.getElementById("titulo").innerHTML=this["title"];
                        document.getElementById("dir").innerHTML=this["address"];
                        document.getElementById("distan").innerHTML=this["distancia"]+" Kilometers";
                        document.getElementById("comu").innerHTML=this["comunidad"];                        
                        tiempos(this["position"]);                       
                    });
        mrkahr.push(marker);
    }
    mrkahr.sort(compare);
    fl="1";
}



function clearDtsahr() /*function to clear the temporal dataset*/
{
    for (var i = 0; i < mrkahr.length; i++) 
    {
          mrkahr[i].setMap(null);
    }      
}

function ini() /*function to get house renting data from chicago city portal*/
{
        var urlsahr = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?";
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", urlsahr, true);
        xmlhttp.send();
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
            }
        }
    }
}