var t=document.getElementById("t");
var sortMenuBox=document.getElementById("sortMenuBox");
var sortMenuBoxC=sortMenuBox.children;
var chosePage=document.getElementById("chosePage");
var searchRTBStr=document.getElementById("searchRTBStr");
var c=document.getElementById("c");
var sortMenuButt=document.getElementById("sortMenuButt");
var repoOption1=document.getElementById("repoOption1");
var repoContentBox=document.getElementById("repoContentBox");
var preThisDiv="";
var preThisDivBC="";
var repoInput=document.getElementsByName('repo:');
var repoTypeSelect=document.getElementsByName('type:');
var repoStateSelect=document.getElementsByName('state:');
function searchF(){
	var q=gq;
	if(q!==""){
		var sort=gsort;
		var order=gorder;
		search('issues',q,sort,order,10,1,'sRIC');
	}else{
	};
};
sortMenuBox.onclick=function(e){
	var evt=e||event;
	var etg=evt.target;
	console.log(etg);
	if(etg.nodeName=="TD"){
		if(etg.innerHTML=="最相符"){
			gsort="best%20match";
			gorder="desc";
			sortMenuButt.innerHTML="最相符";
		};
		if(etg.innerHTML=="最多收藏"){
			gsort="stars";
			gorder="desc";
			sortMenuButt.innerHTML="最多收藏";
		};
		if(etg.innerHTML=="最少收藏"){
			gsort="stars";
			gorder="asc";
			sortMenuButt.innerHTML="最少收藏";
		};
		if(etg.innerHTML=="最多分支"){
			gsort="forks";
			gorder="desc";
			sortMenuButt.innerHTML="最多分支";
		};
		if(etg.innerHTML=="最少分支"){
			gsort="forks";
			gorder="asc";
			sortMenuButt.innerHTML="最少分支";
		};
		if(etg.innerHTML=="最近更新"){
			gsort="updated";
			gorder="desc";
			sortMenuButt.innerHTML="最近更新";
		};
		if(etg.innerHTML=="最远更新"){
			gsort="updated";
			gorder="asc";
			sortMenuButt.innerHTML="最远更新";
		};
		if(etg.innerHTML=="最多评论"){
			gsort="comments";
			gorder="desc";
			sortMenuButt.innerHTML="最多评论";
		};
		if(etg.innerHTML=="最少评论"){
			gsort="comments";
			gorder="asc";
			sortMenuButt.innerHTML="最少评论";
		};
		if(etg.innerHTML=="最新"){
			gsort="created";
			gorder="desc";
			sortMenuButt.innerHTML="最新";
		};
		if(etg.innerHTML=="最旧"){
			gsort="created";
			gorder="asc";
			sortMenuButt.innerHTML="最旧";
		};
		if(etg.innerHTML=="最多关注"){
			gsort="followers";
			gorder="desc";
			sortMenuButt.innerHTML="最多关注";
		};
		if(etg.innerHTML=="最少关注"){
			gsort="followers";
			gorder="asc";
			sortMenuButt.innerHTML="最少关注";
		};
		if(etg.innerHTML=="最近加入"){
			gsort="joined";
			gorder="desc";
			sortMenuButt.innerHTML="最近加入";
		};
		if(etg.innerHTML=="最早加入"){
			gsort="joined";
			gorder="asc";
			sortMenuButt.innerHTML="最早加入";
		};
		if(etg.innerHTML=="最多项目"){
			gsort="repositories";
			gorder="desc";
			sortMenuButt.innerHTML="最多项目";
		};
		if(etg.innerHTML=="最少项目"){
			gsort="repositories";
			gorder="asc";
			sortMenuButt.innerHTML="最少项目";
		};
		console.log(sortMenuButt.innerHTML+"|"+gsort+"|"+gorder);
		searchF();
	};
};
searchRTBStr.onclick=function(e){
	var evt=e||event;
	var etg=evt.target;
	if(etg.nodeName=="TD"||etg.nodeName=="SPAN"){
		searchRTBStr.setAttribute("name",etg.getAttribute("name"));
		if(etg.getAttribute("name")=="overview"){
			moveC();
		};
		if(etg.getAttribute("name")=="issues"){
			moveD();
			sortMenuBoxC[0].children[0].children[0].innerHTML="最相符";
			sortMenuBoxC[0].children[1].children[0].innerHTML="最多评论";
			sortMenuBoxC[0].children[2].children[0].innerHTML="最少评论";
			sortMenuBoxC[0].children[3].children[0].innerHTML="最新";
			sortMenuBoxC[0].children[4].children[0].innerHTML="最旧";
			sortMenuBoxC[0].children[5].children[0].innerHTML="最近更新";
			sortMenuBoxC[0].children[6].children[0].innerHTML="最远更新";
			gsort="best%20match";
			gorder="desc";
			sortMenuButt.innerHTML="最相符";
			searchF();
		};
	};
};
c.addEventListener("blur",function(e){
	var evt=e||event;
	var etg=evt.target;
	if(etg.nodeName=="INPUT"){
		if(gq!==""){
			var gqS=gq.split("+");
			for(i=0;i<gqS.length;i++){
				if(gqS[i].match(etg.getAttribute('name'))!==null){
					if(etg.value!==""){
						gq=gq.replace(gqS[i],etg.getAttribute("name")+etg.value);
					}else{
						gq=gq.replace("+"+gqS[i],"");
					};
					break;
				}else{
					if(etg.value!==""&&i==gqS.length-1){
						gq=gq+"+"+etg.getAttribute("name")+etg.value;
					}else{
						
					};
				};
			};
		}else{
			if(etg.value!==""){
				gq=gq+"+"+etg.getAttribute("name")+etg.value;
			}else{
				
			};
		};
	};
},true);
c.onchange=function(e){
	var evt=e||event;
	var etg=evt.target;
	if(etg.nodeName=="SELECT"){
		if(gq!==""){
			var gqS=gq.split("+");
			for(i=0;i<gqS.length;i++){
				if(gqS[i].match(etg.getAttribute('name'))!==null){
					if(etg.value!==""){
						gq=gq.replace(gqS[i],etg.getAttribute("name")+etg.value);
						searchF();
					}else{
						gq=gq.replace("+"+gqS[i],"");
						searchF();
					};
					break;
				}else{
					if(etg.value!==""&&i==gqS.length-1){
						gq=gq+"+"+etg.getAttribute("name")+etg.value;
						searchF();
					}else{
						
					};
				};
			};
		}else{
			if(etg.value!==""){
				gq=gq+"+"+etg.getAttribute("name")+etg.value;
				searchF();
			}else{
				
			};
		};
	};
};
c.onkeydown=function(e){
	var evt=e||event;
	var etg=evt.target;
	if(etg.nodeName=="INPUT"&&evt.keyCode==13){
		if(gq!==""){
			var gqS=gq.split("+");
			for(i=0;i<gqS.length;i++){
				if(gqS[i].match(etg.getAttribute('name'))!==null){
					if(etg.value!==""){
						gq=gq.replace("+"+gqS[i],"+"+etg.getAttribute("name")+etg.value);
					}else{
						gq=gq.replace("+"+gqS[i],"");
					};
				}else{
					if(etg.value!==""){
						gq=gq+"+"+etg.getAttribute("name")+etg.value;
					}else{
						
					};
				};
			};
			console.log(gq);
		}else{
			if(etg.value!==""){
				gq=gq+"+"+etg.getAttribute("name")+etg.value;
			}else{
				
			};
			console.log(gq);
		};
		searchF();
	};
};
t.addEventListener("blur",function(e){
		var evt=e||event;
		var etg=evt.target;
		if(etg.nodeName=="INPUT"){
			if(gq!==""){
				var gqS=gq.split("+");
				gq=gq.replace(gqS[0],etg.value);
				console.log(gq);
			}else{
				gq=etg.value;
				console.log(gq);
			};
		};
	},true);
