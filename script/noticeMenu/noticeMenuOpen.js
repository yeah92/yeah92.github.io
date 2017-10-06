function noticeMenuOpen(){
	var noticeMenuBox=document.getElementById("noticeMenuBox");
	var nMBOH=noticeMenuBox.offsetHeight;
	if(nMBOH>=108){
		clearInterval(iNMO);
	}
	else{
		var hspeed=Math.floor((108-nMBOH)/10)+1;
		var nM=document.getElementsByClassName("noticeMenu");
		for (var i=0;i<nM.length;i++){
			nM[i].style.fontSize=Math.floor((nMBOH+1)/8)+'px';
		};
		noticeMenuBox.style.height=(nMBOH+hspeed)+'px';
		noticeMenuBox.style.borderCollapse="separate";
	};
};
function iNMO(){
	iNMO=setInterval("noticeMenuOpen()",30);
};
function stopINMO(){
	clearInterval(iNMO);
};