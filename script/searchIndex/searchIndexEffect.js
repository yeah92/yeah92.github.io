var noticeMenuButt=document.getElementById("noticeMenuButt");
var noticeRefresh=document.getElementById("noticeRefresh");
var noticeMenu=document.getElementsByClassName("noticeMenu");
var b=document.getElementsByClassName("b");
var ps=document.getElementsByClassName("ps");
var chosePageTd=document.getElementById("cptr").children;
var searchRTBStrC=document.getElementById("searchRTBStr").children;
var sortMenuButt=document.getElementById("sortMenuButt");
var sortMenuTd=document.getElementsByClassName("sortMenuTd");
function mouseOverBlue(){
	var originColor=this.style.backgroundColor;
	this.style.backgroundColor="#6666FF";
	this.addEventListener("mouseout",function(){
		this.style.backgroundColor=originColor;
	});
};
function mouseBlue(){
	originColor=this.style.backgroundColor;
	this.style.backgroundColor="rgb(102, 102, 255)";
	this.onclick=function(){
		for(i=0;i<this.parentNode.children.length;i++){
			this.parentNode.children[i].style.backgroundColor="rgba(245,245,245,0.3)";
		};
		this.style.backgroundColor="rgb(102, 102, 255)";
		originColor="rgb(102, 102, 255)";
	};
	this.onmouseout=function(){
		this.style.backgroundColor=originColor;
	};
};
function buttEffect(){
	noticeMenuButt.addEventListener("mouseover",mouseOverBlue);
	noticeRefresh.addEventListener("mouseover",mouseOverBlue);
	for(i=0;i<noticeMenu.length;i++){
		noticeMenu[i].addEventListener("mouseover",mouseOverBlue);
	};
	for(i=0;i<b.length;i++){
		b[i].addEventListener("mouseover",mouseOverBlue);
	};
	for(i=0;i<ps.length;i++){
		ps[i].addEventListener("mouseover",mouseOverBlue);
	};
	// for(i=0;i<chosePageTd.length;i++){
		// chosePageTd[i].addEventListener("mouseover",mouseOverBlue);
	// };
	// chosePageTd被移到search.js内
	for(i=0;i<searchRTBStrC.length;i++){
		searchRTBStrC[i].addEventListener("mouseover",mouseBlue);
	};
	sortMenuButt.addEventListener("mouseover",mouseOverBlue);
	for(i=0;i<sortMenuTd.length;i++){
		sortMenuTd[i].addEventListener("mouseover",mouseOverBlue);
	};
};
buttEffect();
divScrollbar("ntsb");