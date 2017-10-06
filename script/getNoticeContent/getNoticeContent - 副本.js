var to="6f29e41b100c55643afb581eca2025ae798f5f10";
var linktime=new Date();
var noticeMenuButt=document.getElementById("noticeMenuButt");
var noticeContent=document.getElementById("noticeContent");
// var tolink="https://api.github.com/notifications?access_token="+to+"&t="+linktime;
function getNoticeContent(){
	var request=getHTTPObject();
	if (request){
		//var to=document.getElementById("t").value;
		request.open("GET",tolink,true);
		request.onreadystatechange=function(){
			if(request.readyState==4){
				var ntxt=JSON.parse(request.responseText);
				if(ntxt.length==0){
					var noticeContent=document.getElementById("noticeContent");
					noticeContent.innerHTML="你没有收到信息";
					return;
				};
				//以下是写出内容
				var arrayLength=ntxt.length;
				for(var a=0;a<arrayLength;a++){
					var noticeContent=document.getElementById("noticeContent");
					// 生成单个消息的容器
					var trNotice=document.createElement("table");
					trNotice.style.borderColor="black";
					trNotice.style.borderStyle="solid";
					trNotice.style.fontSize="14px";
					// 生成消息容器内的标题容器
					var tdTitle=document.createElement("td");
					var trTitle=document.createElement("tr");
					// 写入标题并把标题容器接入消息容器
					tdTitle.innerHTML=ntxt[a].subject.title;
					tdTitle.style.cursor="pointer";
					tdTitle.style.borderStyle="solid";
					tdTitle.style.borderWidths="4px";
					tdTitle.style.borderColor="black";
					tdTitle.setAttribute("colspan","9");
					trTitle.appendChild(tdTitle);
					trNotice.appendChild(trTitle);
					// 将消息容器接入页面容器
					noticeContent.appendChild(trNotice);
					// 为接口加上时间，防止缓存影响
					var linktime=new Date();
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
function changeToUnread(){
	noticeMenuButt.innerHTML="未读信息";
	var noticeRefresh=document.getElementById("noticeRefresh");
	noticeRefresh.removeEventListener("click",changeToAll);
	noticeRefresh.addEventListener("click",changeToUnread);
	noticeContent.innerHTML='';
	tolink="https://api.github.com/notifications?access_token="+to+"&t="+linktime;
	getNoticeContent();
};
function changeToAll(){
	noticeMenuButt.innerHTML="所有信息";
	var noticeRefresh=document.getElementById("noticeRefresh");
	noticeRefresh.removeEventListener("click",changeToUnread);
	noticeRefresh.addEventListener("click",changeToAll);
	noticeContent.innerHTML='';
	tolink="https://api.github.com/notifications?access_token="+to+"&all=true"+"&t="+linktime;
	getNoticeContent();
};
function githubindex(){
	window.open("index.html","_self");
};
function changeToNoticeManage(){
	window.open("noticeManage.html");
};
function changeGetNoticeContent(){
	var gindex=document.getElementById("gindex");
	var unReadButt=document.getElementById("unread");
	var allButt=document.getElementById("all");
	var manageButt=document.getElementById("manage");
	gindex.addEventListener("click",githubindex);
	unReadButt.addEventListener("click",changeToUnread);
	allButt.addEventListener("click",changeToAll);
	manageButt.addEventListener("click",changeToNoticeManage);
};
addLoadEvent(changeToUnread);
addLoadEvent(changeGetNoticeContent);