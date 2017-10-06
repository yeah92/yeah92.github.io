var to=localStorage.to;
var linktime=new Date();
var countTime=linktime.getTimezoneOffset();
console.log(countTime);
var pageCount=0;
var dashBoard=document.getElementById("dashBoard");

function getFeeds(){
	var request=getHTTPObject();
	if (request){
		//var to=document.getElementById("t").value;
		if(localStorage.to!==null&&localStorage.to!==""&&localStorage.to!==undefined){
			var tolink="https://api.github.com/user?access_token="+to+"&t="+linktime;
			request.open("GET",tolink,true);
			request.onreadystatechange=function(){
				if(request.readyState==4){
					console.log(request.responseText);
					var ntxt=JSON.parse(request.responseText);
					//以下是写出内容
					var ub=document.getElementById("userbutt");
					userName=ntxt.login;
					function getFeed(){
						var request=getHTTPObject();
						if (request){
							//var to=document.getElementById("t").value;
							var tolink="https://api.github.com/users/"+userName+"/received_events?access_token="+to+"&page="+pageCount+"&t="+linktime;
							request.open("GET",tolink,true);
							request.onreadystatechange=function(){
								if(request.readyState==4){
									var ntxt=JSON.parse(request.responseText);
									console.log(ntxt);
									//以下是写出内容
									if(ntxt.length==0){
										dashBoard.innerHTML="没有资讯";
									}else{
										for(i=0;i<ntxt.length;i++){
											var fBox=document.createElement("table");
											var fTtr=document.createElement("tr");
											var fTtd=document.createElement("td");
											dashBoard.appendChild(fBox);
											fBox.appendChild(fTtr);
											fBox.className="singleFeed"
											fTtr.appendChild(fTtd);
											// 时间转换
											var ut=ntxt[i].created_at;
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
											console.log(ago);
											if(ago>86400000){
												fTtd.innerHTML="发布于"+Math.floor(ago/86400000)+"天前";
											}else{
												if(ago>3600000){
													fTtd.innerHTML="发布于"+Math.floor(ago/3600000)+"小时前";
												}else{
													if(ago>60000){
														fTtd.innerHTML="发布于"+Math.floor(ago/60000)+"分钟前";
													}else{
														if(ago>1000){
															fTtd.innerHTML="发布于"+Math.floor(ago/1000)+"秒前";
														}else{
															fTtd.innerHTML="发布于此时此刻此分此秒";
														};
													};
												};
											};
											if(utt.getHours()>12){
												fTtd.setAttribute("title",(utt.getFullYear()+"年"+(utt.getMonth()+1)+"月"+utt.getDate()+"日"+" 下午"+(utt.getHours()-12)+"时"+utt.getMinutes()+"分"));
											}else{
												fTtd.setAttribute("title",(utt.getFullYear()+"年"+(utt.getMonth()+1)+"月"+utt.getDate()+"日"+" 上午"+utt.getHours()+"时"+utt.getMinutes()+"分"))
											};
											fTtd.className="fTtd";
											// 分类
											if(ntxt[i].type=="IssuesEvent"&&ntxt[i].payload.action=="opened"){
												var fCtr=document.createElement("tr");
												var fCtd=document.createElement("td");
												var fNtd=document.createElement("td");
												var fFtd=document.createElement("td");
												var fTargettd=document.createElement("td");
												var fatr=document.createElement("tr");
												var fatd=document.createElement("td");
												fBox.appendChild(fCtr);
												fBox.appendChild(fatr);
												fCtr.appendChild(fCtd);
												fCtd.appendChild(fNtd);
												fCtd.appendChild(fFtd);
												fCtd.appendChild(fTargettd);
												fCtd.className="fCtd";
												fatr.appendChild(fatd);
												fNtd.innerHTML=ntxt[i].actor.login;
												fNtd.setAttribute("name",ntxt[i].actor.login);
												fNtd.onclick=openUserIndex;
												fNtd.className="fNtd";
												fNtd.addEventListener("mouseover",textLine);
												fFtd.innerHTML="&nbsp"+"opened issue"+"&nbsp";
												fTargettd.innerHTML=ntxt[i].repo.name+"#"+ntxt[i].payload.issue.number;
												fTargettd.setAttribute("name",ntxt[i].repo.name+"&ref=&in="+ntxt[i].payload.issue.number);
												fTargettd.onclick=openRepo;
												fTargettd.className="fTargettd";
												fatd.innerHTML="主题："+ntxt[i].payload.issue.title;
												// fatd.style.borderStyle="solid";
												// fatd.style.borderCollapse="collapse";
												fatd.setAttribute("colspan","10");
											}else{
												if(ntxt[i].type=="IssuesEvent"&&ntxt[i].payload.action=="closed"){
													var fCtr=document.createElement("tr");
													var fCtd=document.createElement("td");
													var fNtd=document.createElement("td");
													var fFtd=document.createElement("td");
													var fTargettd=document.createElement("td");
													var fatr=document.createElement("tr");
													var fatd=document.createElement("td");
													fBox.appendChild(fCtr);
													fBox.appendChild(fatr);
													fCtr.appendChild(fCtd);
													fCtd.appendChild(fNtd);
													fCtd.appendChild(fFtd);
													fCtd.appendChild(fTargettd);
													fCtd.className="fCtd";
													fatr.appendChild(fatd);
													fNtd.innerHTML=ntxt[i].actor.login;
													fNtd.className="fNtd";
													fNtd.setAttribute("name",ntxt[i].actor.login);
													fNtd.onclick=openUserIndex;
													fNtd.addEventListener("mouseover",textLine);
													fFtd.innerHTML="&nbsp"+"closed issue"+"&nbsp";
													fTargettd.innerHTML=ntxt[i].repo.name+"#"+ntxt[i].payload.issue.number;
													fTargettd.setAttribute("name",ntxt[i].repo.name+"&ref=&in="+ntxt[i].payload.issue.number);
													fTargettd.onclick=openRepo;
													fTargettd.className="fTargettd";
													
													fatd.innerHTML="主题："+ntxt[i].payload.issue.title;
													// fatd.style.borderStyle="solid";
													// fatd.style.borderCollapse="collapse";
													fatd.setAttribute("colspan","10");
												}else{
													if(ntxt[i].type=="WatchEvent"){
														var fCtr=document.createElement("tr");
														var fCtd=document.createElement("td");
														var fNtd=document.createElement("td");
														var fFtd=document.createElement("td");
														var fTargettd=document.createElement("td");
														fBox.appendChild(fCtr);
														fCtr.appendChild(fCtd);
														fCtd.appendChild(fNtd);
														fCtd.appendChild(fFtd);
														fCtd.appendChild(fTargettd);
														fCtd.className="fCtd";
														fNtd.innerHTML=ntxt[i].actor.login;
														fNtd.className="fNtd";
														fNtd.setAttribute("name",ntxt[i].actor.login);
														fNtd.onclick=openUserIndex;
														fNtd.addEventListener("mouseover",textLine);
														fFtd.innerHTML="&nbsp"+"starred"+"&nbsp";
														fTargettd.innerHTML=ntxt[i].repo.name;
														fTargettd.className="fTargettd";
														
													}else{
														if(ntxt[i].type=="ForkEvent"){
															var fCtr=document.createElement("tr");
															var fCtd=document.createElement("td");
															var fNtd=document.createElement("td");
															var fFtd=document.createElement("td");
															var fTargettd=document.createElement("td");
															var fto=document.createElement("td");
															var fr=document.createElement("td");
															fBox.appendChild(fCtr);
															fCtr.appendChild(fCtd);
															fCtd.appendChild(fNtd);
															fCtd.appendChild(fFtd);
															fCtd.appendChild(fTargettd);
															fCtd.appendChild(fto);
															fCtd.appendChild(fr);
															fCtd.className="fCtd";
															fNtd.innerHTML=ntxt[i].actor.login;
															fNtd.className="fNtd";
															fNtd.setAttribute("name",ntxt[i].actor.login);
															fNtd.onclick=openUserIndex;
															fNtd.addEventListener("mouseover",textLine);
															fFtd.innerHTML="&nbsp"+"forked"+"&nbsp";
															fTargettd.innerHTML=ntxt[i].repo.name;
															fTargettd.className="fTargettd";
															
															fto.innerHTML="&nbsp"+"to"+"&nbsp";
															fr.innerHTML=ntxt[i].payload.forkee.full_name;
															fr.className="fTargettd";
															fr.addEventListener("mouseover",textLine);
														}else{
															if(ntxt[i].type=="PushEvent"){
																var fCtr=document.createElement("tr");
																var fCtd=document.createElement("td");
																var fNtd=document.createElement("td");
																var fFtd=document.createElement("td");
																var fTargettd=document.createElement("td");
																var fto=document.createElement("td");
																var fr=document.createElement("td");
																fBox.appendChild(fCtr);
																fCtr.appendChild(fCtd);
																fCtd.appendChild(fNtd);
																fCtd.appendChild(fFtd);
																fCtd.appendChild(fr);
																fCtd.appendChild(fto);
																fCtd.appendChild(fTargettd);
																fCtd.className="fCtd";
																fNtd.innerHTML=ntxt[i].actor.login;
																fNtd.className="fNtd";
																fNtd.setAttribute("name",ntxt[i].actor.login);
																fNtd.onclick=openUserIndex;
																fNtd.addEventListener("mouseover",textLine);
																fFtd.innerHTML="&nbsp"+"pushed to"+"&nbsp";
																fTargettd.innerHTML=ntxt[i].repo.name;
																fTargettd.setAttribute("name",ntxt[i].repo.name);
																fTargettd.onclick=openRepo;
																fTargettd.className="fTargettd";
																
																fto.innerHTML="&nbsp"+"at"+"&nbsp";
																fr.innerHTML=ntxt[i].payload.ref.replace("refs/heads/","");
																fr.setAttribute("name",ntxt[i].repo.name+"&ref="+fr.innerHTML);
																fr.onclick=openRepo;
																fr.className="fTargettd";
																fr.addEventListener("mouseover",textLine);
																var nc=ntxt[i].payload.commits;
																if(nc.length<3){
																	for(a=nc.length-1;a>-1;a--){
																		var fatr=document.createElement("tr");
																		var fatd=document.createElement("td");
																		var fatda=document.createElement("td");
																		var fatdb=document.createElement("td");
																		var fatdc=document.createElement("td");
																		fBox.appendChild(fatr);
																		fatr.appendChild(fatd);
																		fatd.appendChild(fatda);
																		fatd.appendChild(fatdb);
																		fatd.appendChild(fatdc);
																		fatda.innerHTML=nc[a].author.name+"&nbsp";
																		fatda.className="fatda";
																		fatda.setAttribute("name",nc[a].author.name);
																		fatda.onclick=openUserIndex;
																		fatda.addEventListener("mouseover",textLine);
																		fatdb.innerHTML=nc[a].sha+"&nbsp";
																		fatdb.className="fatdb";
																		fatdb.addEventListener("mouseover",textLine);
																		fatdc.innerHTML=nc[a].message;
																		fatdc.className="fatdc";
																	};
																}else{
																	for(a=1;a>-1;a--){
																		var fatr=document.createElement("tr");
																		var fatd=document.createElement("td");
																		var fatda=document.createElement("td");
																		var fatdb=document.createElement("td");
																		var fatdc=document.createElement("td");
																		fBox.appendChild(fatr);
																		fatr.appendChild(fatd);
																		fatd.appendChild(fatda);
																		fatd.appendChild(fatdb);
																		fatd.appendChild(fatdc);
																		fatda.innerHTML=nc[a].author.name+"&nbsp";
																		fatda.className="fatda";
																		fatda.setAttribute("name",nc[a].author.name);
																		fatda.onclick=openUserIndex;
																		fatda.addEventListener("mouseover",textLine);
																		fatdb.innerHTML=nc[a].sha+"&nbsp";
																		fatdb.className="fatdb";
																		fatdb.addEventListener("mouseover",textLine);
																		fatdc.innerHTML=nc[a].message;
																		fatdc.className="fatdc";
																	};
																	var mctr=document.createElement("tr");
																	var mctd=document.createElement("td");
																	fBox.appendChild(mctr);
																	mctr.appendChild(mctd);
																	mctd.innerHTML="查看更多commit";
																	mctd.className="mctd";
																	mctd.addEventListener("mouseover",textLine);
																};
															}else{
																if(ntxt[i].type=="PullRequestEvent"&&ntxt[i].payload.action=="opened"&&ntxt[i].payload.pull_request.merged==false){
																	var fCtr=document.createElement("tr");
																	var fCtd=document.createElement("td");
																	var fNtd=document.createElement("td");
																	var fFtd=document.createElement("td");
																	var fTargettd=document.createElement("td");
																	var fatr=document.createElement("tr");
																	var fatd=document.createElement("td");
																	fBox.appendChild(fCtr);
																	fBox.appendChild(fatr);
																	fCtr.appendChild(fCtd);
																	fCtd.appendChild(fNtd);
																	fCtd.appendChild(fFtd);
																	fCtd.appendChild(fTargettd);
																	fCtd.className="fCtd";
																	fatr.appendChild(fatd);
																	fNtd.innerHTML=ntxt[i].actor.login;
																	fNtd.className="fNtd";
																	fNtd.setAttribute("name",ntxt[i].actor.login);
																	fNtd.onclick=openUserIndex;
																	fNtd.addEventListener("mouseover",textLine);
																	fFtd.innerHTML="&nbsp"+"opened pull request"+"&nbsp";
																	fTargettd.innerHTML=ntxt[i].repo.name+"#"+ntxt[i].payload.pull_request.number;
																	fTargettd.setAttribute("name",ntxt[i].repo.name+"&ref=&in="+ntxt[i].payload.pull_request.number);
																	fTargettd.onclick=openRepo;
																	fTargettd.className="fTargettd";
																	
																	fatd.innerHTML="主题："+ntxt[i].payload.pull_request.title;
																	// fatd.style.borderStyle="solid";
																	// fatd.style.borderCollapse="collapse";
																	fatd.setAttribute("colspan","10");
																	var fxtr=document.createElement("tr");
																	var fxtd=document.createElement("td");
																	fBox.appendChild(fxtr);
																	fxtr.appendChild(fxtd);
																	fxtd.innerHTML=ntxt[i].payload.pull_request.commits+" commit with "+ntxt[i].payload.pull_request.additions+" additions and "+ntxt[i].payload.pull_request.deletions+" deletions";
																	fxtd.className="fxtd";
																}else{
																	if(ntxt[i].type=="PullRequestEvent"&&ntxt[i].payload.action=="closed"&&ntxt[i].payload.pull_request.merged==true){
																		var fCtr=document.createElement("tr");
																		var fCtd=document.createElement("td");
																		var fNtd=document.createElement("td");
																		var fFtd=document.createElement("td");
																		var fTargettd=document.createElement("td");
																		var fatr=document.createElement("tr");
																		var fatd=document.createElement("td");
																		fBox.appendChild(fCtr);
																		fCtr.appendChild(fCtd);
																		fBox.appendChild(fatr);
																		fCtd.appendChild(fNtd);
																		fCtd.appendChild(fFtd);
																		fCtd.appendChild(fTargettd);
																		fCtd.className="fCtd";
																		fatr.appendChild(fatd);
																		fNtd.innerHTML=ntxt[i].actor.login;
																		fNtd.className="fNtd";
																		fNtd.setAttribute("name",ntxt[i].actor.login);
																		fNtd.onclick=openUserIndex;
																		fNtd.addEventListener("mouseover",textLine);
																		fFtd.innerHTML="&nbsp"+"merged pull request"+"&nbsp";
																		fTargettd.innerHTML=ntxt[i].repo.name+"#"+ntxt[i].payload.pull_request.number;
																		fTargettd.setAttribute("name",ntxt[i].repo.name+"&ref=&in="+ntxt[i].payload.pull_request.number);
																		fTargettd.onclick=openRepo;
																		fTargettd.className="fTargettd";
																		
																		fatd.innerHTML="主题："+ntxt[i].payload.pull_request.title;
																		// fatd.style.borderStyle="solid";
																		// fatd.style.borderCollapse="collapse";
																		fatd.setAttribute("colspan","10");
																		var fxtr=document.createElement("tr");
																		var fxtd=document.createElement("td");
																		fBox.appendChild(fxtr);
																		fxtr.appendChild(fxtd);
																		fxtd.innerHTML=ntxt[i].payload.pull_request.commits+" commit with "+ntxt[i].payload.pull_request.additions+" additions and "+ntxt[i].payload.pull_request.deletions+" deletions";
																		fxtd.className="fxtd";
																	}else{
																		if(ntxt[i].type=="PullRequestEvent"&&ntxt[i].payload.action=="closed"&&ntxt[i].payload.pull_request.merged==false){
																			var fCtr=document.createElement("tr");
																			var fCtd=document.createElement("td");
																			var fNtd=document.createElement("td");
																			var fFtd=document.createElement("td");
																			var fTargettd=document.createElement("td");
																			var fatr=document.createElement("tr");
																			var fatd=document.createElement("td");
																			fBox.appendChild(fCtr);
																			fBox.appendChild(fatr);
																			fCtr.appendChild(fCtd);
																			fCtd.appendChild(fNtd);
																			fCtd.appendChild(fFtd);
																			fCtd.appendChild(fTargettd);
																			fCtd.className="fCtd";
																			fatr.appendChild(fatd);
																			fNtd.innerHTML=ntxt[i].actor.login;
																			fNtd.className="fNtd";
																			fNtd.setAttribute("name",ntxt[i].actor.login);
																			fNtd.onclick=openUserIndex;
																			fNtd.addEventListener("mouseover",textLine);
																			fFtd.innerHTML="&nbsp"+"closed pull request"+"&nbsp";
																			fTargettd.innerHTML=ntxt[i].repo.name+"#"+ntxt[i].payload.pull_request.number;
																			fTargettd.setAttribute("name",ntxt[i].repo.name+"&ref=&in="+ntxt[i].payload.pull_request.number);
																			fTargettd.onclick=openRepo;
																			fTargettd.className="fTargettd";
																			
																			fatd.innerHTML="主题："+ntxt[i].payload.pull_request.title;
																			// fatd.style.borderStyle="solid";
																			// fatd.style.borderCollapse="collapse";
																			fatd.setAttribute("colspan","10");
																		}else{
																			if(ntxt[i].type=="CreateEvent"){
																				var fCtr=document.createElement("tr");
																				var fCtd=document.createElement("td");
																				var fNtd=document.createElement("td");
																				var fFtd=document.createElement("td");
																				var fTargettd=document.createElement("td");
																				var fto=document.createElement("td");
																				var fr=document.createElement("td");
																				fBox.appendChild(fCtr);
																				fCtr.appendChild(fCtd);
																				fCtd.appendChild(fNtd);
																				fCtd.appendChild(fFtd);
																				fCtd.appendChild(fTargettd);
																				fCtd.className="fCtd";
																				fNtd.innerHTML=ntxt[i].actor.login;
																				fNtd.className="fNtd";
																				fNtd.setAttribute("name",ntxt[i].actor.login);
																				fNtd.onclick=openUserIndex;
																				fNtd.addEventListener("mouseover",textLine);
																				fFtd.innerHTML="&nbsp"+"created repository"+"&nbsp";
																				fTargettd.innerHTML=ntxt[i].repo.name;
																				fTargettd.className="fTargettd";
																				
																			}else{
																				if(ntxt[i].type=="IssueCommentEvent"&&ntxt[i].payload.issue.pull_request==null){
																					var fCtr=document.createElement("tr");
																					var fCtd=document.createElement("td");
																					var fNtd=document.createElement("td");
																					var fFtd=document.createElement("td");
																					var fTargettd=document.createElement("td");
																					var fatr=document.createElement("tr");
																					var fatd=document.createElement("td");
																					fBox.appendChild(fCtr);
																					fBox.appendChild(fatr);
																					fCtr.appendChild(fCtd);
																					fCtd.appendChild(fNtd);
																					fCtd.appendChild(fFtd);
																					fCtd.appendChild(fTargettd);
																					fCtd.className="fCtd";
																					fatr.appendChild(fatd);
																					fNtd.innerHTML=ntxt[i].actor.login;
																					fNtd.className="fNtd";
																					fNtd.setAttribute("name",ntxt[i].actor.login);
																					fNtd.onclick=openUserIndex;
																					fNtd.addEventListener("mouseover",textLine);
																					fFtd.innerHTML="&nbsp"+"commented on issue"+"&nbsp";
																					fTargettd.innerHTML=ntxt[i].repo.name+"#"+ntxt[i].payload.issue.number;
																					fTargettd.setAttribute("name",ntxt[i].repo.name+"&ref=&in="+ntxt[i].payload.issue.number);
																					fTargettd.onclick=openRepo;
																					fTargettd.className="fTargettd";
																					
																					fatd.innerHTML="评论："+writeText(ntxt[i].payload.comment.body);
																					fatd.setAttribute("colspan","10");
																				}else{
																					if(ntxt[i].type=="IssueCommentEvent"&&ntxt[i].payload.issue.pull_request!==null){
																						var fCtr=document.createElement("tr");
																						var fCtd=document.createElement("td");
																						var fNtd=document.createElement("td");
																						var fFtd=document.createElement("td");
																						var fTargettd=document.createElement("td");
																						var fatr=document.createElement("tr");
																						var fatd=document.createElement("td");
																						fBox.appendChild(fCtr);
																						fBox.appendChild(fatr);
																						fCtr.appendChild(fCtd);
																						fCtd.appendChild(fNtd);
																						fCtd.appendChild(fFtd);
																						fCtd.appendChild(fTargettd);
																						fCtd.className="fCtd";
																						fatr.appendChild(fatd);
																						fNtd.innerHTML=ntxt[i].actor.login;
																						fNtd.className="fNtd";
																						fNtd.setAttribute("name",ntxt[i].actor.login);
																						fNtd.onclick=openUserIndex;
																						fNtd.addEventListener("mouseover",textLine);
																						fFtd.innerHTML="&nbsp"+"commented on pull request"+"&nbsp";
																						fTargettd.innerHTML=ntxt[i].repo.name+"#"+ntxt[i].payload.issue.number;
																						fTargettd.setAttribute("name",ntxt[i].repo.name+"&ref=&in="+ntxt[i].payload.issue.number);
																						fTargettd.onclick=openRepo;
																						fTargettd.className="fTargettd";
																						
																						var fadiv=document.createElement("div");
																						fatd.appendChild(fadiv);
																						fadiv.style.overflow="hidden";
																						// fadiv.style.whiteSpace="nowrap";
																						fadiv.style.textOverflow="ellipsis";
																						var ncomment=ntxt[i].payload.comment.body;
																						var xcomment=ncomment.replace()
																						fadiv.innerHTML="评论："+writeText(ntxt[i].payload.comment.body);
																						fatd.setAttribute("colspan","10");
																					}else{
																						if(ntxt[i].type=="CommitCommentEvent"){
																							var fCtr=document.createElement("tr");
																							var fCtd=document.createElement("td");
																							var fNtd=document.createElement("td");
																							var fFtd=document.createElement("td");
																							var fTargettd=document.createElement("td");
																							var fatr=document.createElement("tr");
																							var fatd=document.createElement("td");
																							fBox.appendChild(fCtr);
																							fBox.appendChild(fatr);
																							fCtr.appendChild(fCtd);
																							fCtd.appendChild(fNtd);
																							fCtd.appendChild(fFtd);
																							fCtd.appendChild(fTargettd);
																							fCtd.className="fCtd";
																							fatr.appendChild(fatd);
																							fNtd.innerHTML=ntxt[i].actor.login;
																							fNtd.className="fNtd";
																							fNtd.setAttribute("name",ntxt[i].actor.login);
																							fNtd.onclick=openUserIndex;
																							fNtd.addEventListener("mouseover",textLine);
																							fFtd.innerHTML="&nbsp"+"commented on commit"+"&nbsp";
																							fTargettd.innerHTML=ntxt[i].repo.name+"@"+ntxt[i].payload.comment.commit_id;
																							fTargettd.className="fTargettd";
																							
																							fatd.innerHTML="评论："+writeText(ntxt[i].payload.comment.body);
																							fatd.setAttribute("colspan","3");
																						};
																					};
																				};
																			};
																		};
																	};
																};
															};
														};
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
					getFeed();
				};
			};
			request.send(null);
		};
	}
	else{
		alert('Sorry,your browser doesn\'t support XMLHttpRequest');
	};
};
function moreFeeds(){
	pageCount=pageCount+1;
	console.log(pageCount);
	getFeeds();
};
function textLine(){
	this.style.textDecoration="underline";
	this.addEventListener("mouseout",function(){
		this.style.textDecoration="none";
	}
	);
};
addLoadEvent(moreFeeds);