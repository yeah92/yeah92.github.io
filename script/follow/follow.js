function follow(){
	var userName=this.getAttribute("name");
	var xx=this;
	console.log(userName);
	function f(){
		var request=getHTTPObject();
		if (request){
			var fUrl="https://api.github.com/user/following/"+userName+"?access_token="+to+"&t="+linktime;
			//var to=document.getElementById("t").value;
			request.open("PUT",fUrl,true);
			request.onreadystatechange=function(){
				if(request.readyState==4){
					if(request.status==204){
						alert("恭喜！！你已成功注册成为"+userName+"的歌迷！！！！！");
						xx.innerHTML="分手";
						console.log(xx);
						xx.onclick=unFollow;
					}else{
						alert("你没有资格！");
					};
				};
			};
			request.send();
		};
	};
	f();
};
function unFollow(){
	var userName=this.getAttribute("name");
	var xx=this;
	console.log(userName);
	function uF(){
		var request=getHTTPObject();
		if (request){
			var fUrl="https://api.github.com/user/following/"+userName+"?access_token="+to+"&t="+linktime;
			//var to=document.getElementById("t").value;
			request.open("DELETE",fUrl,true);
			request.onreadystatechange=function(){
				if(request.readyState==4){
					if(request.status==204){
						xx.innerHTML="成为他/她的歌迷";
						console.log(xx);
						xx.onclick=follow;
					}else{
						alert("爱我别走！！");
					};
				};
			};
			request.send();
		};
	};
	uF();
};
function ifFollow(x){
	var userName=x.getAttribute("name");
	console.log(userName);
	function iF(){
		var request=getHTTPObject();
		if (request){
			var fUrl="https://api.github.com/user/following/"+userName+"?access_token="+to+"&t="+linktime;
			console.log(fUrl);
			//var to=document.getElementById("t").value;
			request.open("GET",fUrl,true);
			request.onreadystatechange=function(){
				if(request.readyState==4){
					if(request.status==204){
						x.innerHTML="分手";
						x.onclick=unFollow;
					}else{
						x.innerHTML="成为他/她的歌迷";
						x.onclick=follow;
					};
				};
			};
			request.send();
		};
	};
	iF();
};