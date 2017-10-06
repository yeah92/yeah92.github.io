function userboxo(){
	var bh=document.getElementById("h");
	var bha=bh.offsetHeight;
	if(bha>=250){
		clearInterval(boxo);
	};
		var hspeed=Math.floor((250-bha)/8)+1;
		var bhar=bh.style.height;
		var lbh=document.getElementsByClassName("b");
		for (var i=0;i<lbh.length;i++){
			var nbha=((bha-40)/10);
			if (nbha<=0){
				lbh[i].style.height='0px';
				lbh[i].style.fontSize='0px';
			}
			else{
				lbh[i].style.borderWidth='2px';
				lbh[i].style.height=nbha+'px';
				lbh[i].style.fontSize=(nbha-3)+'px';
			};
		};
		bh.style.height=(bha+hspeed)+'px';
};
function userboxopen(){
	var bh=document.getElementById("h");
	var bha=bh.offsetHeight;
	if (bha<250){
		boxo=setInterval("userboxo()",30);
	};
};
function stopuserboxopen(){
	clearInterval(boxo);
};