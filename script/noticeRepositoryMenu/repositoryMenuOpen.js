function noticeRepositoryMenuOpen(){
	var noticeRepositoryMenuBox=document.getElementById("noticerepositoryMenuBox");
	var nRBOH=noticeRepositoryMenuBox.offsetHeight;
	if(nRBOH>=120){
		clearInterval(iNMO);
	}
	else{
		var hspeed=Math.floor((120-nRBOH)/10)+1;
		var rM=document.getElementsByClassName("rM");
		for (var i=0;i<rM.length;i++){
			rM[i].style.borderWidth='4px';
			rM[i].style.fontSize=Math.floor((nRBOH+1)/8)+'px';
		};
		noticeRepositoryMenuBox.style.height=(nRBOH+hspeed)+'px';
	};
};
function iNMO(){
	iNMO=setInterval("noticeRepositoryMenuOpen()",30);
};
function stopINMO(){
	clearInterval(iNMO);
};