function openRepo(e){
	var evt=e||event;
	var etg=evt.target;
	if(etg==undefined||etg==null||etg==""){
		var readIndex="readIndex.html?="+this.getAttribute("name");
	}else{
		var readIndex="readIndex.html?="+etg.getAttribute("name");
	};
	window.open(readIndex);
};