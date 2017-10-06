function menuOpen(x,y,z){
	var menuBox=document.getElementById(x);
	var nMBOH=menuBox.offsetHeight;
	if(nMBOH>=y){
		clearInterval(iNMO);
	}
	else{
		var hspeed=Math.floor((y-nMBOH)/10)+1;
		var nM=document.getElementsByClassName("z");
		for (var i=0;i<nM.length;i++){
			nM[i].style.fontSize=Math.floor((nMBOH+1)/8)+'px';
		};
		menuBox.style.height=(nMBOH+hspeed)+'px';
		menuBox.style.borderCollapse="separate";
	};
};
function iNMO(){
	iNMO=setInterval("menuOpen()",30);
};
function stopINMO(){
	clearInterval(iNMO);
};