function userboxo(){
	var bh=document.getElementById("h");
	var bha=bh.offsetHeight;
	if(bha>=250){
		clearInterval(boxo);
	}else{
		var hspeed=Math.floor((250-bha)/8)+1;
		var lbh=document.getElementsByClassName("b");
		for (var i=0;i<lbh.length;i++){
				lbh[i].style.fontSize=Math.floor((bha+1)/14)+'px';
		};
	};
	bh.style.height=(bha+hspeed)+'px';
	bh.style.borderCollapse="separate";
};
function boxo(){
	boxo=setInterval("userboxo()",30);
};
function stopuserboxopen(){
	clearInterval(boxo);
};