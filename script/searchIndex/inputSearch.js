var t=document.getElementById("t");
var sortMenuBox=document.getElementById("sortMenuBox");
var sortMenuBoxC=sortMenuBox.children;
var chosePage=document.getElementById("chosePage");
var searchRTBStr=document.getElementById("searchRTBStr");
var c=document.getElementById("c");
var sortMenuButt=document.getElementById("sortMenuButt");
var selectType=document.getElementsByName("type:")[0];
var selectState=document.getElementsByName("state:")[0];
function searchF(){
	var q=gq;
	if(q!==""){
		var sort=gsort;
		var order=gorder;
		search('repositories',q,sort,order,10,1,'sRRC');
		search('issues',q,sort,order,10,1,'sRIC');
		// search('commits',q,sort,order,10,1,'sRCC');
		search('users',q,sort,order,10,1,'sRUC');
	}else{
		alert("告诉我你要找什么！");
	};
};
function getSearchValue(){
	var searchValue=window.location.href.split("?=")[1];
	console.log(searchValue);
	if(searchValue==""||searchValue==null){
		
	}else{
		if(searchValue.match("indexType=is")!==null){
			gq=searchValue.split("indexType=is")[1];
			selectType.options[1].selected=true;
			selectState.options[1].selected=true;
			var sort=gsort;
			var order=gorder;
			searchRTBStr.setAttribute("name","issues");
			search('issues',gq,sort,order,10,1,'sRIC');
		}else{
			if(searchValue.match("indexType=pr")!==null){
				gq=searchValue.split("indexType=pr")[1];
				selectType.options[2].selected=true;
				selectState.options[1].selected=true;
				var sort=gsort;
				var order=gorder;
				searchRTBStr.setAttribute("name","issues");
				search('issues',gq,sort,order,10,1,'sRIC');
			}else{
				t.value=searchValue;
				gq=searchValue;
				searchF();
			};
		};
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
	console.log(etg);
	console.log(sortMenuBoxC);
	if(etg.nodeName=="TD"||etg.nodeName=="SPAN"){
		searchRTBStr.setAttribute("name",etg.getAttribute("name"));
		if(etg.getAttribute("name")=="repositories"){
			sortMenuBoxC[0].children[0].children[0].innerHTML="最相符";
			sortMenuBoxC[0].children[1].children[0].innerHTML="最多收藏";
			sortMenuBoxC[0].children[2].children[0].innerHTML="最少收藏";
			sortMenuBoxC[0].children[3].children[0].innerHTML="最多分支";
			sortMenuBoxC[0].children[4].children[0].innerHTML="最少分支";
			sortMenuBoxC[0].children[5].children[0].innerHTML="最近更新";
			sortMenuBoxC[0].children[6].children[0].innerHTML="最远更新";
			gsort="best%20match";
			gorder="desc";
			sortMenuButt.innerHTML="最相符";
		};
		if(etg.getAttribute("name")=="issues"){
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
		};
		if(etg.getAttribute("name")=="users"){
			sortMenuBoxC[0].children[0].children[0].innerHTML="最相符";
			sortMenuBoxC[0].children[1].children[0].innerHTML="最多关注";
			sortMenuBoxC[0].children[2].children[0].innerHTML="最少关注";
			sortMenuBoxC[0].children[3].children[0].innerHTML="最近加入";
			sortMenuBoxC[0].children[4].children[0].innerHTML="最远加入";
			sortMenuBoxC[0].children[5].children[0].innerHTML="最多项目";
			sortMenuBoxC[0].children[6].children[0].innerHTML="最少项目";
			gsort="best%20match";
			gorder="desc";
			sortMenuButt.innerHTML="最相符";
		};
		searchF();
	};
};
c.addEventListener("blur",function(e){
	var evt=e||event;
	var etg=evt.target;
	if(etg.nodeName=="INPUT"||etg.nodeName=="SELECT"){
		if(gq!==""){
			console.log('gq!==""');
			var gqS=gq.split("+");
			for(i=0;i<gqS.length;i++){
				if(gqS[i].match(etg.getAttribute('name'))!==null){
					console.log('match!==null');
					if(etg.value!==""){
						gq=gq.replace(gqS[i],etg.getAttribute("name")+etg.value);
					}else{
						gq=gq.replace("+"+gqS[i],"");
						console.log(gq);
					};
					break;
				}else{
					console.log('match==null');
					if(etg.value!==""&&i==gqS.length-1){
						gq=gq+"+"+etg.getAttribute("name")+etg.value;
					}else{
						console.log(etg.value+"/"+i+"/"+gqS.length);
					};
				};
			};
			console.log(gq);
		}else{
			console.log('gq==""');
			if(etg.value!==""){
				gq=gq+"+"+etg.getAttribute("name")+etg.value;
			}else{
				
			};
			console.log(gq);
		};
	};
},true);
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
addLoadEvent(getSearchValue);