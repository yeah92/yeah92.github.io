function menujs(a,x,y,z,o,c,f,t){
	var nMButt=document.getElementById(a);
	var menuBox=document.getElementById(x);
	var nM=document.getElementsByClassName(y);
	var h=z;
	var os=o;
	var cs=c;
	var fs=f;
	var it=t;
	function iNMO(){
		iNMO=setInterval(function menuOpen(){
		var nMBOH=menuBox.offsetHeight;
		if(nMBOH>=h){
			clearInterval(iNMO);
		}
		else{
			var hspeed=Math.floor((h-nMBOH)/os)+1;
			menuBox.style.height=(nMBOH+hspeed)+'px';
			menuBox.style.borderCollapse="separate";
			for (var i=0;i<nM.length;i++){
				nM[i].style.fontSize=Math.floor((nMBOH+1)/fs)+'px';
			};
		};
	},30);
	};
	function stopINMO(){
		clearInterval(iNMO);
	};
	
	function iNMC(){
		iNMC=setInterval(function menuClose(){
		var nMBOH=menuBox.offsetHeight;
		if(nMBOH<=0){
			clearInterval(iNMC);
		}
		else{
			var hspeed=Math.floor(nMBOH/cs)+1;
			menuBox.style.height=(nMBOH-hspeed)+'px';
			menuBox.style.borderCollapse="collapse";
			for (var i=0;i<nM.length;i++){
				nM[i].style.fontSize=0+'px';
				nM[i].style.margin="0px";
			};
		};
	},30);
	};
	function stopINMC(){
		clearInterval(iNMC);
	};
	nMButt.addEventListener("mouseover",stopINMC);
	nMButt.addEventListener("mouseover",iNMO);
	nMButt.addEventListener("mouseout",stopINMO);
	nMButt.addEventListener("mouseout",iNMC);
	menuBox.addEventListener("mouseover",stopINMC);
	menuBox.addEventListener("mouseover",iNMO);
	menuBox.addEventListener("mouseout",stopINMO);
	menuBox.addEventListener("mouseout",iNMC);
};
menujs('sortMenuButt','sortMenuBox','sortMenuTd','163','16','12','11');