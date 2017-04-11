var markers = [];
var chicago = {lat: 41.85, lng: -87.65};
var s=0;
var fahr=0;//affordable  house and renting flag
function CenterControl(controlDiv, map) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.className = "controlUI"; 
  controlUI.id="school";
  controlUI.title = 'Click to recenter the map';
  controlUI.innerHTML='<div class="controlText"><i class="fa fa-graduation-cap" aria-hidden="true"></i></div>';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
 /* var controlText = document.createElement('div');
  controlText.className = "controlText"; 
  controlText.attr("data-toggle", "dropdown");
  //controlText.innerHTML ="Center";
  controlText.innerHTML = '<i class="fa fa-graduation-cap" aria-hidden="true"></i>';
  controlUI.appendChild(controlText);
  */
  controlUI.addEventListener('click', function() {
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
/*
  	if(this.style.backgroundColor==""||this.style.backgroundColor=='#fff')
  	{
  		this.style.backgroundColor='#ff2';  	

  	}
  	else
  	{
  		this.style.backgroundColor='#fff';  			
  	}
  	alert(this.style.backgroundColor);
  	*/
  	
  		   		/* if(x.style.backgroundColor=='#fff')
  		   		 {
  		   		 	x.style.backgroundColor='#ff2';
  		   		 	alert("blanco");
  		   		 }
  		   		 else
  		   		 {
  		   		 	x.style.backgroundColor='#fff';
  		   		 }*/
          map.setCenter(chicago);
        });
}