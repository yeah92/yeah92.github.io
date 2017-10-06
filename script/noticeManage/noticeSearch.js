var noticeSearchButt=document.getElementById("noticeSearchButt");
var noticeSearchContent=document.getElementById("noticeSearchContent");
var searchValue=document.getElementById("noticeSearchInput");
function turnText(){
	noticeSearchContent.innerHTML="";
	var noticeContentChild=document.getElementById("noticeContent").children;
	var sv=searchValue.value;
	var regSV=new RegExp(sv,'ig');
	for(a=0;a<noticeContentChild.length;a++){
		var noticeChildC=noticeContentChild[a].children;
		for(b=1;b<noticeChildC.length;b++){
			var cctr=noticeChildC[b].getElementsByTagName("tr");
			var compareResultT=cctr[0].innerText.search(regSV);
			var compareResultA=cctr[1].innerText.search(regSV);
			console.log(cctr[2]);
			if(cctr[2].children.length>1){
				for(d=1;d<cctr[2].children.length;d++){
					var compareResultC=cctr[2].children[d].innerText.search(regSV);
				};				
			};
			if(compareResultT>-1||compareResultA>-1||compareResultC>-1){
				var copy=noticeChildC[b].cloneNode(true);
				copy.onclick=function(e){
					var evt=e||event;
					var etg=evt.target;
					if(etg.className=='tdTitle'){
						openRepo();
					};
					if(etg.className=='tdTitle'){
						openRepo();
					};
					if(etg.className=='userLogin'||etg.className=='ctdCommenter'){
						openUserIndex();
					};
				};
				noticeSearchContent.appendChild(copy);
			};	
		};
	};
};
noticeSearchButt.addEventListener("click",turnText);
searchValue.onkeypress=function(e){
	evt=e||event;
	if(evt.keyCode=='13'){
		turnText();
	};
};
noticeSearchButt.addEventListener("mouseover",mouseOverBlue);