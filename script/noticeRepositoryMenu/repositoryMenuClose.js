function noticeMenuClose(){
	var noticeMenuBox=document.getElementById("noticerepositoryMenuBox");
	var nMBOH=noticeMenuBox.offsetHeight;
	if(nMBOH<=0){
		clearInterval(iNMC);
	}
	else{
		var hspeed=Math.floor(nMBOH/8)+1;
		var nM=document.getElementsByClassName("rM");
		for (var i=0;i<nM.length;i++){
			nM[i].style.borderWidth='0px';
			nM[i].style.fontSize=Math.floor(nMBOH/90)+'px';
		};
		noticeMenuBox.style.height=(nMBOH-hspeed)+'px';
	};
};
function iNMC(){
	iNMC=setInterval("noticeMenuClose()",30);
};
function stopINMC(){
	clearInterval(iNMC);
};