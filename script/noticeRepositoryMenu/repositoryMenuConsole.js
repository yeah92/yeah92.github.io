var rMButt=document.getElementById("noticeRepositoryMenuButt");
var rMBox=document.getElementById("noticerepositoryMenuBox");
var rTBB=document.getElementById("rTB").children[1];
var repositorySearchButt=document.getElementById("repositorySearchButt");
var sInput=document.getElementById("repositorySearchInput");
var b=document.getElementsByClassName("b");
rMButt.addEventListener("mouseover",stopINMC);
rMButt.addEventListener("mouseover",iNMO);
rMButt.addEventListener("mouseout",stopINMO);
rMButt.addEventListener("mouseout",iNMC);
rMBox.addEventListener("mouseover",stopINMC);
rMBox.addEventListener("mouseover",iNMO);
rMBox.addEventListener("mouseout",stopINMO);
rMBox.addEventListener("mouseout",iNMC);
function mouseOverBlue(){
	var originColor=this.style.backgroundColor;
	this.style.backgroundColor="#6666FF";
	this.addEventListener("mouseout",function(){
		this.style.backgroundColor=originColor;
	});
};
function buttEffect(){
	var rM=document.getElementsByClassName("rM");
	for(i=0;i<rM.length;i++){
		rM[i].addEventListener("mouseover",mouseOverBlue);
		rM[i].addEventListener("click",getXUserRepository);
	};
	for(i=0;i<b.length;i++){
		b[i].addEventListener("mouseover",mouseOverBlue);
	};
	rMButt.addEventListener("mouseover",mouseOverBlue);
	rTBB.addEventListener("mouseover",mouseOverBlue);
	rTBB.addEventListener("click",getXUserRepository);
	rTBB.addEventListener("click",getUserContributeRepository);
	// rTBB.addEventListener("click",nMRefreshInput);
	repositorySearchButt.addEventListener("mouseover",mouseOverBlue);
	repositorySearchButt.addEventListener("click",rSearch);
	// repositorySearchButt.addEventListener("click",nMUMRS);
	sInput.onkeyup=rSearch;
	// sInput.onkeydown=nMUMRS;
};
addLoadEvent(buttEffect);