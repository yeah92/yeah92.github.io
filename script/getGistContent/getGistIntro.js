function getGistIntro(){
	var request=getHTTPObject();
	if (request){
		//var to=document.getElementById("t").value;
		var to="6f29e41b100c55643afb581eca2025ae798f5f10";
		var tolink="https://api.github.com/users/yeah92/gists?access_token="+to;
		request.open("GET",tolink,true);
		request.onreadystatechange=function(){
			if(request.readyState==4){
				var ntxt=JSON.parse(request.responseText);
				console.log(ntxt);
				for(var i=0;i<ntxt.length;i++){
					var intro=document.getElementById("gintro");
					var d=document.createElement("div");
					var dt=document.createElement("div");
					var dd=document.createElement("div");
					for(var objname in ntxt[i].files){
						dt.innerHTML=objname;
						dd.innerHTML=ntxt[i].description;
						d.appendChild(dt);
						d.appendChild(dd);
						d.style.height="70px";
						d.style.width="100px";
						d.style.float="left";
						intro.appendChild(d);
					};
				};
			};
		};
		request.send(null);
	}
	else{
		alert('Sorry,your browser doesn\'t support XMLHttpRequest');
	};
};