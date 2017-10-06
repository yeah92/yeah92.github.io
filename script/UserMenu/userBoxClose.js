function userboxc(){
	var bh=document.getElementById("h");
	var bha=bh.offsetHeight;
	if(bha<=0){
		clearInterval(boxc);
	}else{
		var hspeed=Math.floor(bha/20)+1;
		var lbh=document.getElementsByClassName("b");
		for (var i=0;i<lbh.length;i++){
				lbh[i].style.fontSize=Math.floor((bha/190))+'px';
		};
		bh.style.height=(bha-hspeed)+'px';
		bh.style.borderCollapse="collapse";
	};
};
function boxc(){
	boxc=setInterval("userboxc()",30);
};
function stopuserboxclose(){
	clearInterval(boxc);
};