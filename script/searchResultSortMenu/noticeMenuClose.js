function menuClose(x,z){
	var menuBox=document.getElementById(x);
	var nMBOH=menuBox.offsetHeight;
	if(nMBOH<=0){
		clearInterval(iNMC);
	}
	else{
		var hspeed=Math.floor(nMBOH/16)+1;
		var nM=document.getElementsByClassName(z);
		for (var i=0;i<nM.length;i++){
			nM[i].style.fontSize=Math.floor(nMBOH/80)+'px';
			nM[i].style.margin="0px";
		};
		menuBox.style.height=(nMBOH-hspeed)+'px';
		menuBox.style.borderCollapse="collapse";
	};
};
function iNMC(){
	iNMC=setInterval("menuClose()",30);
};
function stopINMC(){
	clearInterval(iNMC);
};