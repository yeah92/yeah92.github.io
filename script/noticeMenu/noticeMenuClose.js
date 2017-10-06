function noticeMenuClose(){
	var noticeMenuBox=document.getElementById("noticeMenuBox");
	var nMBOH=noticeMenuBox.offsetHeight;
	if(nMBOH<=0){
		clearInterval(iNMC);
	}
	else{
		var hspeed=Math.floor(nMBOH/16)+1;
		var nM=document.getElementsByClassName("noticeMenu");
		for (var i=0;i<nM.length;i++){
			nM[i].style.fontSize=Math.floor(nMBOH/80)+'px';
			nM[i].style.margin="0px";
		};
		noticeMenuBox.style.height=(nMBOH-hspeed)+'px';
		noticeMenuBox.style.borderCollapse="collapse";
	};
};
function iNMC(){
	iNMC=setInterval("noticeMenuClose()",30);
};
function stopINMC(){
	clearInterval(iNMC);
};