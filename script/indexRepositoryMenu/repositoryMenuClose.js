function rMenuClose(){
	var noticeMenuBox=document.getElementById("noticerepositoryMenuBox");
	var nMBOH=noticeMenuBox.offsetHeight;
	if(nMBOH<=0){
		clearInterval(riNMC);
	}
	else{
		var hspeed=Math.floor(nMBOH/8)+1;
		var nM=document.getElementsByClassName("rM");
		for (var i=0;i<nM.length;i++){
			nM[i].style.borderWidth='0px';
			nM[i].style.fontSize=Math.floor(nMBOH/90)+'px';
		};
		noticeMenuBox.style.height=(nMBOH-hspeed)+'px';
		noticeMenuBox.style.borderCollapse="collapse";
	};
};
function riNMC(){
	riNMC=setInterval("rMenuClose()",30);
};
function stoprINMC(){
	clearInterval(riNMC);
};