t.onkeydown=function(e){
		var evt=e||event;
		var etg=evt.target;
		if(etg.nodeName=="INPUT"&&evt.keyCode==13){
			if(gq!==""){
				var gqS=gq.split("+");
				gq=gq.replace(gqS[0],etg.value);
				console.log(gq);
			}else{
				gq=etg.value;
				console.log(gq);
			};
			searchF();
		};
	};
repoOption1.onclick=function(e){
	var evt=e||event;
	var etg=evt.target;
	if(etg.innerHTML=="贡献"){
		repoContentBox.innerHTML="";
		getRepoCommit();
	};
	if(etg.innerHTML=="版本"){
		repoContentBox.innerHTML="";
		getRepoReleases();
	};
	if(etg.innerHTML=="贡献者"){
		repoContentBox.innerHTML="";
		getRepoContributor();
	};
	if(etg.innerHTML=="内容"){
		repoContentBox.innerHTML="";
		getRepoContent();
	};
	if(etg.innerHTML=="新请求"){
		repoContentBox.innerHTML="";
		
	};
};
mSelect.onchange=function(e){
	var evt=e||event;
	var etg=evt.target;
	if(etg.nodeName=="SELECT"){
		repoContentBox.innerHTML="";
		getRepoContent();
	};
};
tSelect.onchange=function (e){
	var evt=e||event;
	var etg=evt.target;
	if(etg.nodeName=="SELECT"){
		window.open(etg.value);
	};
};
repoContentBox.onclick=function(e){
	console.log(preThisDiv);
	if(preThisDiv!==""){
		preThisDiv.style.backgroundColor=preThisDivBC;
	};
	var evt=e||event;
	var etg=evt.target;
	if(etg.nodeName=="DIV"&&etg.getAttribute("id")!=="repoContent"&&etg.getAttribute("id")!=="repoContentBox"&&etg.getAttribute("class")!=="singleFileName"){
		preThisDiv=etg;
		preThisDivBC=preThisDiv.style.backgroundColor;
		etg.style.backgroundColor="rgb(102, 102, 255)";
	};
	if(etg.nodeName=="SPAN"||(etg.nodeName=="DIV"&&etg.getAttribute("class")=="singleFileName")){
		preThisDiv=etg.parentNode;
		preThisDivBC=preThisDiv.style.backgroundColor;
		etg.parentNode.style.backgroundColor="rgb(102, 102, 255)";
	};
};
repoInput[0].setAttribute("value",repo);
repoTypeSelect[0].options[1].selected=true;
repoStateSelect[0].options[1].selected=true;
gq="+repo:"+repo+"+state:open+type:issue";
searchF();