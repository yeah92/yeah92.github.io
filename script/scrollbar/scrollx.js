var sbyc=document.createElement("div");
sbyc.className="sbyc";
var sby=document.createElement("div");
sby.className="sby";
document.body.appendChild(sbyc);
sbyc.appendChild(sby);
// var sbxc=document.getElementById("sbxc");
// var sbx=document.getElementById("sbx");
function sb(){
	var bst=document.documentElement.scrollTop||document.body.scrollTop;
	var bsl=document.documentElement.scrollLeft||document.body.scrollLeft;
	var bsh=document.documentElement.scrollHeight||document.body.scrollHeight;
	var bsw=document.documentElement.scrollWidth||document.body.scrollWidth;
	if(bsh<=window.innerHeight){
		sbyc.style.display="none";
		sby.style.display="none";
	}else{
		sbyc.style.display="block";
		sby.style.display="block";
		sbyc.style.left=window.innerWidth-6+'px';
		sbyc.style.height=window.innerHeight+'px';
		sbyc.style.width=6+'px';
		sby.style.height=window.innerHeight/bsh*sbyc.offsetHeight+'px';
		sby.style.width=6+'px';
		if(bst<=bsh-window.innerHeight){
			sbyc.style.top=bst+'px';
			sby.style.top=bst/bsh*sbyc.offsetHeight+'px';
		}else{
			sbyc.style.top=bsh-sbyc.offsetHeight+'px';
			sby.style.top=sbyc.offsetHeight-sby.offsetHeight+'px';
		};
		// sby.style.backgroundColor="red";
	};
};
function ms(e){
	var e = e || window.event;  
	if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件               
		if (e.wheelDelta > 0) { //当滑轮向上滚动时  
			this.scrollBy(0,-50);
		}  
		if (e.wheelDelta < 0) { //当滑轮向下滚动时  
			this.scrollBy(0,50);
		}  
	} else if (e.detail) {  //Firefox滑轮事件  
		if (e.detail> 0) { //当滑轮向下滚动时  
			this.scrollBy(0,50);
		}  
		if (e.detail< 0) { //当滑轮向上滚动时  
			this.scrollBy(0,-50);
		}  
	}  
};
function ymsd(evt){
	var bsh=document.documentElement.scrollHeight||document.body.scrollHeight;
	var mevent=evt||event;
	mdy=mevent.clientY;
	window.onmousemove=function(evt){
		var mevent=evt||event;
		mmy=mevent.clientY;
		var yVector=(mmy-mdy)/sbyc.offsetHeight*bsh;
		mdy=mmy;
		var body=document.documentElement||document.body;
		window.scrollBy(0,yVector);
		sb();
		window.onmouseup=function (){
			window.onmousemove=null;
			window.onmouseup=mouseTwo;
		};
	};
};
function mouseTwo(evt){
	var mevent=evt||event;
	mdy=mevent.clientY;
	if (mevent.button==1){
		var bsh=document.documentElement.scrollHeight||document.body.scrollHeight;
		window.onmousemove=function(evt){
			var mevent=evt||event;
			mmy=mevent.clientY;
			var yVector=(mmy-mdy)/sbyc.offsetHeight*bsh;
			mdy=mmy;
			var body=document.documentElement||document.body;
			window.scrollBy(0,yVector);
			sb();
		};
		window.onmouseup=function (){
			window.onmousemove=null;
			window.onmouseup=mouseTwo;
		};
	};
};
function addOnload(x){
	var oldOnload=window.onload;
	if (typeof window.onload !='function'){
		window.onload=x;
	}else{
		window.onload=function(){
			oldOnload();
			x();
		};
	};
};
function addOnresize(x){
	var oldOnresize=window.onresize;
	if (typeof window.onresize !='function'){
		window.onresize=x;
	}else{
		window.onresize=function(){
			oldOnresize();
			x();
		};
	};
};
addOnload(sb);
addOnresize(sb);
window.onmousewheel=function (){
	ms();
	sb();
};
sby.addEventListener("mousedown",ymsd);
document.documentElement.addEventListener('DOMMouseScroll',ms);
document.documentElement.addEventListener('DOMMouseScroll',sb);
window.onmouseup=mouseTwo;