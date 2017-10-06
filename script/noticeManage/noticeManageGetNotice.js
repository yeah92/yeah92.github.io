var to=localStorage.to;
var linktime=new Date();
var gindex=document.getElementById("g");
var noticeContent=document.getElementById("noticeContent");
var noticeRepositoryTabBox=document.getElementById("noticeRepositoryBoxTab");
var noticeRepositoryTabBoxChild=noticeRepositoryTabBox.children;
var tab1=document.getElementById("tab1").children;
var b=document.getElementsByClassName("b");
function mouseBlue(){
	originColor=this.style.backgroundColor;
	this.style.backgroundColor="rgb(102, 102, 255)";
	this.onclick=function(){
		for(i=0;i<this.parentNode.children.length;i++){
			console.log(this.parentNode.children[i]);
			this.parentNode.children[i].style.backgroundColor="rgba(245,245,245,0.3)";
		};
		this.style.backgroundColor="rgb(102, 102, 255)";
		originColor="rgb(102, 102, 255)";
	};
	this.onmouseout=function(){
		this.style.backgroundColor=originColor;
	};
};
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
						noticeRepositoryT.className="noticeRepositoryT";
						noticeRepositoryT.addEventListener("click",changeToTabNotice);
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
									noticeRepositoryT.className="noticeRepositoryT";
									noticeRepositoryT.addEventListener("click",changeToTabNotice);
									noticeRepository.appendChild(noticeRepositoryT);
								};
							};
						};
					};
					// 生成单个消息的容器
					var trNotice=document.createElement("table");
					trNotice.className="singleNotice";
					// 生成消息容器内的标题容器
					var trTitle=document.createElement("tr");
					var tdTitle=document.createElement("td");
					// 写入标题并把标题容器接入消息容器
					tdTitle.innerHTML=ntxt[a].subject.title;
					tdTitle.style.cursor="pointer";
					tdTitle.className="tdTitle";
					tdTitle.setAttribute("colspan","9");
					tdTitle.onclick=openRepo;
					tdTitle.setAttribute("name",ntxt[a].repository.full_name+"&ref=&in="+ntxt[a].subject.url.split("/issues/")[1]);
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
					tdTime.class="tdTime";
					// 为更新时间容器写入内容
					var ut=ntxt[a].updated_at;
					var reg=new RegExp("-|T|:","g");
					var ut1=ut.replace(reg,",");
					var ut2=ut1.replace("Z",",0");
					var ut3=ut2.split(",");
					var utt=new Date();
					utt.setUTCFullYear(ut3[0],ut3[1]-1,ut3[2]);
					utt.setUTCHours(ut3[3],ut3[4],ut3[5]);
					var ago=linktime.getTime()-utt.getTime();
					if(ago>86400000){
						tdTime.innerHTML="发布于"+Math.floor(ago/86400000)+"天前";
					}else{
						if(ago>3600000){
							tdTime.innerHTML="发布于"+Math.floor(ago/3600000)+"小时前";
						}else{
							if(ago>60000){
								tdTime.innerHTML="发布于"+Math.floor(ago/60000)+"分钟前";
							}else{
								if(ago>1000){
									tdTime.innerHTML="发布于"+Math.floor(ago/1000)+"秒前";
								}else{
									tdTime.innerHTML="发布于此时此刻此分此秒";
								};
							};
						};
					};
					if(utt.getHours()>12){
						tdTime.setAttribute("title",(utt.getFullYear()+"年"+(utt.getMonth()+1)+"月"+utt.getDate()+"日"+" 下午"+(utt.getHours()-12)+"时"+utt.getMinutes()+"分"));
					}else{
						tdTime.setAttribute("title",(utt.getFullYear()+"年"+(utt.getMonth()+1)+"月"+utt.getDate()+"日"+" 上午"+utt.getHours()+"时"+utt.getMinutes()+"分"))
					};
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
											userLogin.className="userLogin";
											userLogin.setAttribute("name",untxt.user.login);
											userLogin.onclick=openUserIndex;
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
																				ctdCommenter.className="ctdCommenter";
																				ctdCommenter.onclick=openUserIndex;
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
																				ctdCommenter.className="ctdCommenter";
																				ctdCommenter.onclick=openUserIndex;
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
											console.log(untxt);
											userLogin.innerHTML=untxt.user.login;
											userLogin.className="userLogin";
											userLogin.setAttribute("name",untxt.user.login);
											userLogin.onclick=openUserIndex;
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
															ctdCommenter.className="ctdCommenter";
															ctdCommenter.onclick=openUserIndex;
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
					var noticeRT=document.createElement("td");
					// 生成各个项目分类消息的容器
					var tId=ntxt[a].repository.full_name;
					if(noticeRepositoryTabBoxChild.length==0){
						noticeRepositoryTabBox.appendChild(noticeRT);
						noticeRT.setAttribute("name",tId);
						noticeRT.innerHTML=ntxt[a].repository.full_name;
						noticeRT.className="noticeRT";
						noticeRT.addEventListener("click",changeToTabNotice);
						noticeRT.addEventListener("mouseover",mouseBlue);
					}else{
						for(i=0;i<noticeRepositoryTabBoxChild.length;i++){
							if(noticeRepositoryTabBoxChild[i].getAttribute("name")==tId){
								break;
							}else{
								if(i==(noticeRepositoryTabBoxChild.length-1)){
									noticeRepositoryTabBox.appendChild(noticeRT);
									noticeRT.setAttribute("name",tId);
									noticeRT.innerHTML=ntxt[a].repository.full_name;
									noticeRT.className="noticeRT";
									noticeRT.addEventListener("click",changeToTabNotice);
									noticeRT.addEventListener("mouseover",mouseBlue);
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
	unReadButt.style.backgroundColor="rgb(102, 102, 255)";
	// colorChangeBlack();
	if(localStorage.to!==null&&localStorage.to!==""&&localStorage.to!==undefined){
		tolink="https://api.github.com/notifications?access_token="+to+"&t="+linktime;
		noticeGetTab();
		noticeManageGetNotice();
	};
};
function changeToAll(){
	noticeRepositoryTabBox.innerHTML='';
	noticeContent.innerHTML='';
	noticeSearchButt.innerHTML="搜索所有信息";
	if(localStorage.to!==null&&localStorage.to!==""&&localStorage.to!==undefined){
		tolink="https://api.github.com/notifications?access_token="+to+"&all=true"+"&t="+linktime;
		noticeGetTab();
		noticeManageGetNotice();
	};
};
function changeToParticipating(){
	noticeRepositoryTabBox.innerHTML='';
	noticeContent.innerHTML='';
	noticeSearchButt.innerHTML="搜索和我有关的信息";
	if(localStorage.to!==null&&localStorage.to!==""&&localStorage.to!==undefined){
		tolink="https://api.github.com/notifications?access_token="+to+"&participating=true"+"&t="+linktime;
		noticeGetTab();
		noticeManageGetNotice();
	};
};
function changeToTabNotice(){
	noticeContent.innerHTML='';
	noticeSearchButt.innerHTML="搜索"+this.innerText+"的信息";
	if(localStorage.to!==null&&localStorage.to!==""&&localStorage.to!==undefined){
		tolink="https://api.github.com/repos/"+this.innerText+"/notifications?access_token="+to+"&all=true"+"&t="+linktime;
		noticeManageGetNotice();		
	};
};
function mouseOverBlue(){
	var originColor=this.style.backgroundColor;
	this.style.backgroundColor="#6666FF";
	this.addEventListener("mouseout",function(){
		this.style.backgroundColor=originColor;
	});
};
function noticeManage(){
	window.open("noticeManage.html","_self");
};
function changeGetNoticeContent(){
	for(i=0;i<b.length;i++){
		b[i].addEventListener("mouseover",mouseOverBlue);
	};
	// gindex.addEventListener("click",noticeManage);
	unReadButt.addEventListener("click",changeToUnread);
	allButt.addEventListener("click",changeToAll);
	aboutButt.addEventListener("click",changeToParticipating);
};
addLoadEvent(changeToUnread);
addLoadEvent(changeGetNoticeContent);