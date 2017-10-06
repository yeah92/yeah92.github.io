var issueNumber="";
// function postIssueComment(){
	// var request=getHTTPObject();
	// if (request){
		// var repoApi="https://api.github.com/repos/"+repo+"/issues/"+issueNumber+"comments?access_token="+to+"&t="+linktime;
		// console.log(repoApi);
		// request.open("POST",repoApi,true);
		// loadingANM();
		// var commentContent=document.getElementById("commentInput").value;
		// console.log(commentContent);
		// request.onreadystatechange=function(){
			// if(request.readyState==4){
				// console.log(request.state);
			// };
			// deleteANM();
		// };
		// request.send(commentContent);
	// };
// };
function getIssue(){
	var request=getHTTPObject();
	if (request){
		var repoApi="https://api.github.com/repos/"+repo+"/issues/"+issueNumber+"?access_token="+to+"&t="+linktime;
		//var to=document.getElementById("t").value;
		console.log(repoApi);
		request.open("GET",repoApi,true);
		loadingANM();
		request.onreadystatechange=function(){
			if(request.readyState==4){
				var ntxt=JSON.parse(request.responseText);
				console.log(ntxt);
				var oFCB=document.getElementsByClassName("fileContentBox");
				if(oFCB.length>0){
					document.body.removeChild(oFCB[0]);
				};
				var issueContentBox=document.createElement("div");
				issueContentBox.className="fileContentBox";
				document.body.appendChild(issueContentBox);
				var fileButtMenu=document.createElement("div");
				var oFCBB1=document.createElement("span");
				oFCBB1.className="icon-cancel-circle";
				oFCBB1.onclick=function(){
					moveB();
					var oFCB=document.getElementsByClassName("fileContentBox");
					if(oFCB.length>0){
						document.body.removeChild(oFCB[0]);
					};
				};
				oFCBB1.setAttribute("title","关闭文件");
				issueContentBox.appendChild(fileButtMenu);
				fileButtMenu.appendChild(oFCBB1);
				fileButtMenu.className="fileButtMenu";
				if(ntxt.author_association=="OWNER"){
					var oFCBB2=document.createElement("span");
					oFCBB2.className="icon-bin";
					oFCBB2.onclick=function(){
						moveB();
						var oFCB=document.getElementsByClassName("fileContentBox");
						if(oFCB.length>0){
							document.body.removeChild(oFCB[0]);
						};
					};
					oFCBB2.setAttribute("title","删除事件");
					fileButtMenu.appendChild(oFCBB2);
					var oFCBB3=document.createElement("span");
					oFCBB3.className="icon-pencil";
					oFCBB3.onclick=function(){
						moveB();
						var oFCB=document.getElementsByClassName("fileContentBox");
						if(oFCB.length>0){
							document.body.removeChild(oFCB[0]);
						};
					};
					oFCBB3.setAttribute("title","编辑事件");
					fileButtMenu.appendChild(oFCBB3);
				};
				document.body.appendChild(issueContentBox);
				var main=document.createElement("div");
				var div1=document.createElement("div");
				var mainTitle=document.createElement("div");
				var mainNumber=document.createElement("span");
				var div2=document.createElement("div");
				var mainState=document.createElement("div");
				var mainUser=document.createElement("div");
				var mainTime=document.createElement("div");
				var mainBody=document.createElement("div");
				issueContentBox.appendChild(main);
				main.className="issueMainClass";
				main.appendChild(div1);
				main.appendChild(div2);
				main.appendChild(mainBody);
				div1.appendChild(mainTitle);
				div1.className="issueMainDiv1";
				mainTitle.className="issueMainTitle";
				div2.appendChild(mainState);
				mainState.className="issueMainState";
				div2.appendChild(mainUser);
				div2.appendChild(mainTime);
				div2.className="issueMainDiv2";
				mainTitle.innerHTML=ntxt.title;
				mainNumber.innerHTML="&nbsp#"+ntxt.number;
				mainTitle.appendChild(mainNumber);
				if(ntxt.state=="open"){
					mainState.innerHTML="开放";
				}else{
					mainState.innerHTML="关闭";
				};
				mainUser.innerHTML=ntxt.user.login;
				mainUser.className="issueMainUser";
				mainUser.setAttribute("name",ntxt.user.login);
				mainUser.onclick=openUserIndex;
				var ut=ntxt.created_at;
				var reg=new RegExp("-|T|:","g");
				var ut1=ut.replace(reg,",");
				var ut2=ut1.replace("Z",",0");
				var ut3=ut2.split(",");
				var utt=new Date();
				utt.setUTCFullYear(ut3[0],ut3[1]-1,ut3[2]);
				utt.setUTCHours(ut3[3],ut3[4],ut3[5]);
				var ago=linktime.getTime()-utt.getTime();
				if(ago>86400000){
					mainTime.innerHTML="于"+Math.floor(ago/86400000)+"天前开启该事件";
				}else{
					if(ago>3600000){
						mainTime.innerHTML="于"+Math.floor(ago/3600000)+"小时前开启该事件";
					}else{
						if(ago>60000){
							mainTime.innerHTML="于"+Math.floor(ago/60000)+"分钟前开启该事件";
						}else{
							if(ago>1000){
								mainTime.innerHTML="于"+Math.floor(ago/1000)+"秒前开启该事件";
							}else{
								mainTime.innerHTML="肛肛开启该事件";
							};
						};
					};
				};
				if(utt.getHours()>12){
					mainTime.setAttribute("title",(utt.getFullYear()+"年"+(utt.getMonth()+1)+"月"+utt.getDate()+"日"+" 下午"+(utt.getHours()-12)+"时"+utt.getMinutes()+"分"));
				}else{
					mainTime.setAttribute("title",(utt.getFullYear()+"年"+(utt.getMonth()+1)+"月"+utt.getDate()+"日"+" 上午"+utt.getHours()+"时"+utt.getMinutes()+"分"));
				};
				mainTime.className="issueMainTime";
				mainBody.innerHTML=writeText(ntxt.body);
				mainBody.className="issueMainBody";
				function getComment(){
					var request=getHTTPObject();
					if (request){
						var repoApi=ntxt.comments_url+"?access_token="+to+"&t="+linktime;
						//var to=document.getElementById("t").value;
						console.log(repoApi);
						request.open("GET",repoApi,true);
						loadingANM();
						request.onreadystatechange=function(){
							if(request.readyState==4){
								var ntxt=JSON.parse(request.responseText);
								console.log(ntxt);
								for(ci=0;ci<ntxt.length;ci++){
									var box=document.createElement("div");
									var div1=document.createElement("div");
									var userImg=document.createElement("img");
									var userName=document.createElement("div");
									var time=document.createElement("div");
									var authorA=document.createElement("div");
									var body=document.createElement("div");
									issueContentBox.appendChild(box);
									box.className="issueContentBoxBox";
									box.appendChild(div1);
									div1.appendChild(userImg);
									div1.appendChild(userName);
									div1.appendChild(time);
									div1.appendChild(authorA);
									div1.className="issueContentBoxDiv1";
									box.appendChild(body);
									userImg.className="issueContentBoxUserImg";
									userImg.setAttribute("src",ntxt[ci].user.avatar_url);
									userImg.setAttribute("name",ntxt[ci].user.login);
									userImg.onclick=openUserIndex;
									userName.className="issueContentBoxUserName";
									userName.innerHTML=ntxt[ci].user.login;
									userName.setAttribute("name",ntxt[ci].user.login);
									userName.onclick=openUserIndex;
									var ut=ntxt[ci].created_at;
									var reg=new RegExp("-|T|:","g");
									var ut1=ut.replace(reg,",");
									var ut2=ut1.replace("Z",",0");
									var ut3=ut2.split(",");
									var utt=new Date();
									utt.setUTCFullYear(ut3[0],ut3[1]-1,ut3[2]);
									utt.setUTCHours(ut3[3],ut3[4],ut3[5]);
									var ago=linktime.getTime()-utt.getTime();
									box.setAttribute("name",ago);
									if(ago>86400000){
										time.innerHTML="于"+Math.floor(ago/86400000)+"天前评论";
									}else{
										if(ago>3600000){
											time.innerHTML="于"+Math.floor(ago/3600000)+"小时前评论";
										}else{
											if(ago>60000){
												time.innerHTML="于"+Math.floor(ago/60000)+"分钟前评论";
											}else{
												if(ago>1000){
													time.innerHTML="于"+Math.floor(ago/1000)+"秒前评论";
												}else{
													time.innerHTML="肛肛评论";
												};
											};
										};
									};
									if(utt.getHours()>12){
										time.setAttribute("title",(utt.getFullYear()+"年"+(utt.getMonth()+1)+"月"+utt.getDate()+"日"+" 下午"+(utt.getHours()-12)+"时"+utt.getMinutes()+"分"));
									}else{
										time.setAttribute("title",(utt.getFullYear()+"年"+(utt.getMonth()+1)+"月"+utt.getDate()+"日"+" 上午"+utt.getHours()+"时"+utt.getMinutes()+"分"));
									};
									if(ntxt[ci].author_association=="OWNER"){
										authorA.innerHTML="项目作者";
									}else{
										authorA.innerHTML="";
									};
									authorA.className="issueContentBoxAuthorA";
									time.className="issueContentBoxTime";
									body.innerHTML=writeText(ntxt[ci].body);
									body.className="issueContentBoxBody";
									if(ci==ntxt.length-1){
										var writeCommentBox=document.createElement("div");
										var commentInput=document.createElement("textarea");
										var sendCommentButt=document.createElement("div");
										issueContentBox.appendChild(writeCommentBox);
										writeCommentBox.appendChild(commentInput);
										writeCommentBox.appendChild(sendCommentButt);
										writeCommentBox.className="writeCommentBox";
										commentInput.setAttribute("cols",83);
										commentInput.setAttribute("row",5);
										commentInput.className="commentInput";
										commentInput.setAttribute("id","commentInput");
										sendCommentButt.innerText="发送评论";
										sendCommentButt.className="sendCommentButt";
										// sendCommentButt.onclick=postIssueComment;
									};
								};
							};
							deleteANM();
						};
						request.send();
					};
				};
				getComment();
			};
			deleteANM();
		};
		request.send();
	};
};