var userbutt=document.getElementById("userbutt");
function openSearchIndex(x){
	var searchIndex="searchIndex.html?="+x.value;
	window.open(searchIndex);
};
var t=document.getElementById("t");
t.onkeydown=function (e){
	var evt=e||event;
	var etg=evt.target;
	if(e.keyCode==13){
		openSearchIndex(etg);
	};
};
var sbox=document.getElementsByClassName("sbox")[0];
sbox.onclick=function (e){
	var evt=e||event;
	var etg=evt.target;
	console.log(etg);
	console.log(etg.innerText);
	if(etg.innerText=="请求"){
		var searchIndex="searchIndex.html?=indexType=is"+"+author:"+userbutt.innerText+"+type:pr+state:open";
		window.open(searchIndex);
	};
	if(etg.innerText=="事件"){
		var searchIndex="searchIndex.html?=indexType=pr"+"+author:"+userbutt.innerText+"+type:issue+state:open";
		window.open(searchIndex);
	};
};