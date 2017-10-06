var notice=document.getElementById("notice");
var contentBox=document.getElementById("contentBox");
function mouseOverBlue(){
	var originColor=this.style.backgroundColor;
	this.style.backgroundColor="#6666FF";
	this.addEventListener("mouseout",function(){
		this.style.backgroundColor=originColor;
	});
};
function buttEffect(){
	var rM=document.getElementsByClassName("rM");
	for(i=0;i<rM.length;i++){
		rM[i].addEventListener("mouseover",mouseOverBlue);
		rM[i].addEventListener("click",getXUserRepository);
	};
	for(i=0;i<b.length;i++){
		b[i].addEventListener("mouseover",mouseOverBlue);
	};
	noticeMenuButt.addEventListener("mouseover",mouseOverBlue);
	noticeRefresh.addEventListener("mouseover",mouseOverBlue);
	for(i=0;i<noticeMenu.length;i++){
		noticeMenu[i].addEventListener("mouseover",mouseOverBlue);
	};
};
addLoadEvent(buttEffect);
// divScrollbar("contentBox");
// divScrollbar("ntsb");