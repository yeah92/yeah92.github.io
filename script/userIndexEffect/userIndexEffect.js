var userProfileTab=document.getElementById("userProfileTab");
function mouseOverBlue(){
	var originColor=this.style.backgroundColor;
	this.style.backgroundColor="#6666FF";
	this.addEventListener("mouseout",function(){
		this.style.backgroundColor=originColor;
	});
};
function mouseBlue(){
	originColor=this.style.backgroundColor;
	this.style.backgroundColor="rgb(102, 102, 255)";
	this.onclick=function(){
		for(i=0;i<this.parentNode.children.length;i++){
			this.parentNode.children[i].style.backgroundColor="rgba(245,245,245,0.3)";
		};
		this.style.backgroundColor="rgb(102, 102, 255)";
		originColor="rgb(102, 102, 255)";
	};
	this.onmouseout=function(){
		this.style.backgroundColor=originColor;
	};
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
	noticeMenuButt.addEventListener("mouseover",mouseOverBlue);
	noticeRefresh.addEventListener("mouseover",mouseOverBlue);
	for(i=0;i<noticeMenu.length;i++){
		noticeMenu[i].addEventListener("mouseover",mouseOverBlue);
	};
	for(i=0;i<userProfileTab.children.length;i++){
		userProfileTab.children[i].addEventListener("mouseover",mouseBlue);
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
userProfileTab.onclick=function(e){
	var evt=e||event;
	var etg=evt.target;
	if(etg.nodeName=="DIV"){
		if(etg.getAttribute("name")=="all"){
			userProfileRepo.style.display="block";
			userProfileStar.style.display="block";
			userProfileFollow.style.display="block";
			userProfileFollowing.style.display="block";
		};
		if(etg.getAttribute("name")=="repo"){
			userProfileRepo.style.display="block";
			userProfileStar.style.display="none";
			userProfileFollow.style.display="none";
			userProfileFollowing.style.display="none";
		};
		if(etg.getAttribute("name")=="star"){
			userProfileRepo.style.display="none";
			userProfileStar.style.display="block";
			userProfileFollow.style.display="none";
			userProfileFollowing.style.display="none";
		};
		if(etg.getAttribute("name")=="follower"){
			userProfileRepo.style.display="none";
			userProfileStar.style.display="none";
			userProfileFollow.style.display="block";
			userProfileFollowing.style.display="none";
		};
		if(etg.getAttribute("name")=="following"){
			userProfileRepo.style.display="none";
			userProfileStar.style.display="none";
			userProfileFollow.style.display="none";
			userProfileFollowing.style.display="block";
		};
	};
	if(etg.nodeName=="SPAN"){
		var etgB=etg.parentNode;
		if(etgB.getAttribute("name")=="all"){
			userProfileRepo.style.display="block";
			userProfileStar.style.display="block";
			userProfileFollow.style.display="block";
			userProfileFollowing.style.display="block";
		};
		if(etgB.getAttribute("name")=="repo"){
			userProfileRepo.style.display="block";
			userProfileStar.style.display="none";
			userProfileFollow.style.display="none";
			userProfileFollowing.style.display="none";
		};
		if(etgB.getAttribute("name")=="star"){
			userProfileRepo.style.display="none";
			userProfileStar.style.display="block";
			userProfileFollow.style.display="none";
			userProfileFollowing.style.display="none";
		};
		if(etgB.getAttribute("name")=="follower"){
			userProfileRepo.style.display="none";
			userProfileStar.style.display="none";
			userProfileFollow.style.display="block";
			userProfileFollowing.style.display="none";
		};
		if(etgB.getAttribute("name")=="following"){
			userProfileRepo.style.display="none";
			userProfileStar.style.display="none";
			userProfileFollow.style.display="none";
			userProfileFollowing.style.display="block";
		};
	};
};

if(window.location.href.split("?=")[2]=="indexType:repo"){
	userProfileTab.children[1].style.backgroundColor="rgb(102, 102, 255)";
	userProfileRepo.style.display="block";
	userProfileStar.style.display="none";
	userProfileFollow.style.display="none";
	userProfileFollowing.style.display="none";
};
if(window.location.href.split("?=")[2]=="indexType:star"){
	userProfileTab.children[2].style.backgroundColor="rgb(102, 102, 255)";
	userProfileRepo.style.display="none";
	userProfileStar.style.display="block";
	userProfileFollow.style.display="none";
	userProfileFollowing.style.display="none";
};
if(window.location.href.split("?=")[2]!=="indexType:repo"&&window.location.href.split("?=")[2]!=="indexType:star"){
	userProfileTab.children[0].style.backgroundColor="rgb(102, 102, 255)";
};
addLoadEvent(buttEffect);
divScrollbar("ntsb");