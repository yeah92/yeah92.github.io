function watch(){
	var repoName=this.getAttribute("name");
	var xx=this;
	console.log(repoName);
	function w(){
		var request=getHTTPObject();
		if (request){
			var fUrl="https://api.github.com/user/subscriptions/"+repoName+"?access_token="+to+"&t="+linktime;
			//var to=document.getElementById("t").value;
			request.open("PUT",fUrl,true);
			request.onreadystatechange=function(){
				if(request.readyState==4){
					if(request.status==204){
						alert("成功关注"+repoName+"！！！！！");
						xx.className='icon-eye-blocked';
						xx.setAttribute("title","取消关注");
						xx.onclick=unWatch;
					}else{
						alert("你没有资格！");
					};
				};
			};
			request.send();
		};
	};
	w();
};
function unWatch(){
	var repoName=this.getAttribute("name");
	var xx=this;
	console.log(repoName);
	function uW(){
		var request=getHTTPObject();
		if (request){
			var fUrl="https://api.github.com/user/subscriptions/"+repoName+"?access_token="+to+"&t="+linktime;
			//var to=document.getElementById("t").value;
			request.open("DELETE",fUrl,true);
			request.onreadystatechange=function(){
				if(request.readyState==4){
					if(request.status==204){
						xx.className='icon-eye';
						xx.setAttribute("title","关注");
						xx.onclick=watch;
					}else{
						alert("爱我别走！！");
					};
				};
			};
			request.send();
		};
	};
	uW();
};
function ifWatch(x){
	var repoName=x.getAttribute("name");
	console.log(repoName);
	function iW(){
		var request=getHTTPObject();
		if (request){
			var fUrl="https://api.github.com/user/subscriptions/"+repoName+"?access_token="+to+"&t="+linktime;
			console.log(fUrl);
			//var to=document.getElementById("t").value;
			request.open("GET",fUrl,true);
			request.onreadystatechange=function(){
				if(request.readyState==4){
					if(request.status==204){
						x.className='icon-eye-blocked';
						x.setAttribute("title","取消关注");
						x.onclick=unWatch;
					}else{
						x.className='icon-eye';
						x.setAttribute("title","关注");
						x.onclick=watch;
					};
				};
			};
			request.send();
		};
	};
	iW();
};