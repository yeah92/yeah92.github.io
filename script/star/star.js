function star(){
	var repoName=this.getAttribute("name");
	var xx=this;
	console.log(repoName);
	function s(){
		var request=getHTTPObject();
		if (request){
			var fUrl="https://api.github.com/user/starred/"+repoName+"?access_token="+to+"&t="+linktime;
			//var to=document.getElementById("t").value;
			request.open("PUT",fUrl,true);
			request.onreadystatechange=function(){
				if(request.readyState==4){
					if(request.status==204){
						alert("成功收藏"+repoName+"！！！！！");
						xx.className="icon-star-full";
						xx.setAttribute("title","取消收藏");
						xx.onclick=unStar;
					}else{
						alert("你没有资格！");
					};
				};
			};
			request.send();
		};
	};
	s();
};
function unStar(){
	var repoName=this.getAttribute("name");
	var xx=this;
	console.log(repoName);
	function uS(){
		var request=getHTTPObject();
		if (request){
			var fUrl="https://api.github.com/user/starred/"+repoName+"?access_token="+to+"&t="+linktime;
			//var to=document.getElementById("t").value;
			request.open("DELETE",fUrl,true);
			request.onreadystatechange=function(){
				if(request.readyState==4){
					if(request.status==204){
						xx.className="icon-star-empty";
						xx.setAttribute("title","收藏");
						console.log(xx);
						xx.onclick=star;
					}else{
						alert("爱我别走！！");
					};
				};
			};
			request.send();
		};
	};
	uS();
};
function ifStar(x){
	var repoName=x.getAttribute("name");
	console.log(repoName);
	function iS(){
		var request=getHTTPObject();
		if (request){
			var fUrl="https://api.github.com/user/starred/"+repoName+"?access_token="+to+"&t="+linktime;
			console.log(fUrl);
			//var to=document.getElementById("t").value;
			request.open("GET",fUrl,true);
			request.onreadystatechange=function(){
				if(request.readyState==4){
					if(request.status==204){
						x.className="icon-star-full";
						x.setAttribute("title","取消收藏");
						x.onclick=unStar;
					}else{
						x.className="icon-star-empty";
						x.setAttribute("title","收藏");
						x.onclick=star;
					};
				};
			};
			request.send();
		};
	};
	iS();
};