var to="6f29e41b100c55643afb581eca2025ae798f5f10";
var linktime=new Date();
var noticeContent=document.getElementById("noticeContent");
var noticeRepositoryTabBox=document.getElementById("noticeRepositoryBoxTab");
var noticeRepositoryTabBoxChild=noticeRepositoryTabBox.children;
var tab1=document.getElementById("tab1").children;
function noticeManageGetNotice(){
	var request=getHTTPObject();
	if (request){
		//var to=document.getElementById("t").value;
		request.open("GET",tolink,true);
		request.onreadystatechange=function(){
			if(request.readyState==4){
				var ntxt=JSON.parse(request.responseText);
				console.log(ntxt);
				if(ntxt.length==0){
					// var noticeContent=document.getElementById("noticeContent");
					noticeContent.innerHTML="你没有收到信息";
					return;
				};
				//以下是写出内容
				var arrayLength=ntxt.length;
				for(var a=0;a<arrayLength;a++){
					// var noticeContent=document.getElementById("noticeContent");
					// 生成各个项目分类消息的容器
					var rId=ntxt[a].repository.id;
					var noticeRepository=document.createElement("div");
					noticeRepository.setAttribute("name",rId);
					// 容器内的项目的标签
					var noticeContentChild=noticeContent.children;
					if(noticeContentChild.length==0){
						noticeContent.appendChild(noticeRepository);
						var noticeRepositoryT=document.createElement("div");
						noticeRepositoryT.innerHTML=ntxt[a].repository.full_name;
						noticeRepositoryT.style.borderStyle="solid";
						noticeRepositoryT.style.borderWidths="4px";
						noticeRepositoryT.style.fontSize="24px";
						noticeRepositoryT.style.textAlign="center";
						noticeRepositoryT.style.backgroundColor="yellow";
						noticeRepositoryT.style.cursor="pointer";
						noticeRepository.appendChild(noticeRepositoryT);
					}else{
						for(i=0;i<noticeContentChild.length;i++){
							if(noticeContentChild[i].getAttribute("name")==rId){
								break;
							}else{
								if(i==(noticeContentChild.length-1)){
									noticeContent.appendChild(noticeRepository);
									var noticeRepositoryT=document.createElement("div");
									noticeRepositoryT.innerHTML=ntxt[a].repository.full_name;
									noticeRepositoryT.style.borderStyle="solid";
									noticeRepositoryT.style.borderWidths="4px";
									noticeRepositoryT.style.fontSize="24px";
									noticeRepositoryT.style.textAlign="center";
									noticeRepositoryT.style.backgroundColor="yellow";
									noticeRepositoryT.style.cursor="pointer";
									noticeRepository.appendChild(noticeRepositoryT);
								};
							};
						};
					};
					// 生成单个消息的容器
					var trNotice=document.createElement("table");
					trNotice.style.borderColor="black";
					trNotice.style.borderStyle="solid";
					trNotice.style.fontSize="24px";
					// 生成消息容器内的标题容器
					var trTitle=document.createElement("tr");
					var tdTitle=document.createElement("td");
					// 写入标题并把标题容器接入消息容器
					tdTitle.innerHTML=ntxt[a].subject.title;
					console.log(tdTitle);
					// tdTitle.style.cursor="pointer";
					tdTitle.style.borderStyle="solid";
					tdTitle.style.borderWidths="2px";
					// tdTitle.setAttribute("colspan","3");
					trTitle.appendChild(tdTitle);
					trNotice.appendChild(trTitle);
					// 将消息容器接入页面容器
					var noticeRepositoryG=document.getElementsByName(rId);
					noticeRepositoryG[0].appendChild(trNotice);
					var subjectURL=ntxt[a].subject.url+"?access_token="+to+"&t="+linktime;
					var subjectCURL=ntxt[a].subject.url+"/comments?access_token="+to+"&t="+linktime;
					// 处理Id生成
					var str=ntxt[a].subject.url;
					var reg1=new RegExp('\/','g');
					var reg2=new RegExp('\:','g');
					var reg3=new RegExp('\[.]','g');
					var str1=str.replace(reg1,"1");
					var str2=str1.replace(reg2,"1");
					// 更新时间和评论人的容器Id
					var str3=str2.replace(reg3,"1");
					// 主题作者的容器Id
					var str4=str3.replace(/1/g,"0");
					// 生成主题作者的容器
					var userLB=document.createElement("tr");
					// 设置主题作者的容器的Id
					userLB.setAttribute('id',str4);
					// 生成更新时间和评论人的容器
					var trTNC=document.createElement("tr");
					// 设置更新时间和评论人的容器的Id
					trTNC.setAttribute('id',str3);
					// 生成更新时间容器并设置其样式
					var tdTime=document.createElement("td");
					tdTime.style.backgroundColor="grey";
					tdTime.style.borderStyle='solid';
					tdTime.style.borderWidths="2px";
					// 为更新时间容器写入内容
					tdTime.innerHTML='最后回复于：'+ntxt[a].updated_at;
					// 将更新时间和评论人的容器逐步接入页面
					trTNC.appendChild(tdTime);
					trNotice.appendChild(userLB);
					trNotice.appendChild(trTNC);
					// 通过接口读取主题作者，把主题作者写入容器
					if(ntxt[a].subject.type=="PullRequest"){
						function loadsubjectURL(){
							var request=getHTTPObject();
							if (request){
								request.open("GET",subjectURL,true);
								request.onreadystatechange=function(){
									if(request.readyState==4){
										var untxt=JSON.parse(request.responseText);
										var uArrayLength=untxt.length;
										if(uArrayLength==0){
											console.log(uArrayLength);
										}else{
											// 生成主题作者内容
											var userLogin=document.createElement("td");
											userLogin.innerHTML=untxt.user.login;
											userLogin.style.backgroundColor='black';
											userLogin.style.color='yellow';
											userLogin.style.cursor="pointer";
											// 将接口化为Id格式
											var str=untxt.url;
											var reg1=new RegExp('\/','g');
											var reg2=new RegExp('\:','g');
											var reg3=new RegExp('\[.]','g');
											var str1=str.replace(reg1,"1");
											var str2=str1.replace(reg2,"1");
											var str3=str2.replace(reg3,"1");
											var str4=str3.replace(/1/g,"0");
											// 与之前生成的主题作者容器通过Id匹配并接入
											var userLB=document.getElementById(str4);
											userLB.appendChild(userLogin);
											// 评论人写入
											var subjectRCURL=untxt.review_comments_url+"?access_token="+to+"&t="+linktime;
											var subjectCURL=untxt.comments_url+"?access_token="+to+"&t="+linktime;
											function loadsubjectRCURL(){
												var request=getHTTPObject();
												if (request){
													request.open("GET",subjectRCURL,true);
													// console.log(subjectCURL);
													request.onreadystatechange=function(){
														if(request.readyState==4){
															var cntxt=JSON.parse(request.responseText);
															var cArrayLength=cntxt.length;
															if(cArrayLength==0){
																;
															}else{
																for(var b=0;b<cArrayLength;b++){
																	// 生成评论人容器并根据评论人名称设置Id
																	var ctdCommenter=document.createElement("td");
																	// cid就是评论人容器的Id
																	var cid=cntxt[b].user.login;
																	ctdCommenter.setAttribute('name',cid);
																	// 根据接口地址生成Id并进行匹配
																	var str=cntxt[b].issue_url||cntxt[b].pull_request_url;
																	// if(str==null){
																		// str=cntxt[b].pull_request_url;
																	// };
																	console.log(str);
																	var reg1=new RegExp('\/','g');
																	var reg2=new RegExp('\:','g');
																	var reg3=new RegExp('\[.]','g');
																	var str1=str.replace(reg1,"1");
																	var str2=str1.replace(reg2,"1");
																	var str3=str2.replace(reg3,"1");
																	var cntrTNC=document.getElementById(str3);
																	// 把评论人写入评论人容器并接入页面
																	var cntrChild=cntrTNC.children;
																	for(d=0;d<cntrChild.length;d++){
																		if(cntrChild[d].getAttribute('name')==cid){
																			break;
																		}else{
																			if(d==(cntrChild.length-1)){
																				cntrTNC.appendChild(ctdCommenter);
																				ctdCommenter.style.backgroundColor="grey";
																				ctdCommenter.style.padding="0px";
																				ctdCommenter.style.margin="0px";
																				ctdCommenter.style.cursor="pointer";
																				ctdCommenter.innerHTML=cntxt[b].user.login;
																			};
																		};
																	};
																};
															};
														};
													};
													request.send(null);											
												};
											};
											loadsubjectCURL();
											function loadsubjectCURL(){
												var request=getHTTPObject();
												if (request){
													request.open("GET",subjectCURL,true);
													// console.log(subjectCURL);
													request.onreadystatechange=function(){
														if(request.readyState==4){
															var cntxt=JSON.parse(request.responseText);
															var cArrayLength=cntxt.length;
															if(cArrayLength==0){
																;
															}else{
																for(var b=0;b<cArrayLength;b++){
																	// 生成评论人容器并根据评论人名称设置Id
																	var ctdCommenter=document.createElement("td");
																	// cid就是评论人容器的Id
																	var cid=cntxt[b].user.login;
																	ctdCommenter.setAttribute('name',cid);
																	// 根据接口地址生成Id并进行匹配
																	var str=cntxt[b].issue_url||cntxt[b].pull_request_url;
																	// if(str==null){
																		// str=cntxt[b].pull_request_url;
																	// };
																	console.log(str);
																	var reg1=new RegExp('\/','g');
																	var reg2=new RegExp('\:','g');
																	var regi=new RegExp('issues','g')
																	var reg3=new RegExp('\[.]','g');
																	var str1=str.replace(reg1,"1");
																	var str2=str1.replace(reg2,"1");
																	var stri=str2.replace(regi,"pulls");
																	var str3=stri.replace(reg3,"1");
																	var cntrTNC=document.getElementById(str3);
																	// 把评论人写入评论人容器并接入页面
																	var cntrChild=cntrTNC.children;
																	for(d=0;d<cntrChild.length;d++){
																		if(cntrChild[d].getAttribute('name')==cid){
																			break;
																		}else{
																			if(d==(cntrChild.length-1)){
																				cntrTNC.appendChild(ctdCommenter);
																				ctdCommenter.style.backgroundColor="grey";
																				ctdCommenter.style.padding="0px";
																				ctdCommenter.style.margin="0px";
																				ctdCommenter.style.cursor="pointer";
																				ctdCommenter.innerHTML=cntxt[b].user.login;
																			};
																		};
																	};
																};
															};
														};
													};
													request.send(null);											
												};
											};
											loadsubjectCURL();
										};
									};
								};
								request.send(null);											
							};
						};
						loadsubjectURL();
					}else{
						function loadsubjectURL(){
							var request=getHTTPObject();
							if (request){
								request.open("GET",subjectURL,true);
								request.onreadystatechange=function(){
									if(request.readyState==4){
										var untxt=JSON.parse(request.responseText);
										var uArrayLength=untxt.length;
										if(uArrayLength==0){
											console.log(uArrayLength);
										}else{
											// 生成主题作者内容
											var userLogin=document.createElement("td");
											userLogin.innerHTML=untxt.user.login;
											userLogin.style.backgroundColor='black';
											userLogin.style.color='yellow';
											userLogin.style.cursor="pointer";
											// 将接口化为Id格式
											var str=untxt.url;
											var reg1=new RegExp('\/','g');
											var reg2=new RegExp('\:','g');
											var reg3=new RegExp('\[.]','g');
											var str1=str.replace(reg1,"1");
											var str2=str1.replace(reg2,"1");
											var str3=str2.replace(reg3,"1");
											var str4=str3.replace(/1/g,"0");
											// 与之前生成的主题作者容器通过Id匹配并接入
											var userLB=document.getElementById(str4);
											userLB.appendChild(userLogin);
										};
									};
								};
								request.send(null);											
							};
						};
						loadsubjectURL();
						// 通过接口读取评论人并写入容器
						function loadsubjectCURL(){
							var request=getHTTPObject();
							if (request){
								request.open("GET",subjectCURL,true);
								// console.log(subjectCURL);
								request.onreadystatechange=function(){
									if(request.readyState==4){
										var cntxt=JSON.parse(request.responseText);
										var cArrayLength=cntxt.length;
										if(cArrayLength==0){
											;
										}else{
											for(var b=0;b<cArrayLength;b++){
												// 生成评论人容器并根据评论人名称设置Id
												var ctdCommenter=document.createElement("td");
												// cid就是评论人容器的Id
												var cid=cntxt[b].user.login;
												ctdCommenter.setAttribute('name',cid);
												// 根据接口地址生成Id并进行匹配
												var str=cntxt[b].issue_url||cntxt[b].pull_request_url;
												// if(str==null){
													// str=cntxt[b].pull_request_url;
												// };
												console.log(str);
												var reg1=new RegExp('\/','g');
												var reg2=new RegExp('\:','g');
												var reg3=new RegExp('\[.]','g');
												var str1=str.replace(reg1,"1");
												var str2=str1.replace(reg2,"1");
												var str3=str2.replace(reg3,"1");
												var cntrTNC=document.getElementById(str3);
												// 把评论人写入评论人容器并接入页面
												var cntrChild=cntrTNC.children;
												for(d=0;d<cntrChild.length;d++){
													if(cntrChild[d].getAttribute('name')==cid){
														break;
													}else{
														if(d==(cntrChild.length-1)){
															cntrTNC.appendChild(ctdCommenter);
															ctdCommenter.style.backgroundColor="grey";
															ctdCommenter.style.padding="0px";
															ctdCommenter.style.margin="0px";
															ctdCommenter.style.cursor="pointer";
															ctdCommenter.innerHTML=cntxt[b].user.login;
														};
													};
												};
											};
										};
									};
								};
								request.send(null);											
							};
						};
						loadsubjectCURL();
					};
				};
			};
		};
		request.send(null);
	}
	else{
		alert('Sorry,your browser doesn\'t support XMLHttpRequest');
	};
};
function noticeGetTab(){
	var request=getHTTPObject();
	if (request){
		//var to=document.getElementById("t").value;
		request.open("GET",tolink,true);
		request.onreadystatechange=function(){
			if(request.readyState==4){
				var ntxt=JSON.parse(request.responseText);
				console.log(ntxt);
				var arrayLength=ntxt.length;
				for(var a=0;a<arrayLength;a++){
					var noticeContent=document.getElementById("noticeContent");
					console.log()
					// 生成各个项目分类消息的容器
					var tId=ntxt[a].repository.full_name;
					var noticeRT=document.createElement("td");
					if(noticeRepositoryTabBoxChild.length==0){
						noticeRepositoryTabBox.appendChild(noticeRT);
					}else{
						for(i=0;i<noticeRepositoryTabBoxChild.length;i++){
							if(noticeRepositoryTabBoxChild[i].getAttribute("name")==tId){
								break;
							}else{
								if(i==(noticeRepositoryTabBoxChild.length-1)){
									noticeRepositoryTabBox.appendChild(noticeRT);
									noticeRT.setAttribute("name",tId);
									noticeRT.innerHTML=ntxt[a].repository.full_name;
									noticeRT.style.borderStyle="solid";
									noticeRT.style.borderWidths="4px";
									noticeRT.style.fontSize="18px";
									noticeRT.style.backgroundColor="yellow";
									noticeRT.style.cursor="pointer";
									noticeRT.addEventListener("click",changeToTabNotice);
									noticeRT.addEventListener("mouseover",changeTabYellow1);
									noticeRT.addEventListener("mouseout",changeTabYellow2);
								};
							};
						};
					};
				};
			};
		};
		request.send(null);
	};
};
var unReadButt=document.getElementById("unReadNotice");
var allButt=document.getElementById("allNotice");
var aboutButt=document.getElementById("aboutMe");
function changeToUnread(){
	// var noticeContent=document.getElementById("noticeContent");
	noticeRepositoryTabBox.innerHTML='';
	noticeContent.innerHTML='';
	noticeSearchButt.innerHTML="搜索未读信息";
	unReadButt.style.fontWeight="bold";
	unReadButt.style.backgroundColor="black";
	// colorChangeBlack();
	tolink="https://api.github.com/notifications?access_token="+to+"&t="+linktime;
	noticeGetTab();
	noticeManageGetNotice();
};
function changeToAll(){
	noticeRepositoryTabBox.innerHTML='';
	noticeContent.innerHTML='';
	noticeSearchButt.innerHTML="搜索所有信息";
	tolink="https://api.github.com/notifications?access_token="+to+"&all=true"+"&t="+linktime;
	noticeGetTab();
	noticeManageGetNotice();
};
function changeToParticipating(){
	noticeRepositoryTabBox.innerHTML='';
	noticeContent.innerHTML='';
	noticeSearchButt.innerHTML="搜索和我有关的信息";
	tolink="https://api.github.com/notifications?access_token="+to+"&participating=true"+"&t="+linktime;
	noticeGetTab();
	noticeManageGetNotice();
};
function colorChangeBlack(){
	for (i=0;i<tab1.length;i++){
		tab1[i].style.backgroundColor="grey";
		tab1[i].style.fontWeight="normal";
		this.style.fontWeight="bold";
		this.style.backgroundColor="black";
	};
};
function colorChangeGrey1(){
	for (i=0;i<tab1.length;i++){
		if(tab1[i].style.fontWeight!="bold"){
			tab1[i].style.backgroundColor="grey";
		};
		this.style.backgroundColor="black";
	};
};
function colorChangeGrey2(){
	for (i=0;i<tab1.length;i++){
		if(tab1[i].style.fontWeight!="bold"){
			tab1[i].style.backgroundColor="grey";
		};
	};
};
function changeToTabNotice(){
	noticeContent.innerHTML='';
	noticeSearchButt.innerHTML="搜索"+this.innerText+"的信息";
	tolink="https://api.github.com/repos/"+this.innerText+"/notifications?access_token="+to+"&all=true"+"&t="+linktime;
	noticeManageGetNotice();
	changeTabGrey(this);
};
function changeTabGrey(x){
	for(i=0;i<noticeRepositoryTabBoxChild.length;i++){
		noticeRepositoryTabBoxChild[i].style.backgroundColor="yellow";
	};
	x.style.backgroundColor="grey";
	x.style.fontWeight="bold";
};
function changeTabYellow1(){
	for(i=0;i<noticeRepositoryTabBoxChild.length;i++){
		if(noticeRepositoryTabBoxChild[i].style.fontWeight!="bold"){
			noticeRepositoryTabBoxChild[i].style.backgroundColor="yellow";			
		};
		this.style.backgroundColor="grey";
	};
};
function changeTabYellow2(){
	for(i=0;i<noticeRepositoryTabBoxChild.length;i++){
		if(noticeRepositoryTabBoxChild[i].style.fontWeight!="bold"){
			noticeRepositoryTabBoxChild[i].style.backgroundColor="yellow";			
		};
	};
};
function changeGetNoticeContent(){
	for(i=0;i<tab1.length;i++){
		tab1[i].addEventListener("click",colorChangeBlack);
		tab1[i].addEventListener("mouseover",colorChangeGrey1);
		tab1[i].addEventListener("mouseout",colorChangeGrey2);
	};
	unReadButt.addEventListener("click",changeToUnread);
	allButt.addEventListener("click",changeToAll);
	aboutButt.addEventListener("click",changeToParticipating);
};
addLoadEvent(changeToUnread);
addLoadEvent(changeGetNoticeContent);