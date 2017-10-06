function fork(){
	var repoName=this.getAttribute("name");
	var userName=document.getElementById("userbutt").innerText;
	var xx=this;
	console.log(repoName);
	function w(){
		var request=getHTTPObject();
		if (request){
			var fUrl="https://api.github.com/user/"+repoName+"/forks?access_token="+to+"&t="+linktime;
			//var to=document.getElementById("t").value;
			request.open("POST",fUrl,true);
			request.onreadystatechange=function(){
				if(request.readyState==4){
					if(request.status==202){
						alert("成功复制"+repoName+"！！！！！");
						console.log(xx);
						repoName=userName+"/"+repoName.split("/")[1];
						window.open("readIndex.html?="+repoName);
					}else{
						repoName=userName+"/"+repoName.split("/")[1];
						window.open("readIndex.html?="+repoName);
					};
				};
			};
			request.send();
		};
	};
	w();
};