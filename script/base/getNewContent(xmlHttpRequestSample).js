function getNewContent(){
	var request=getHTTPObject();
	if (request){
		//var to=document.getElementById("t").value;
		var to="6f29e41b100c55643afb581eca2025ae798f5f10";
		var tolink="https://api.github.com/user?access_token="+to;
		request.open("GET",tolink,true);
		request.onreadystatechange=function(){
			if(request.readyState==4){
				var ntxt=JSON.parse(request.responseText);
				//以下是写出内容
				ub.innerHTML=ntxt.login;
			};
		};
		request.send(null);
	}
	else{
		alert('Sorry,your browser doesn\'t support XMLHttpRequest');
	};
};
addLoadEvent(getNewContent);