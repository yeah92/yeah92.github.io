function getNewContent(){
	var request=getHTTPObject();
	if (request){
		//var to=document.getElementById("t").value;
		if(localStorage.to!==null&&localStorage.to!==""&&localStorage.to!==undefined){
			var tolink="https://api.github.com/user?access_token="+localStorage.to;
			request.open("GET",tolink,true);
			request.onreadystatechange=function(){
				if(request.readyState==4){
					var ntxt=JSON.parse(request.responseText);
					console.log(ntxt.login);
					//以下是写出内容
					var ub=document.getElementById("userbutt");
					ub.innerHTML=ntxt.login;
					userName=ntxt.login;
				};
			};
			request.send(null);
		};
	}
	else{
		alert('Sorry,your browser doesn\'t support XMLHttpRequest');
	};
};
addLoadEvent(getNewContent);