 var markers = [];
 var dtsahr=[];//affordable housing and rental dataset chicago
 var mrkahr=[];
 var chicago;
 var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?";
 var xmlhttp = new XMLHttpRequest();
        //json format data resource url 

xmlhttp.open("GET", url, true);
xmlhttp.send();


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

function loadDtsahr()
{
    for (i = 0; i < dtsahr.length; i++) 
    {
        var position = new google.maps.LatLng(dtsahr[i][19], dtsahr[i][20]);
         marker = new google.maps.Marker({
            position: position,
            map: map,
            title: dtsahr[i][15],
            address: dtsahr[i][12]
        });
        mrkahr.push(marker);
    }
}

function clearDtsahr()
{
    for (var i = 0; i < mrkahr.length; i++) {
          mrkahr[i].setMap(null);
    }      
    mrkahr = [];
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
