var to=localStorage.to;
var linktime=new Date();
var repositoryContent=document.getElementById("repositoryContent");
var crBox=document.getElementById("cr");
var mrBox=document.getElementById("mr");
function noticeManageGetRepostitory(){
	var request=getHTTPObject();
	if (request){
		request.open("GET",mrtolink,true);
		request.onreadystatechange=function(){
			if(request.readyState==4){
				var ntxt=JSON.parse(request.responseText);
				console.log(ntxt);
				if(ntxt.length==0){
					mrBox.innerHTML="没有对应项目";
					return;
				};
				//以下是写出内容
				mrBox.innerHTML="";
				for(i=0;i<ntxt.length;i++){
					var rn=ntxt[i].name;
					var ivalue=document.getElementById("repositorySearchInput").value;
					var ic=rn.search(ivalue);
					console.log(rn);
					if(ic!==-1){
						var table=document.createElement("table");
						var tr=document.createElement("tr");
						var td=document.createElement("td");
						mrBox.appendChild(table);
						table.appendChild(tr);
						table.setAttribute("name",ntxt[i].full_name);
						table.onclick=openRepo;
						tr.appendChild(td);
						table.className="tabletable";
						tr.addEventListener("mouseover",mouseOverBlue);
						td.innerHTML=rn;
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
function noticeManageGetContributeRepostitory(){
	var request=getHTTPObject();
	if (request){
		request.open("GET",crtolink,true);
		request.onreadystatechange=function(){
			if(request.readyState==4){
				var ntxt=JSON.parse(request.responseText);
				console.log(ntxt);
				if(ntxt.length==0){
					crBox.innerHTML="";
					crBox.innerHTML="没有与你有关的项目";
					return;
				};
				//以下是写出内容
				crBox.innerHTML="";
				for(i=0;i<ntxt.items.length;i++){
					var repositoryURL=ntxt.items[i].repository_url+"?access_token="+to+"&t="+linktime;
					function getRepositoryStarCount(){
						var request=getHTTPObject();
						if(request){
							request.open("GET",repositoryURL,true);
							request.onreadystatechange=function(){
								if(request.readyState==4){
									var ntxt=JSON.parse(request.responseText);
									var repositoryName=ntxt.full_name;
									var ivalue=document.getElementById("repositorySearchInput").value;
									var ic=repositoryName.search(ivalue);
									if(ic!==-1){
										var repositoryStarCount=ntxt.stargazers_count;
										var rTable=document.createElement("table");
										rTable.setAttribute("name",repositoryName);
										rTable.onclick=openRepo;
										var rTr=document.createElement("tr");
										var rNTd=document.createElement("td");
										var rCTd=document.createElement("td");
										rTable.className="rTable";
										rTr.addEventListener("mouseover",mouseOverBlue);
										// rNTd.innerHTML=repositoryName;
										crBox.appendChild(rTable);
										rTable.appendChild(rTr);
										rTr.appendChild(rNTd);
										rTr.appendChild(rCTd);
										rNTd.innerHTML='项目：'+repositoryName;
										rNTd.style.backgroundColor="rgba(245,245,245,0.2)";
										rCTd.innerHTML='收藏人数：'+repositoryStarCount;
									};
								};
							};
							request.send(null);
						};
					};
					getRepositoryStarCount();
				};
			};
		};
		request.send(null);
	}
	else{
		alert('Sorry,your browser doesn\'t support XMLHttpRequest');
	};
};
function getUserRepository(){
	rMButt.innerHTML="所有项目";
	rTBB.setAttribute("id","all");
	rTBB.setAttribute("name","所有项目");
	if(localStorage.to!==null&&localStorage.to!==""&&localStorage.to!==undefined){
		mrtolink="https://api.github.com/user/repos?access_token="+to+"&t="+linktime;
		noticeManageGetRepostitory();
	};
};
function getUserContributeRepository(){
	crBox.innerHTML="";
	function getUserName(){
		var request=getHTTPObject();
		if (request){
			if(localStorage.to!==null&&localStorage.to!==""&&localStorage.to!==undefined){
				var tolink="https://api.github.com/user?access_token="+to+"&t="+linktime;
				request.open("GET",tolink,true);
				request.onreadystatechange=function(){
					if(request.readyState==4){
						var ntxt=JSON.parse(request.responseText);
						var userName=ntxt.login;
						crtolink="https://api.github.com/search/issues?access_token="+to+"&q=type:pr%20author:"+userName+"&t="+new Date();
						console.log(tolink);
						noticeManageGetContributeRepostitory();
					};
				};
				request.send(null);
			};
		}
		else{
			alert('Sorry,your browser doesn\'t support XMLHttpRequest');
		};
	};
	getUserName();
};
function getXUserRepository(){
	var tn=this.getAttribute("id");
	var gn=this.getAttribute("name");
	rTBB.setAttribute("id",tn);
	rTBB.setAttribute("name",gn);
	rMButt.innerHTML=gn;
	mrBox.innerHTML="";
	if(tn=="sources"){
		mrtolink="https://api.github.com/user/repos?access_token="+to+"&type=all"+"&t="+linktime;
		console.log(mrtolink);
		function noticeManageGetRepostitoryS(){
			var request=getHTTPObject();
			if (request){
				request.open("GET",mrtolink,true);
				request.onreadystatechange=function(){
					if(request.readyState==4){
						var ntxt=JSON.parse(request.responseText);
						console.log(ntxt);
						if(ntxt.length==0){
							mrBox.innerHTML="没有对应项目";
							return;
						};
						// 以下是写出内容
						for(i=0;i<ntxt.length;i++){
							var rn=ntxt[i].name;
							var rf=ntxt[i].fork;
							var ivalue=document.getElementById("repositorySearchInput").value;
							var ic=rn.search(ivalue);
							console.log(rn);
							console.log(rf);
							console.log(ic);
							if(rf==false&&ic!==-1){
								var table=document.createElement("table");
								var tr=document.createElement("tr");
								var td=document.createElement("td");
								mrBox.appendChild(table);
								table.appendChild(tr);
								table.setAttribute("name",ntxt[i].full_name);
								table.onclick=openRepo;
								tr.appendChild(td);
								table.className="tabletable";
								tr.addEventListener("mouseover",mouseOverBlue);
								td.innerHTML=rn;
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
		noticeManageGetRepostitoryS();
	}else{
		if(tn=="forks"){
			mrtolink="https://api.github.com/user/repos?access_token="+to+"&type=all"+"&t="+linktime;
			console.log(mrtolink);
			function noticeManageGetRepostitoryF(){
				var request=getHTTPObject();
				if (request){
					request.open("GET",mrtolink,true);
					request.onreadystatechange=function(){
						if(request.readyState==4){
							var ntxt=JSON.parse(request.responseText);
							console.log(ntxt);
							if(ntxt.length==0){
								mrBox.innerHTML="没有对应项目";
								return;
							};
							// 以下是写出内容
							for(i=0;i<ntxt.length;i++){
								var rn=ntxt[i].name;
								var rf=ntxt[i].fork;
								var ivalue=document.getElementById("repositorySearchInput").value;
								var ic=rn.search(ivalue);
								console.log(rn);
								if(rf==true&&ic!==-1){
									var table=document.createElement("table");
									var tr=document.createElement("tr");
									var td=document.createElement("td");
									mrBox.appendChild(table);
									table.appendChild(tr);
									table.setAttribute("name",ntxt[i].full_name);
									table.onclick=openRepo;
									tr.appendChild(td);
									table.className="tabletable";
									tr.addEventListener("mouseover",mouseOverBlue);
									td.innerHTML=rn;
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
			noticeManageGetRepostitoryF();
		}else{
			mrtolink="https://api.github.com/user/repos?access_token="+to+"&type="+tn+"&t="+linktime;
			console.log(mrtolink);
			noticeManageGetRepostitory();
		};
	};
};
function rSearch(){
	getUserContributeRepository();
	function sgetXUserRepository(){
		var tn=rTBB.getAttribute("id");
		var gn=rTBB.getAttribute("name");
		rMButt.innerHTML=gn;
		mrBox.innerHTML="";
		if(tn=="sources"){
			mrtolink="https://api.github.com/user/repos?access_token="+to+"&type=all"+"&t="+linktime;
			console.log(mrtolink);
			function noticeManageGetRepostitoryS(){
				var request=getHTTPObject();
				if (request){
					request.open("GET",mrtolink,true);
					request.onreadystatechange=function(){
						if(request.readyState==4){
							var ntxt=JSON.parse(request.responseText);
							console.log(ntxt);
							if(ntxt.length==0){
								mrBox.innerHTML="";
								mrBox.innerHTML="没有对应项目";
								return;
							};
							// 以下是写出内容
							mrBox.innerHTML="";
							for(i=0;i<ntxt.length;i++){
								var rn=ntxt[i].name;
								var rf=ntxt[i].fork;
								var ivalue=document.getElementById("repositorySearchInput").value;
								var ic=rn.search(ivalue);
								console.log(rn);
								console.log(rf);
								console.log(ic);
								if(rf==false&&ic!==-1){
									var table=document.createElement("table");
									var tr=document.createElement("tr");
									var td=document.createElement("td");
									mrBox.appendChild(table);
									table.appendChild(tr);
									table.setAttribute("name",ntxt[i].full_name);
									table.onclick=openRepo;
									tr.appendChild(td);
									table.className="tabletable";
									tr.addEventListener("mouseover",mouseOverBlue);
									td.innerHTML=rn;
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
			noticeManageGetRepostitoryS();
		}else{
			if(tn=="forks"){
				mrtolink="https://api.github.com/user/repos?access_token="+to+"&type=all"+"&t="+linktime;
				console.log(mrtolink);
				function noticeManageGetRepostitoryF(){
					var request=getHTTPObject();
					if (request){
						request.open("GET",mrtolink,true);
						request.onreadystatechange=function(){
							if(request.readyState==4){
								var ntxt=JSON.parse(request.responseText);
								console.log(ntxt);
								if(ntxt.length==0){
									mrBox.innerHTML="";
									mrBox.innerHTML="没有对应项目";
									return;
								};
								// 以下是写出内容
								mrBox.innerHTML="";
								for(i=0;i<ntxt.length;i++){
									var rn=ntxt[i].name;
									var rf=ntxt[i].fork;
									var ivalue=document.getElementById("repositorySearchInput").value;
									var ic=rn.search(ivalue);
									console.log(rn);
									if(rf==true&&ic!==-1){
										var table=document.createElement("table");
										var tr=document.createElement("tr");
										var td=document.createElement("td");
										mrBox.appendChild(table);
										table.appendChild(tr);
										table.setAttribute("name",ntxt[i].full_name);
										table.onclick=openRepo;
										tr.appendChild(td);
										table.className="tabletable";
										tr.addEventListener("mouseover",mouseOverBlue);
										td.innerHTML=rn;
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
				noticeManageGetRepostitoryF();
			}else{
				mrtolink="https://api.github.com/user/repos?access_token="+to+"&type="+tn+"&t="+linktime;
				console.log(mrtolink);
				noticeManageGetRepostitory();
			};
		};
	};
	sgetXUserRepository();
};
addLoadEvent(getUserRepository);
addLoadEvent(getUserContributeRepository);