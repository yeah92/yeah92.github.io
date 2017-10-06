var userbutt=document.getElementById("userbutt");
function openUserIndex(e){
	var evt=e||event;
	var etg=evt.target;
	if(etg==undefined||etg==null||etg==""){
		var userIndex="userIndex.html?="+this.getAttribute("name");
	}else{
		var userIndex="userIndex.html?="+etg.getAttribute("name");
	};
	window.open(userIndex);
};
var h=document.getElementById("h");
h.onclick=function(e){
	var evt=e||event;
	var etg=evt.target;
	if(etg.nodeName=="TD"){
		if(etg.innerText=="你的文件"){
			var userIndex="userIndex.html?="+userbutt.innerText+"?=indexType:repo";
			window.open(userIndex);
		};
		if(etg.innerText=="你的收藏"){
			var userIndex="userIndex.html?="+userbutt.innerText+"?=indexType:star";
			window.open(userIndex);
		};
		if(etg.innerText=="退出账号"){
			localStorage.clear();
			console.log("clear");
		};
	};
};