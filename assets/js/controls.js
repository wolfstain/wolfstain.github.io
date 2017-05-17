

//affordable  house and renting flag


function UpdateRangeBar(val){
  if(val===undefined)
    {
      return;
    }
   document.getElementById('myRange').value=val; 
   document.getElementById('user').innerHTML = 'mike'; 
   rfdst();
}
function UpdateRangeField(val){
  if(val===undefined)
  {
    return;
  }
   document.getElementById('RangNumber').value=val; 
   rfdst();
}

function ButtonNeighborhood(){

    var btnload=document.getElementById("neighborhood");    
    
    btnload.addEventListener("click", function() 
    {
     
     var com=document.getElementById("barrio");
     if(com.innerHTML!="")
     {
        loadneighborhood(com.innerHTML);  
     }
     else
     {
       alert("Seleccione un barrio");
     }
     
        
    });
}

function ButtonAll(){

    var btnload=document.getElementById("load");
    var fahr=0;
    btnload.addEventListener("click", function() {
        if( fahr==0)
        {
            loadDtsahr();
            btnload.innerText="Hide all places";
            btnload.style.backgroundColor="red";
            fahr=1;    
        }
        else
        {
            clearDtsahr();
            btnload.innerText="Show all places";
            btnload.style.backgroundColor="green";
            fahr=0;
        }
        
    });
}

function CenterControl(controlDiv, map) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.className = "controlUI"; 
  controlUI.id="school";
  controlUI.title = 'Click to center the map on pordue university';
  controlUI.innerHTML='<div class="controlText"><i class="fa fa-graduation-cap" aria-hidden="true"></i></div>';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.

  controlUI.addEventListener('click', function() {
    var s=0;
  	var x = document.getElementById('school');
  	//this.style.backgroundColor='#ff2';
  	if(s==0)
  	{
  		this.style.backgroundColor='#ff2';  
  		s=1;
  	}
  	else
  	{
  		this.style.backgroundColor='#fff'; 
  		s=0;
  	}
    var centers=
          map.setCenter(centering());
        });
}

function centering()
{
  return {lat: 41.8708, lng: -87.6505};
}