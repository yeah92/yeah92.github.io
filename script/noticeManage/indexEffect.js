var noticeTabButt=document.getElementsByClassName("noticeTabButt");
console.log(noticeTabButt);
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
	for(i=0;i<noticeTabButt.length;i++){
		noticeTabButt[i].addEventListener("mouseover",mouseBlue);
	};
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
divScrollbar("noticeSearchContent");