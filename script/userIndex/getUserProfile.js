var headBox=document.getElementById("headBox");
var userNameBox=document.getElementById("userNameBox");
var userLogin=document.getElementById("userLogin");
var userFollow=document.getElementById("userFollow");
var userBlock=document.getElementById("userBlock");
var userProfileCompany=document.getElementById("userProfileCompany");
var userProfileLocation=document.getElementById("userProfileLocation");
var userProfileEmail=document.getElementById("userProfileEmail");
var userProfileBlog=document.getElementById("userProfileBlog");
var uPTRC=document.getElementById("uPTRC");
var uPTSC=document.getElementById("uPTSC");
var uPTFC=document.getElementById("uPTFC");
var uPTFGC=document.getElementById("uPTFGC");
var userProfileRepo=document.getElementById("userProfileRepo");
var userProfileStar=document.getElementById("userProfileStar");
var userProfileFollow=document.getElementById("userProfileFollow");
var userProfileFollowing=document.getElementById("userProfileFollowing");
var uPRP="1";
var uPSP="1";
var uPFP="1";
var uPFGP="1";
function getUserProfile(){
	var userName=window.location.href.split("?=")[1];
	console.log(userName);
	var request=getHTTPObject();
	if (request){
		var userApi="https://api.github.com/users/"+userName+"?access_token="+to+"&t="+linktime;
		//var to=document.getElementById("t").value;
		console.log(userApi);
		request.open("GET",userApi,true);
		request.onreadystatechange=function(){
			if(request.readyState==4){
				var ntxt=JSON.parse(request.responseText);
				console.log(ntxt);
				headBox.innerHTML="<img src="+ntxt.avatar_url+"/>";
				userNameBox.innerHTML=ntxt.name;
				userLogin.innerHTML=ntxt.login;
				userFollow.setAttribute("name",ntxt.login);
				ifFollow(userFollow);if(ntxt.company==null){
					userProfileCompany.innerHTML="<span>公司:</span>无";
				}else{
					userProfileCompany.innerHTML="<span>公司:</span>"+ntxt.company;
				};
				if(ntxt.location==null){
					userProfileLocation.innerHTML="<span>地址:</span>无";
				}else{
					userProfileLocation.innerHTML="<span>地址:</span>"+ntxt.location;
				};
				if(ntxt.email==null){
					userProfileEmail.innerHTML="<span>邮箱:</span>无";
				}else{
					userProfileEmail.innerHTML="<span>邮箱:</span>"+ntxt.email;
				};
				userProfileBlog.innerHTML="<span>个人网站:</span></br><a href="+ntxt.blog+">"+ntxt.blog+"</a>";
				uPTRC.innerHTML="&nbsp"+count(ntxt.public_repos);
				uPTRC.setAttribute("name",ntxt.public_repos);
				uPTFC.innerHTML="&nbsp"+count(ntxt.followers);
				uPTFC.setAttribute("name",ntxt.followers);
				uPTFGC.innerHTML="&nbsp"+count(ntxt.following);
				uPTFGC.setAttribute("name",ntxt.following);
			};
		};
		request.send();
	};
};
function getUserProfileRepo(){
	var userName=window.location.href.split("?=")[1];
	console.log(userName);
	var request=getHTTPObject();
	if (request){
		var userApi="https://api.github.com/users/"+userName+"/repos"+"?page="+uPRP+"&access_token="+to+"&t="+linktime;
		//var to=document.getElementById("t").value;
		console.log(userApi);
		request.open("GET",userApi,true);
		request.onreadystatechange=function(){
			if(request.readyState==4){
				var ntxt=JSON.parse(request.responseText);
				console.log(ntxt);
				for(i=0;i<ntxt.length;i++){
					var table=document.createElement("table");
					var tr1=document.createElement("tr");
					var tr2=document.createElement("tr");
					var tr3=document.createElement("tr");
					var td1=document.createElement("td");
					var td2=document.createElement("td");
					var td4=document.createElement("td");
					var td5=document.createElement("td");
					userProfileRepo.appendChild(table);
					table.appendChild(tr1);
					table.className="userProfileRepoTable";
					tr1.appendChild(td1);
					td1.innerHTML=ntxt[i].full_name;
					td1.setAttribute("colspan","2");
					td1.className="userProfileRepoTd1";
					td1.setAttribute("name",ntxt[i].full_name);
					td1.onclick=openRepo;
					if(ntxt[i].fork==true){
						var tr4=document.createElement("tr");
						var td6=document.createElement("td");
						table.appendChild(tr4);
						tr4.appendChild(td6);
						td6.innerHTML="复制的项目";
						td6.className="userProfileRepoTd6";
					};
					table.appendChild(tr2);
					tr2.appendChild(td2);
					td2.innerHTML=ntxt[i].description;
					td2.setAttribute("colspan","2");
					td2.className="userProfileRepoTd2";
					table.appendChild(tr3);
					if(ntxt[i].language!==null){
						td1.setAttribute("colspan","3");
						td2.setAttribute("colspan","3");
						var td3=document.createElement("td");
						tr3.appendChild(td3);
						td3.innerHTML=ntxt[i].language;
						td3.className="userProfileRepoTd3";
					};
					tr3.appendChild(td4);
					td4.innerHTML="收藏人数："+ntxt[i].stargazers_count;
					td4.className="userProfileRepoTd4";
					tr3.appendChild(td5);
					td5.innerHTML="复制人数："+ntxt[i].forks_count;
					td5.className="userProfileRepoTd5";
				};	
				var morePage=document.createElement("div");
				userProfileRepo.appendChild(morePage);
				morePage.innerHTML="加载更多";
				morePage.setAttribute("name",parseInt(uPRP)+parseInt(1));
				morePage.onclick=function (){
					uPRP=morePage.getAttribute("name");
					if(uPRP>Math.ceil(uPTRC.getAttribute("name")/30)){
						alert("没有更多了");
					}else{
						getUserProfileRepo();
					};
				};
			};
		};
		request.send();
	};
};
function getUserProfileStar(){
	var userName=window.location.href.split("?=")[1];
	console.log(userName);
	var request=getHTTPObject();
	if (request){
		var userApi="https://api.github.com/users/"+userName+"/starred"+"?access_token="+to+"&t="+linktime;
		//var to=document.getElementById("t").value;
		console.log(userApi);
		request.open("GET",userApi,true);
		request.onreadystatechange=function(){
			if(request.readyState==4){
				var ntxt=JSON.parse(request.responseText);
				console.log(ntxt);
				uPTSC.innerHTML="&nbsp"+ntxt.length;
				for(i=0;i<ntxt.length;i++){
					var table=document.createElement("table");
					var tr1=document.createElement("tr");
					var tr2=document.createElement("tr");
					var tr3=document.createElement("tr");
					var td1=document.createElement("td");
					var td2=document.createElement("td");
					var td4=document.createElement("td");
					var td5=document.createElement("td");
					userProfileStar.appendChild(table);
					table.appendChild(tr1);
					table.className="userProfileRepoTable";
					tr1.appendChild(td1);
					td1.innerHTML=ntxt[i].full_name;
					td1.setAttribute("colspan","2");
					td1.className="userProfileRepoTd1";
					td1.setAttribute("name",ntxt[i].full_name);
					td1.onclick=openRepo;
					if(ntxt[i].fork==true){
						var tr4=document.createElement("tr");
						var td6=document.createElement("td");
						table.appendChild(tr4);
						tr4.appendChild(td6);
						td6.innerHTML="复制的项目";
						td6.className="userProfileRepoTd6";
					};
					table.appendChild(tr2);
					tr2.appendChild(td2);
					td2.innerHTML=ntxt[i].description;
					td2.setAttribute("colspan","2");
					td2.className="userProfileRepoTd2";
					table.appendChild(tr3);
					if(ntxt[i].language!==null){
						td1.setAttribute("colspan","3");
						td2.setAttribute("colspan","3");
						var td3=document.createElement("td");
						tr3.appendChild(td3);
						td3.innerHTML=ntxt[i].language;
						td3.className="userProfileRepoTd3";
					};
					tr3.appendChild(td4);
					td4.innerHTML="收藏人数："+ntxt[i].stargazers_count;
					td4.className="userProfileRepoTd4";
					tr3.appendChild(td5);
					td5.innerHTML="复制人数："+ntxt[i].forks_count;
					td5.className="userProfileRepoTd5";
				};	
				var morePage=document.createElement("div");
				userProfileStar.appendChild(morePage);
				morePage.innerHTML="加载更多";
				morePage.setAttribute("name",parseInt(uPSP)+parseInt(1));
				morePage.onclick=function (){
					uPSP=morePage.getAttribute("name");
					if(uPSP>Math.ceil(uPTSC.getAttribute("name")/30)){
						alert("没有更多了");
					}else{
						getUserProfileStar();
					};
				};
			};
		};
		request.send();
	};
};
function getUserProfileFollow(){
	var userName=window.location.href.split("?=")[1];
	console.log(userName);
	var request=getHTTPObject();
	if (request){
		var userApi="https://api.github.com/users/"+userName+"/followers"+"?page="+uPFP+"&access_token="+to+"&t="+linktime;
		//var to=document.getElementById("t").value;
		console.log(userApi);
		request.open("GET",userApi,true);
		request.onreadystatechange=function(){
			if(request.readyState==4){
				var ntxt=JSON.parse(request.responseText);
				console.log(ntxt);
				for(i=0;i<ntxt.length;i++){
					var table=document.createElement("table");
					var tr1=document.createElement("tr");
					var tr2=document.createElement("tr");
					var td1=document.createElement("td");
					var img1=document.createElement("img");
					var td2=document.createElement("td");
					var td3=document.createElement("td");
					// var td4=document.createElement("td");
					var td5=document.createElement("td");
					userProfileFollow.appendChild(table);
					table.appendChild(tr1);
					table.appendChild(tr2);
					tr1.appendChild(td1);
					tr1.appendChild(td2);
					tr1.appendChild(td3);
					// tr2.appendChild(td4);
					tr2.appendChild(td5);
					table.className='searchResultUsTable';
					td1.className='searchResultUsTd1';
					td2.className='searchResultUsTd2';
					td3.className='searchResultUsTd3';
					// td4.className='searchResultUsTd4';
					td5.className='searchResultUsTd5';
					td5.setAttribute("colspan","2");
					td1.setAttribute("rowspan","2");
					td1.appendChild(img1);
					td1.setAttribute("name",ntxt[i].login);
					td1.onclick=openUserIndex;
					img1.setAttribute("src",ntxt[i].avatar_url);
					img1.className="userImg";
					td2.innerHTML=ntxt[i].login;
					td2.setAttribute("name",ntxt[i].login);
					td2.onclick=openUserIndex;
					td3.setAttribute("name",ntxt[i].login);
					ifFollow(td3);
					var bUrl=ntxt[i].url;
					td5.setAttribute("id",ntxt[i].id);
					function getBUrl(){
						var request=getHTTPObject();
						if (request){
							var gbUrl=bUrl+"?access_token="+to+"&t="+linktime;
							//var to=document.getElementById("t").value;
							request.open("GET",gbUrl,true);
							request.onreadystatechange=function(){
								if(request.readyState==4){
									var ntxt=JSON.parse(request.responseText);
									console.log(ntxt);
									var iTd5=document.getElementById(ntxt.id);
									iTd5.innerHTML=ntxt.bio;
								};
							};
							request.send();
						};
					};
					getBUrl();
				};
				var morePage=document.createElement("div");
				userProfileFollow.appendChild(morePage);
				morePage.innerHTML="加载更多";
				morePage.setAttribute("name",parseInt(uPFP)+parseInt(1));
				morePage.onclick=function (){
					uPFP=morePage.getAttribute("name");
					if(uPFP>Math.ceil(uPTFC.getAttribute("name")/30)){
						alert("没有更多了");
					}else{
						getUserProfileFollow();
					};
				};
			};
		};
		request.send();
	};
};
function getUserProfileFollowing(){
	var userName=window.location.href.split("?=")[1];
	console.log(userName);
	var request=getHTTPObject();
	if (request){
		var userApi="https://api.github.com/users/"+userName+"/following"+"?access_token="+to+"&t="+linktime;
		//var to=document.getElementById("t").value;
		console.log(userApi);
		request.open("GET",userApi,true);
		request.onreadystatechange=function(){
			if(request.readyState==4){
				var ntxt=JSON.parse(request.responseText);
				console.log(ntxt);
				for(i=0;i<ntxt.length;i++){
					var table=document.createElement("table");
					var tr1=document.createElement("tr");
					var tr2=document.createElement("tr");
					var td1=document.createElement("td");
					var img1=document.createElement("img");
					var td2=document.createElement("td");
					var td3=document.createElement("td");
					// var td4=document.createElement("td");
					var td5=document.createElement("td");
					userProfileFollowing.appendChild(table);
					table.appendChild(tr1);
					table.appendChild(tr2);
					tr1.appendChild(td1);
					tr1.appendChild(td2);
					tr1.appendChild(td3);
					// tr2.appendChild(td4);
					tr2.appendChild(td5);
					table.className='searchResultUsTable';
					td1.className='searchResultUsTd1';
					td2.className='searchResultUsTd2';
					td3.className='searchResultUsTd3';
					// td4.className='searchResultUsTd4';
					td5.className='searchResultUsTd5';
					td5.setAttribute("colspan","2");
					td1.setAttribute("rowspan","2");
					td1.appendChild(img1);
					td1.setAttribute("name",ntxt[i].login);
					td1.onclick=openUserIndex;
					img1.setAttribute("src",ntxt[i].avatar_url);
					img1.className="userImg";
					td2.innerHTML=ntxt[i].login;
					td2.setAttribute("name",ntxt[i].login);
					td2.onclick=openUserIndex;
					td3.setAttribute("name",ntxt[i].login);
					ifFollow(td3);
					var bUrl=ntxt[i].url;
					td5.setAttribute("id",ntxt[i].id);
					function getBUrl(){
						var request=getHTTPObject();
						if (request){
							var gbUrl=bUrl+"?access_token="+to+"&t="+linktime;
							//var to=document.getElementById("t").value;
							request.open("GET",gbUrl,true);
							request.onreadystatechange=function(){
								if(request.readyState==4){
									var ntxt=JSON.parse(request.responseText);
									console.log(ntxt);
									var iTd5=document.getElementById(ntxt.id);
									iTd5.innerHTML=ntxt.bio;
								};
							};
							request.send();
						};
					};
					getBUrl();
				};
				var morePage=document.createElement("div");
				userProfileFollowing.appendChild(morePage);
				morePage.innerHTML="加载更多";
				morePage.setAttribute("name",parseInt(uPFGP)+parseInt(1));
				morePage.onclick=function (){
					uPFGP=morePage.getAttribute("name");
					if(uPFGP>Math.ceil(uPTFGC.getAttribute("name")/30)){
						alert("没有更多了");
					}else{
						getUserProfileFollowing();
					};
				};
			};
		};
		request.send();
	};
};
getUserProfile();
getUserProfileRepo();
getUserProfileStar();
getUserProfileFollow();
getUserProfileFollowing();