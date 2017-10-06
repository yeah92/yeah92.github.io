var to=localStorage.to;
var linktime=new Date();
var searchResultContent=document.getElementById("searchResultContent");
var resultCount=document.getElementById("resultCount");
var cptr=document.getElementById("cptr");
var gq="";
var gsort="best%20match";
var	gorder="desc";
var gppage="10";
var gpage="1";
// var sRRC=document.getElementById("sRRC");
// var sRCodeC=document.getElementById("sRCodeC");
// var sRCommitsC=document.getElementById("sRCommitsC");
// var sRRC=document.getElementById("sRRC");
// var sRRC=document.getElementById("sRRC");
// var sRRC=document.getElementById("sRRC");
// var searchApi=https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc&access_token=6f29e41b100c55643afb581eca2025ae798f5f10;
function search(a,q,sort,order,ppage,page,id){
	var request=getHTTPObject();
	if (request){
		var searchApi="https://api.github.com/search/"+a+"?q="+q+"&sort="+sort+"&order="+order+"&per_page="+ppage+"&page="+page+"&utf-8=true"+"?access_token="+to+"&t="+linktime;
		console.log(searchApi);
		//var to=document.getElementById("t").value;
		request.open("GET",searchApi,true);
		request.onreadystatechange=function(){
			if(request.readyState==4){
				var ntxt=JSON.parse(request.responseText);
				console.log(ntxt);
				var countBox=document.getElementById(id);
				var searchRTBStrName=document.getElementById("searchRTBStr").getAttribute("name");
				countBox.innerHTML="";
				if(ntxt.total_count>1000){
					if(ntxt.total_count>1000000){
						var ntc=new Number(ntxt.total_count/1000000);
						countBox.innerHTML=ntc.toFixed(1)+"M";
					}else{
						var ntc=new Number(ntxt.total_count/1000);
						countBox.innerHTML=ntc.toFixed(1)+"K";
					};
				}else{
					countBox.innerHTML=ntxt.total_count;
				};
				if(a==searchRTBStrName){
					searchResultContent.innerHTML="";
					console.log(searchResultContent);
					if(a=='repositories'){
						resultCount.innerHTML="项目";
						var rcspan=document.createElement("span");
						resultCount.appendChild(rcspan);
						rcspan.innerHTML=ntxt.total_count;
						var ni=ntxt.items;
						if(ni.length>0){
							for(i=0;i<ni.length;i++){
								var table=document.createElement("table");
								var tr1=document.createElement("tr");
								var tr2=document.createElement("tr");
								var tr3=document.createElement("tr");
								var td1=document.createElement("td");
								var td2=document.createElement("td");
								var td3=document.createElement("td");
								var td4=document.createElement("td");
								var td5=document.createElement("td");
								searchResultContent.appendChild(table);
								table.appendChild(tr1);
								table.appendChild(tr2);
								table.appendChild(tr3);
								tr1.appendChild(td1);
								tr1.appendChild(td2);
								tr1.appendChild(td3);
								tr2.appendChild(td4);
								tr3.appendChild(td5);
								table.className='searchResultRepoTable';
								td1.className='searchResultRepoTd1';
								td2.className='searchResultRepoTd2';
								td3.className='searchResultRepoTd3';
								td4.className='searchResultRepoTd4';
								td5.className='searchResultRepoTd5';
								td1.innerHTML=ni[i].full_name;
								td1.setAttribute("name",ni[i].full_name);
								td1.onclick=openRepo;
								td2.innerHTML=ni[i].language;
								if(ni[i].stargazers_count>1000){
									if(ni[i].stargazers_count>1000000){
										var nc=new Number(ni[i].stargazers_count/1000000);
										td3.innerHTML=nc.toFixed(1)+"M";
									}else{
										var nc=new Number(ni[i].stargazers_count/1000);
										td3.innerHTML=nc.toFixed(1)+"K";
									};
								}else{
									td3.innerHTML=ni[i].stargazers_count;
								};
								td4.innerHTML=ni[i].description;
								td5.innerHTML=ni[i].updated_at;
							};
						}else{
							searchResultContent.innerHTML="没有找到相关结果";
						};
					};
					if(a=='issues'){
						resultCount.innerHTML="事件";
						var rcspan=document.createElement("span");
						resultCount.appendChild(rcspan);
						rcspan.innerHTML=ntxt.total_count;
						var ni=ntxt.items;
						console.log(ni);
						if(ni.length>0){
							for(i=0;i<ni.length;i++){
								var table=document.createElement("table");
								var tr1=document.createElement("tr");
								var tr2=document.createElement("tr");
								var tr3=document.createElement("tr");
								var td1=document.createElement("td");
								var td2=document.createElement("td");
								var td3=document.createElement("td");
								var td4=document.createElement("td");
								var td5=document.createElement("td");
								searchResultContent.appendChild(table);
								table.appendChild(tr1);
								table.appendChild(tr2);
								table.appendChild(tr3);
								tr1.appendChild(td1);
								tr1.appendChild(td2);
								tr2.appendChild(td3);
								tr3.appendChild(td4);
								tr3.appendChild(td5);
								table.className='searchResultIsTable';
								td1.className='searchResultIsTd1';
								td2.className='searchResultIsTd2';
								td3.className='searchResultIsTd3';
								td4.className='searchResultIsTd4';
								td5.className='searchResultIsTd5';
								td1.innerHTML=ni[i].title;
								var uExp1=new RegExp;
								uExp1=/\b\d+/;
								td2.innerHTML="#"+uExp1.exec(ni[i].url)[0];
								td3.innerHTML=ni[i].body;
								td3.setAttribute("colspan","2");
								var uExp2=new RegExp('https://api.github.com/repos/','g');
								var uExp3=new RegExp('.*(?=/issues/)','g');
								td4.innerHTML=ni[i].url.replace(uExp2,"").match(uExp3)[0];
								td1.setAttribute("name",ni[i].url.replace(uExp2,"").match(uExp3)[0]+"&ref=&in="+uExp1.exec(ni[i].url)[0]);
								td1.onclick=openRepo;
								td4.setAttribute("name",ni[i].url.replace(uExp2,"").match(uExp3)[0]);
								td4.onclick=openRepo;
								var ut=ni[i].updated_at;
								console.log(ut);
								var reg=new RegExp("-|T|:","g");
								var ut1=ut.replace(reg,",");
								var ut2=ut1.replace("Z",",0");
								var ut3=ut2.split(",");
								console.log(ut3);
								var utt=new Date();
								utt.setUTCFullYear(ut3[0],ut3[1]-1,ut3[2]);
								utt.setUTCHours(ut3[3],ut3[4],ut3[5]);
								console.log(utt);
								// var lTime=new Date(utt.getTime()-countTime*60000);
								// console.log(lTime);
								var ago=linktime.getTime()-utt.getTime();
								if(ago>86400000){
									td5.innerHTML="于"+Math.floor(ago/86400000)+"天前由"+"<a href='userIndex.html?="+ni[i].user.login+"'>"+ni[i].user.login+"</a>"+"更新";
								}else{
									if(ago>3600000){
										td5.innerHTML="于"+Math.floor(ago/3600000)+"小时前由"+"<a href='userIndex.html?="+ni[i].user.login+"'>"+ni[i].user.login+"</a>"+"更新";
									}else{
										if(ago>60000){
											td5.innerHTML="于"+Math.floor(ago/60000)+"分钟前由"+"<a href='userIndex.html?="+ni[i].user.login+"'>"+ni[i].user.login+"</a>"+"更新";
										}else{
											if(ago>1000){
												td5.innerHTML="于"+Math.floor(ago/1000)+"秒前由"+"<a href='userIndex.html?="+ni[i].user.login+"'>"+ni[i].user.login+"</a>"+"更新";
											}else{
												td5.innerHTML="肛肛由"+"<a href='userIndex.html?="+ni[i].user.login+"'>"+ni[i].user.login+"</a>"+"更新";
											};
										};
									};
								};
								if(utt.getHours()>12){
									td5.setAttribute("title",(utt.getFullYear()+"年"+(utt.getMonth()+1)+"月"+utt.getDate()+"日"+" 下午"+(utt.getHours()-12)+"时"+utt.getMinutes()+"分"));
								}else{
									td5.setAttribute("title",(utt.getFullYear()+"年"+(utt.getMonth()+1)+"月"+utt.getDate()+"日"+" 上午"+utt.getHours()+"时"+utt.getMinutes()+"分"))
								};
							};
						}else{
							searchResultContent.innerHTML="没有找到相关结果";
						};
					};
					if(a=='users'){
						resultCount.innerHTML="用户";
						var rcspan=document.createElement("span");
						resultCount.appendChild(rcspan);
						rcspan.innerHTML=ntxt.total_count;
						var ni=ntxt.items;
						if(ni.length>0){
							for(i=0;i<ni.length;i++){
								var table=document.createElement("table");
								var tr1=document.createElement("tr");
								var tr2=document.createElement("tr");
								var td1=document.createElement("td");
								var img1=document.createElement("img");
								var td2=document.createElement("td");
								var td3=document.createElement("td");
								// var td4=document.createElement("td");
								var td5=document.createElement("td");
								searchResultContent.appendChild(table);
								table.appendChild(tr1);
								table.appendChild(tr2);
								tr1.appendChild(td1);
								tr1.appendChild(td2);
								tr1.appendChild(td3);
								// tr2.appendChild(td4);
								tr2.appendChild(td5);
								table.className='searchResultUsTable';
								td1.className='searchResultUsTd1';
								td2.className='searchResultUsTd2';
								td3.className='searchResultUsTd3';
								// td4.className='searchResultUsTd4';
								td5.className='searchResultUsTd5';
								td5.setAttribute("colspan","2");
								td1.setAttribute("rowspan","2");
								td1.appendChild(img1);
								td1.setAttribute("name",ni[i].login);
								td1.onclick=openUserIndex;
								img1.setAttribute("src",ni[i].avatar_url);
								img1.className="userImg";
								td2.innerHTML=ni[i].login;
								td2.setAttribute("name",ni[i].login);
								td2.onclick=openUserIndex;
								td3.setAttribute("name",ni[i].login);
								ifFollow(td3);
								var bUrl=ni[i].url;
								td5.setAttribute("id",ni[i].id);
								function getBUrl(){
									var request=getHTTPObject();
									if (request){
										var gbUrl=bUrl+"?access_token="+to+"&t="+linktime;
										//var to=document.getElementById("t").value;
										request.open("GET",gbUrl,true);
										request.onreadystatechange=function(){
											if(request.readyState==4){
												var ntxt=JSON.parse(request.responseText);
												console.log(ntxt);
												var iTd5=document.getElementById(ntxt.id);
												iTd5.innerHTML=ntxt.bio;
											};
										};
										request.send();
									};
								};
								getBUrl();
							};
						}else{
							searchResultContent.innerHTML="没有找到相关结果";
						};
					};
					// 页码导航
					if(ntxt.total_count>=1000){
						var xPage=Math.ceil(1000/ppage);
					}else{
						var xPage=Math.ceil(ntxt.total_count/ppage);
					};
					cptr.innerHTML="";
					var pPre=document.createElement("td");
					pPre.innerHTML="上页";
					if(page==1){
						pPre.setAttribute("name",1);
						pPre.setAttribute("title","已到达第一页，请点击然后原地传送");
					}else{
						pPre.setAttribute("name",page-1);
						pPre.setAttribute("title","传送到上一页");
					};
					pPre.onclick=function(){
						gpage=this.getAttribute("name");
						search(a,q,sort,order,ppage,gpage,id);
					};
					pPre.style.backgroundColor="rgba(8, 8, 8, 0.7)";
					pPre.style.color="rgba(234, 225, 245, 0.8)";
					cptr.appendChild(pPre);
					var pMintd=document.createElement("td");
					pMintd.innerHTML=1;
					pMintd.setAttribute("name",1);
					pMintd.setAttribute("title","传送到第一页");
					pMintd.onclick=function(){
						gpage=this.getAttribute("name");
						search(a,q,sort,order,ppage,gpage,id);
					};
					pMintd.style.backgroundColor="rgba(8, 8, 8, 0.7)";
					pMintd.style.color="rgba(234, 225, 245, 0.8)";
					cptr.appendChild(pMintd);
					if(page<=5||page>=(xPage-4)){
						if (xPage>=11){
							for(i=1;i<=11;i++){
								if(i>=6){
									if(i==6){
										var pInput=document.createElement("input");
										console.log(pInput);
										pInput.setAttribute("id","pInput");
										pInput.setAttribute("placeholder","传送到第X页");
										pInput.setAttribute("type","text");
										pInput.onkeydown=function(e){
											var evt=e||event;
											if(evt.keyCode==13){
												if(pInput.value==""||pInput.value<1||pInput.value>xPage){
													alert("你没有资格传送到那里！！")
												}else{
													var inputPage=pInput.value;
													search(a,q,sort,order,ppage,inputPage,id);
												};
											};
										};
										cptr.appendChild(pInput);
									}else{
										var ptd=document.createElement("td");
										ptd.innerHTML=(i+parseInt(xPage)-parseInt(11));
										ptd.setAttribute("name",i+parseInt(xPage)-parseInt(11));
										if((i+xPage-11)==page){
											ptd.style.backgroundColor="rgb(102,102,225)";
										};
										cptr.appendChild(ptd);
									};
								}else{
									var ptd=document.createElement("td");
									ptd.innerHTML=i;
									ptd.setAttribute("name",i);
									cptr.appendChild(ptd);
								};
								if(i==page){
									ptd.style.backgroundColor="rgb(102,102,225)";
								};
								ptd.addEventListener("mouseover",mouseOverBlue);
								ptd.onclick=function(){
									gpage=this.getAttribute("name");
									search(a,q,sort,order,ppage,gpage,id);
								};
							};
						}else{
							for(i=1;i<=xPage;i++){
								var ptd=document.createElement("td");
								ptd.innerHTML=i;
								ptd.setAttribute("name",i);
								cptr.appendChild(ptd);
								if(i==page){
									ptd.style.backgroundColor="rgb(102,102,225)";
								};
								ptd.addEventListener("mouseover",mouseOverBlue);
								ptd.onclick=function(){
									gpage=this.getAttribute("name");
									search(a,q,sort,order,ppage,gpage,id);
								};
							};
						};
					}else{
						if (xPage>=11){
							for(i=1;i<=11;i++){
								if(i==6){
									var pInput=document.createElement("input");
									console.log(pInput);
									pInput.setAttribute("id","pInput");
									pInput.setAttribute("placeholder","传送到第X页");
									pInput.setAttribute("type","text");
									pInput.value=(page-6+i);
									pInput.onkeydown=function(e){
											var evt=e||event;
											if(evt.keyCode==13){
												if(pInput.value==""||pInput.value<1||pInput.value>xPage){
													alert("你没有资格传送到那里！！")
												}else{
													var inputPage=pInput.value;
													search(a,q,sort,order,ppage,inputPage,id);
												};
											};
										};
									cptr.appendChild(pInput);
								}else{
									var ptd=document.createElement("td");
									ptd.innerHTML=(parseInt(page)-parseInt(6)+i);
									ptd.setAttribute("name",(parseInt(page)-(6)+i));
									cptr.appendChild(ptd);
								};
								ptd.addEventListener("mouseover",mouseOverBlue);
								ptd.onclick=function(){
									gpage=this.getAttribute("name");
									search(a,q,sort,order,ppage,gpage,id);
								};
							};
						}else{
							for(i=1;i<=11;i++){
								var ptd=document.createElement("td");
								ptd.innerHTML=i;
								ptd.setAttribute("name",i);
								cptr.appendChild(ptd);
								if(i==page){
									ptd.style.backgroundColor="rgb(102,102,225)";
								};
								ptd.addEventListener("mouseover",mouseOverBlue);
								ptd.onclick=function(){
									gpage=this.getAttribute("name");
									search(a,q,sort,order,ppage,gpage,id);
								};
							};
						};
					};
					var pMaxtd=document.createElement("td");
					pMaxtd.innerHTML=xPage;
					pMaxtd.setAttribute("name",xPage);
					pMaxtd.setAttribute("title","传送到最后一页");
					pMaxtd.onclick=function(){
						gpage=this.getAttribute("name");
						search(a,q,sort,order,ppage,gpage,id);
					};
					pMaxtd.style.backgroundColor="rgba(8, 8, 8, 0.7)";
					pMaxtd.style.color="rgba(234, 225, 245, 0.8)";
					cptr.appendChild(pMaxtd);
					var pNext=document.createElement("td");
					pNext.innerHTML="下页";
					if(page==xPage){
						pNext.setAttribute("name",parseInt(xPage)-parseInt(1));
						pNext.setAttribute("title","已到尽头，需要回头是岸");
					}else{
						pNext.setAttribute("name",parseInt(page)+parseInt(1));
						pNext.setAttribute("title","传送到下一页");
					};
					pNext.onclick=function(){
						gpage=this.getAttribute("name");
						search(a,q,sort,order,ppage,gpage,id);
					};
					pNext.style.backgroundColor="rgba(8, 8, 8, 0.7)";
					pNext.style.color="rgba(234, 225, 245, 0.8)";
					cptr.appendChild(pNext);
				};
			};
		};
		if(a=='commits'){
			request.setRequestHeader("X-GitHub-Media-Type","application/vnd.github.cloak-preview");
		};
		request.send();
	};
};
function getQ(e){
	var evt=e||event;
	if(evt){
		
	}
};