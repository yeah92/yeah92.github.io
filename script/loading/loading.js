function loadingANM(){
	var loadingDiv=document.createElement("div");
	var loadingGit=document.createElement("div");
	loadingDiv.className="loadingDiv";
	loadingGit.className="icon-github";
	loadingGit.style.left="calc("+Math.ceil(10+Math.random()*80)+"% - "+Math.random()*90+"px)";
	loadingGit.style.top="calc("+Math.ceil(10+Math.random()*60)+"% - "+Math.random()*90+"px)";
	loadingGit.style.fontSize=(parseInt(60)+Math.random()*120)+"px";
	loadingGit.style.color="rgba("+Math.floor(Math.random()*255)+", "+Math.floor(Math.random()*255)+", "+Math.floor(Math.random()*255)+", "+(0.2+Math.random())+")";
	loadingDiv.style.top=(document.documentElement.scrollTop||document.body.scrollTop)+"px";
	loadingDiv.style.left=(document.documentElement.scrollLeft||document.body.scrollLeft)+"px";
	document.body.appendChild(loadingDiv);
	loadingDiv.appendChild(loadingGit);
};
function deleteANM(){
	var loadingDiv=document.getElementsByClassName("loadingDiv");
	if(loadingDiv.length>0){
		document.body.removeChild(loadingDiv[0]);
	};
};