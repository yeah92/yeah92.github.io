var noticeSearchButt=document.getElementById("noticeSearchButt");
var noticeSearchContent=document.getElementById("noticeSearchContent");
function turnText(){
	noticeSearchContent.innerHTML="";
	var noticeContentChild=document.getElementById("noticeContent").children;
	var searchValue=document.getElementById("noticeSearchInput");
	var sv=searchValue.value;
	for(a=0;a<noticeContentChild.length;a++){
		var noticeChildC=noticeContentChild[a].children;
		console.log(noticeChildC);
		for(b=1;b<noticeChildC.length;b++){
			var cctr=noticeChildC[b].getElementsByTagName("tr");
			console.log(cctr);
			for(c=2;c<cctr.length;c++){
				var cctrc=cctr[c].children;
				console.log(cctrc);
				searchRTitle="标题："+cctr[c-2].innerText+"</br>";
				searchRUser="作者："+cctr[c-1].innerText+"/</br>";
				var compareText=cctr[c-2].innerText+'/'+cctr[c-1].innerText;
				var searchRPar="参与人员：";
				if(cctrc.length>1){
					for(d=1;d<cctrc.length;d++){
						searchRPar=searchRPar+"/"+cctrc[d].innerText+"/";
						compareText=(compareText+cctrc[d].innerText+'/');
						console.log(compareText);
					};				
				}else{
					compareText=compareText;
					console.log(compareText);
				};
			};
			var compareResult=compareText.search(sv);
			console.log(compareResult);
			if(compareResult!=(-1)){
				console.log(compareResult);
				var resultBox=document.createElement("table");
				resultBox.style.cursor="pointer";
				resultBox.addEventListener("mouseover",mouseOverBlue);
				resultBox.style.borderStyle="solid";
				resultBox.style.borderColor="black";
				resultBox.style.borderWidths="2px";
				noticeSearchContent.appendChild(resultBox);
				var resultTitle=document.createElement("tr");
				resultTitle.style.fontSize="24px";
				resultTitle.style.fontWeight="bold";
				resultTitle.innerHTML=searchRTitle;
				var resultPar=document.createElement("tr");
				resultPar.style.fontSize="14px";
				var resultU=searchRUser+searchRPar;
				resultPar.innerHTML=resultU;
				console.log(resultPar);
				resultBox.appendChild(resultTitle);
				resultBox.appendChild(resultPar);
			};			
		};
	};
};
noticeSearchButt.addEventListener("click",turnText);
noticeSearchButt.addEventListener("mouseover",mouseOverBlue);