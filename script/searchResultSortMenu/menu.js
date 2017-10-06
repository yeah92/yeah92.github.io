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
var nMButt=document.getElementById("noticeMenuButt");
var nMBox=document.getElementById("noticeMenuBox");
nMButt.addEventListener("mouseover",stopINMC);
nMButt.addEventListener("mouseover",iNMO);
nMButt.addEventListener("mouseout",stopINMO);
nMButt.addEventListener("mouseout",iNMC);
nMBox.addEventListener("mouseover",stopINMC);
nMBox.addEventListener("mouseover",iNMO);
nMBox.addEventListener("mouseout",stopINMO);
nMBox.addEventListener("mouseout",iNMC);