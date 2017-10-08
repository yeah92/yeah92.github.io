var repoDescript=document.getElementById('repoDescript');
var repoContentBox=document.getElementById("repoContentBox");
var mSelect=document.getElementById("mSelect");
var tSelect=document.getElementById("tSelect");
var repoWatch=document.getElementById("repoWatch");
var repoStar=document.getElementById("repoStar");
var repoFork=document.getElementById("repoFork");
var overview=document.getElementById("overview");
var commitsPage=1;
var releasePage=1;
var contributorsPage=1;
var repo="";
var mVS="";
// function collectClosedDir(){
	// for(i=1;i>0;i++){
		// var cD=document.getElementsByName(i);
		// console.log(i);
		// console.log(cD.length);
		// if(cD.length>0){
			// for(a=0;a<cD.length;a++){
				// if(cD[a].className!=="chosePageN"){
					// if(cD[a].nextSibling!==null){
						// if(cD[a].nextSibling.getAttribute("name")!=="openedDir"){
							// cD[a].click();
						// }else{
							// if(cD[a].nextSibling.style.display=="none"){
								// cD[a].click();
							// };
						// };
					// }else{
						// cD[a].click();
					// };
				// };
			// };
		// }else{
			// break;
		// };
	// };
// };
function getRepoSet(){
	if(window.location.href.split('&ref=')[0]!==undefined){
		repo=window.location.href.split('&ref=')[0].split('?=')[1];
	}else{
		repo=window.location.href.split('?=')[1];
	};
	if(window.location.href.split('&in=')[1]!==undefined){
		issueNumber=window.location.href.split('&in=')[1];
		mVS=window.location.href.split('&in=')[0].split('&href')[1];
	}else{
		if(window.location.href.split('&ref=')[1]!==undefined){
			mVS=window.location.href.split('&ref=')[1];
		}else{
			mVS="master";
		};
	};
	if(mVS==""||mVS==undefined){
		mVS="master";
	};
};
function getRepo(){
	repoWatch.setAttribute("name",repo);
	ifWatch(repoWatch);
	repoStar.setAttribute("name",repo);
	ifStar(repoStar);
	repoFork.setAttribute("name",repo);
	repoFork.onclick=fork;
	overview.innerText=repo+"总览";
	overview.style.backgroundColor="rgb(102,102,255)";
	var request=getHTTPObject();
	if (request){
		var repoApi="https://api.github.com/repos/"+repo+"?access_token="+to+"&t="+linktime;
		//var to=document.getElementById("t").value;
		console.log(repoApi);
		request.open("GET",repoApi,true);
		loadingANM();
		request.onreadystatechange=function(){
			if(request.readyState==4){
				var ntxt=JSON.parse(request.responseText);
				console.log(ntxt);
				repoDescript.innerHTML=ntxt.description;
			};
			deleteANM();
		};
		request.send();
	};
	if(issueNumber!==""){
		getIssue();
		moveA();
	};
};
function getRepoCommit(){
	console.log(repo);
	var request=getHTTPObject();
	if (request){
		var repoApi="https://api.github.com/repos/"+repo+"/commits?page="+commitsPage+"&access_token="+to+"&t="+linktime;
		//var to=document.getElementById("t").value;
		console.log(repoApi);
		request.open("GET",repoApi,true);
		loadingANM();
		request.onreadystatechange=function(){
			if(request.readyState==4){
				var ntxt=JSON.parse(request.responseText);
				console.log(ntxt);
				if(ntxt.length<1){
					alert("居然没有了！");
				}else{
					for(i=0;i<ntxt.length;i++){
						var dateBox=document.createElement("div");
						dateBox.className="dateBox";
						var date=document.createElement("div");
						var dateBoxName=ntxt[i].commit.committer.date.match(/.*(?=T)/,'ig');
						date.innerText="贡献日期："+dateBoxName;
						date.className="date";
						dateBox.appendChild(date);
						dateBox.setAttribute("name",dateBoxName);
						var rc=repoContentBox.children;
						if(rc.length<1){
							repoContentBox.appendChild(dateBox);
							dateBox.setAttribute("id",dateBoxName);
						}else{
							for(ri=0;ri<rc.length;ri++){
								if(rc[ri].getAttribute("name")==dateBoxName){
									break;
								}else{
									if(ri==rc.length-1){
										repoContentBox.appendChild(dateBox);
										dateBox.setAttribute("id",dateBoxName);
									};
								};
							};
						};
						var dateBoxA=document.getElementById(dateBoxName);
						console.log(dateBoxA);
						var commitBox=document.createElement("div");
						var committer=document.createElement("div");
						var committerA=document.createElement("div");
						var committerN=document.createElement("div");
						var commitTitle=document.createElement("div");
						dateBoxA.appendChild(commitBox);
						commitBox.appendChild(committer);
						commitBox.className="commitBox";
						committer.appendChild(committerA);
						committer.appendChild(committerN);
						committer.className="committer";
						committer.setAttribute("name",ntxt[i].author.login);
						committer.onclick=openUserIndex;
						commitBox.appendChild(commitTitle);
						committerA.innerHTML="<img src="+ntxt[i].author.avatar_url+" class='userImg'>";
						committerN.innerText=ntxt[i].author.login;
						commitTitle.innerText=ntxt[i].commit.message;
					};
					var moreCommit=document.createElement("div");
					repoContentBox.appendChild(moreCommit);
					moreCommit.className="moreCommit";
					moreCommit.innerText="查看更多";
					moreCommit.onclick=function (){
						commitsPage+=parseInt(1);
						repoContentBox.removeChild(moreCommit);
						console.log(commitsPage);
						getRepoCommit();
					};
				};
			};
			deleteANM();
		};
		request.send();
	};
};
function getRepoBranch(){
	console.log(repo);
	var request=getHTTPObject();
	if (request){
		var repoApi="https://api.github.com/repos/"+repo+"/branches?access_token="+to+"&t="+linktime;
		//var to=document.getElementById("t").value;
		console.log(repoApi);
		request.open("GET",repoApi,true);
		loadingANM();
		request.onreadystatechange=function(){
			if(request.readyState==4){
				var ntxt=JSON.parse(request.responseText);
				console.log(ntxt);
				for(i=0;i<ntxt.length;i++){
					var o=document.createElement("option");
					o.innerText=ntxt[i].name;
					if(ntxt[i].name=="master"&&ntxt.length>0){
						mSelect.add(o,mSelect.options[0]);
					}else{
						mSelect.add(o);
					};
					if(ntxt[i].name==mVS){
						o.selected=true;
					};
				};
				console.log("select="+mSelect.value);
			};
			deleteANM();
		};
		request.send();
	};
};
function getRepoReleases(){
	console.log(repo);
	var request=getHTTPObject();
	if (request){
		var repoApi="https://api.github.com/repos/"+repo+"/releases?page="+releasePage+"&access_token="+to+"&t="+linktime;
		//var to=document.getElementById("t").value;
		console.log(repoApi);
		request.open("GET",repoApi,true);
		loadingANM();
		request.onreadystatechange=function(){
			if(request.readyState==4){
				var ntxt=JSON.parse(request.responseText);
				console.log(ntxt);
				if(ntxt.length<1){
					alert("居然没有了！");
				}else{
					for(i=0;i<ntxt.length;i++){
						var releaseBox=document.createElement("div");
						releaseBox.className="releaseBox";
						var releaseTitle=document.createElement("div");
						releaseTitle.className="releaseTitle";
						var releaseAuthor=document.createElement("div");
						releaseAuthor.className="releaseAuthor";
						var releaseDate=document.createElement("div");
						releaseDate.className="releaseDate";
						repoContentBox.appendChild(releaseBox);
						releaseBox.appendChild(releaseTitle);
						releaseBox.appendChild(releaseAuthor);
						releaseBox.appendChild(releaseDate);
						releaseTitle.innerText=ntxt[i].name;
						releaseAuthor.innerText=ntxt[i].author.login;
						releaseAuthor.setAttribute("name",ntxt[i].author.login);
						releaseAuthor.onclick=openUserIndex;
						var ut=ntxt[i].published_at;
						var reg=new RegExp("-|T|:","g");
						var ut1=ut.replace(reg,",");
						var ut2=ut1.replace("Z",",0");
						var ut3=ut2.split(",");
						console.log(ut3);
						var utt=new Date();
						utt.setUTCFullYear(ut3[0],ut3[1]-1,ut3[2]);
						utt.setUTCHours(ut3[3],ut3[4],ut3[5]);
						console.log(utt);
						var ago=linktime.getTime()-utt.getTime();
						console.log(ago);
						if(ago>86400000){
							releaseDate.innerHTML="发布于"+Math.floor(ago/86400000)+"天前";
						}else{
							if(ago>3600000){
								releaseDate.innerHTML="发布于"+Math.floor(ago/3600000)+"小时前";
							}else{
								if(ago>60000){
									releaseDate.innerHTML="发布于"+Math.floor(ago/60000)+"分钟前";
								}else{
									if(ago>1000){
										releaseDate.innerHTML="发布于"+Math.floor(ago/1000)+"秒前";
									}else{
										releaseDate.innerHTML="发布于此时此刻此分此秒";
									};
								};
							};
						};
						if(utt.getHours()>12){
							releaseDate.setAttribute("title",(utt.getFullYear()+"年"+(utt.getMonth()+1)+"月"+utt.getDate()+"日"+" 下午"+(utt.getHours()-12)+"时"+utt.getMinutes()+"分"));
						}else{
							releaseDate.setAttribute("title",(utt.getFullYear()+"年"+(utt.getMonth()+1)+"月"+utt.getDate()+"日"+" 上午"+utt.getHours()+"时"+utt.getMinutes()+"分"))
						};
						var releaseDownload=document.createElement("div");
						releaseDownload.innerHTML="<a href="+ntxt[i].zipball_url+">点击下载该版本</a>";
						releaseBox.appendChild(releaseDownload);
					};
					var moreCommit=document.createElement("div");
					repoContentBox.appendChild(moreCommit);
					moreCommit.className="moreCommit";
					moreCommit.innerText="查看更多";
					moreCommit.onclick=function (){
						releasePage+=parseInt(1);
						repoContentBox.removeChild(moreCommit);
						console.log(releasePage);
						getRepoReleases();
					};
				};
			};
			deleteANM();
		};
		request.send();
	};
};
function getRepoContributor(){
	console.log(repo);
	var request=getHTTPObject();
	if (request){
		var repoApi="https://api.github.com/repos/"+repo+"/contributors?page="+contributorsPage+"&access_token="+to+"&t="+linktime;
		//var to=document.getElementById("t").value;
		console.log(repoApi);
		request.open("GET",repoApi,true);
		loadingANM();
		request.onreadystatechange=function(){
			if(request.readyState==4){
				var ntxt=JSON.parse(request.responseText);
				console.log(ntxt);
				if(ntxt.length<1){
					alert("居然没有了！");
				}else{
					for(i=0;i<ntxt.length;i++){
						var table=document.createElement("table");
						var tr1=document.createElement("tr");
						var tr2=document.createElement("tr");
						var td1=document.createElement("td");
						var img1=document.createElement("img");
						var td2=document.createElement("td");
						var td3=document.createElement("td");
						// var td4=document.createElement("td");
						var td5=document.createElement("td");
						repoContentBox.appendChild(table);
						table.appendChild(tr1);
						table.appendChild(tr2);
						tr1.appendChild(td1);
						tr1.appendChild(td2);
						tr1.appendChild(td3);
						// tr2.appendChild(td4);
						tr2.appendChild(td5);
						table.className='RepoContributorTable';
						td1.className='searchResultUsTd1';
						td2.className='searchResultUsTd2';
						td3.className='searchResultUsTd3';
						// td4.className='searchResultUsTd4';
						td5.className='searchResultUsTd5';
						td5.setAttribute("colspan","2");
						td1.setAttribute("rowspan","2");
						td1.appendChild(img1);
						td1.setAttribute("name",ntxt[i].login);
						td1.onclick=openUserIndex;
						img1.setAttribute("src",ntxt[i].avatar_url);
						img1.className="userImg";
						td2.innerHTML=ntxt[i].login;
						td2.setAttribute("name",ntxt[i].login);
						td2.onclick=openUserIndex;
						td3.setAttribute("name",ntxt[i].login);
						ifFollow(td3);
						var bUrl=ntxt[i].url;
						td5.setAttribute("id",ntxt[i].id);
						function getBUrl(){
							var request=getHTTPObject();
							if (request){
								var gbUrl=bUrl+"?access_token="+to+"&t="+linktime;
								//var to=document.getElementById("t").value;
								request.open("GET",gbUrl,true);
								loadingANM();
								request.onreadystatechange=function(){
									if(request.readyState==4){
										var ntxt=JSON.parse(request.responseText);
										console.log(ntxt);
										var iTd5=document.getElementById(ntxt.id);
										iTd5.innerHTML=ntxt.bio;
									};
									deleteANM();
								};
								request.send();
							};
						};
						getBUrl();
					};
					var moreCommit=document.createElement("div");
					repoContentBox.appendChild(moreCommit);
					moreCommit.className="moreCommit";
					moreCommit.innerText="查看更多";
					moreCommit.onclick=function (){
						contributorsPage+=parseInt(1);
						repoContentBox.removeChild(moreCommit);
						getRepoContributor();
					};
				};
			};
			deleteANM();
		};
		request.send();
	};
};
function getRepoTag(){
	console.log(repo);
	var request=getHTTPObject();
	if (request){
		var repoApi="https://api.github.com/repos/"+repo+"/tags?access_token="+to+"&t="+linktime;
		//var to=document.getElementById("t").value;
		console.log(repoApi);
		request.open("GET",repoApi,true);
		loadingANM();
		request.onreadystatechange=function(){
			if(request.readyState==4){
				var ntxt=JSON.parse(request.responseText);
				console.log(ntxt);
				for(i=0;i<ntxt.length;i++){
					var o1=document.createElement("option");
					var o2=document.createElement("option");
					o1.innerHTML="点击下载&nbsp"+ntxt[i].name+"的zip格式文件";
					o2.innerHTML="点击下载&nbsp"+ntxt[i].name+"的tar格式文件";
					o1.setAttribute("value",ntxt[i].zipball_url);
					o2.setAttribute("value",ntxt[i].tarball_url);
					tSelect.appendChild(o1);
					tSelect.appendChild(o2);
				};
			};
			deleteANM();
		};
		request.send();
	};
};
function getRepoReadme(){
	console.log(repo);
	var request=getHTTPObject();
	if (request){
		var repoApi="https://api.github.com/repos/"+repo+"/readme?access_token="+to+"&t="+linktime;
		//var to=document.getElementById("t").value;
		console.log(repoApi);
		request.open("GET",repoApi,true);
		loadingANM();
		request.onreadystatechange=function(){
			if(request.readyState==4){
				var ntxt=JSON.parse(request.responseText);
				console.log(ntxt);
				var repoReadme=document.createElement("div");
				repoReadme.setAttribute("id","repoReadme");
				repoContentBox.appendChild(repoReadme);
			};
			deleteANM();
		};
		request.send();
	};
};
function getRepoContent(x){
	if(x==undefined){
		var fN="";
		var dL="0";
		if(mSelect.value==null||mSelect.value==""){
			mV=mVS;
		}else{
			mV=mSelect.value;
		};
		var fNL=fN+"?ref="+mV+"&";
		var request=getHTTPObject();
		if (request){
			var repoApi="https://api.github.com/repos/"+repo+"/contents/"+fNL+"access_token="+to+"&t="+linktime;
			//var to=document.getElementById("t").value;
			console.log(repoApi);
			request.open("GET",repoApi,true);
			loadingANM();
			request.onreadystatechange=function(){
				if(request.readyState==4){
					var ntxt=JSON.parse(request.responseText);
					console.log(ntxt);
					// var repoFileSearch=document.createElement("div");
					// repoFileSearch.className="repoFileSearch";
					// repoFileSearch.innerText="点击展开所有文件夹并搜索文件";
					// repoFileSearch.onclick=collectClosedDir;
					var repoContent=document.createElement("div");
					repoContent.setAttribute("id","repoContent");
					// repoContentBox.appendChild(repoFileSearch);
					repoContentBox.appendChild(repoContent);
					for(i=0;i<ntxt.length;i++){
						var file=document.createElement("div");
						var fileName=document.createElement("div");
						var icon=document.createElement("span");
						var fileSize=document.createElement("div");
						file.appendChild(icon);
						file.appendChild(fileName);
						file.setAttribute("id",ntxt[i].name);
						fileName.innerHTML=ntxt[i].name;
						fileName.className="singleFileName";
						if(ntxt[i].type=="file"){
							repoContent.appendChild(file);
							file.onclick=function(){
								moveA();
								getRepoContent(this);
							};
							icon.className="icon-file";
						};
						if(ntxt[i].type=="dir"){
							var rCC=repoContent.children;
							if(rCC.length<1){
								repoContent.appendChild(file);
							}else{
								repoContent.insertBefore(file,rCC[0]);
							};
							icon.className="icon-folder";
							file.setAttribute("name",parseInt(dL)+parseInt(1));
							file.onclick=function(){
								getRepoContent(this);
								this.children[0].className="icon-folder-open";
								this.onclick=function gRDDN(){
									this.nextSibling.style.display="none";
									this.children[0].className="icon-folder";
									this.onclick=function(){
										this.children[0].className="icon-folder-open";
										this.nextSibling.style.display="block";
										this.onclick=gRDDN;
									};
								};
							};
						};
						if(ntxt[i].size!==0){
							file.appendChild(fileSize);
							fileSize.innerText=countSize(ntxt[i].size);
							fileSize.className="singleFileSize";
						};
					};
				};
				deleteANM();
			};
			request.send();
		};
	}else{
		if(x.className!=='chosePageN'){
			var fN=x.getAttribute("id");
			var dL=x.getAttribute("name")||"";
		}else{
			return;
		};
		if(mSelect.value==null||mSelect.value==""){
			mV=mVS;
		}else{
			mV=mSelect.value;
		};
		var fNL=fN+"?ref="+mV+"&";
		console.log(repo);
		var request=getHTTPObject();
		if (request){
			var repoApi="https://api.github.com/repos/"+repo+"/contents/"+fNL+"access_token="+to+"&t="+linktime;
			//var to=document.getElementById("t").value;
			console.log(repoApi);
			request.open("GET",repoApi,true);
			loadingANM();
			request.onreadystatechange=function(){
				if(request.readyState==4){
					var ntxt=JSON.parse(request.responseText);
					console.log(ntxt);
					if(dL!==""&&dL!==null){
						var dirContent=document.createElement("div");
						var xPN=x.parentNode;
						var xNS=x.nextSibling;
						console.log(xNS);
						if(xNS==null){
							xPN.appendChild(dirContent);
						}else{
							xPN.insertBefore(dirContent,xNS);
						};
						dirContent.style.width="88%";
						dirContent.style.backgroundColor='rgba(245,245,245,0.1)';
						dirContent.style.border='0px';
						dirContent.style.position="relative";
						dirContent.style.left="4%";
						dirContent.setAttribute("name","openedDir");
						for(i=0;i<ntxt.length;i++){
							var file=document.createElement("div");
							var fileName=document.createElement("div");
							var icon=document.createElement("span");
							var fileSize=document.createElement("div");
							file.className="dirContentDiv";
							file.appendChild(icon);
							file.appendChild(fileName);
							file.setAttribute("id",fN+"/"+ntxt[i].name);
							fileName.innerHTML=ntxt[i].name;
							fileName.className="singleFileName";
							if(ntxt[i].type=="file"){
								dirContent.appendChild(file);
								file.onclick=function(){
									moveA();
									getRepoContent(this);
								};
								icon.className="icon-file";
							};
							if(ntxt[i].type=="dir"){
								var dCC=dirContent.children;
								if(dCC.length<1){
									dirContent.appendChild(file);
								}else{
									dirContent.insertBefore(file,dCC[0]);
								};
								icon.className="icon-folder";
								file.setAttribute("name",parseInt(dL)+parseInt(1));
								file.onclick=function(){
									getRepoContent(this);
									this.children[0].className="icon-folder-open";
									this.onclick=function gRDDN(){
										this.nextSibling.style.display="none";
										this.children[0].className="icon-folder";
										this.onclick=function(){
											this.children[0].className="icon-folder-open";
											this.nextSibling.style.display="block";
											this.onclick=gRDDN;
										};
									};
								};
							};
							if(ntxt[i].size!==0){
								file.appendChild(fileSize);
								fileSize.innerText=countSize(ntxt[i].size);
								fileSize.className="singleFileSize";
							};
						};
					}else{
						var oFCB=document.getElementsByClassName("fileContentBox");
						if(oFCB.length>0){
							document.body.removeChild(oFCB[0]);
						};
						var fileContentBox=document.createElement("div");
						fileContentBox.className="fileContentBox";
						document.body.appendChild(fileContentBox);
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
						var oFCBB2=document.createElement("span");
						oFCBB2.className="icon-bin";
						oFCBB2.onclick=function(){
							moveB();
							var oFCB=document.getElementsByClassName("fileContentBox");
							if(oFCB.length>0){
								document.body.removeChild(oFCB[0]);
							};
						};
						oFCBB2.setAttribute("title","删除文件");
						fileContentBox.appendChild(fileButtMenu);
						fileButtMenu.appendChild(oFCBB1);
						fileButtMenu.appendChild(oFCBB2);
						fileButtMenu.className="fileButtMenu";
						var fNSPT=fN.split(".")[fN.split(".").length-1];
						if(fNSPT!=='bmp'&&fNSPT!=='jpg'&&fNSPT!=='png'&&fNSPT!=='tiff'&&fNSPT!=='gif'&&fNSPT!=='pcx'&&fNSPT!=='tga'&&fNSPT!=='exif'&&fNSPT!=='fpx'&&fNSPT!=='svg'&&fNSPT!=='psd'&&fNSPT!=='cdr'&&fNSPT!=='pcd'&&fNSPT!=='dxf'&&fNSPT!=='ufo'&&fNSPT!=='eps'&&fNSPT!=='ai'&&fNSPT!=='raw'&&fNSPT!=='WMF'&&fNSPT!=='md'){
							var oFCBB3=document.createElement("span");
							oFCBB3.className="icon-pencil";
							oFCBB3.onclick=function(){
								moveB();
								var oFCB=document.getElementsByClassName("fileContentBox");
								if(oFCB.length>0){
									document.body.removeChild(oFCB[0]);
								};
							};
							oFCBB3.setAttribute("title","编辑文件");
							fileButtMenu.appendChild(oFCBB3);
							var fileText=window.atob(ntxt.content.replace("\n",""));
							var fileTextS=fileText.split(/\n/);
							var fileContent=document.createElement("div");
							fileContent.className="fileContent";
							fileContentBox.appendChild(fileContent);
							var table=document.createElement("table");
							fileContent.appendChild(table);
							for(fl=0;fl<fileTextS.length;fl++){
								var tr=document.createElement("tr");
								var td1=document.createElement("td");
								td1.className="fileContentTd1";
								var td2=document.createElement("td");
								td2.className="fileContentTd2";
								table.appendChild(tr);
								tr.appendChild(td1);
								tr.appendChild(td2);
								td1.innerText=parseInt(fl)+parseInt(1);
								td2.innerHTML=fileTextS[fl].replace(/\s/g,"&nbsp");
							};
						}else{
							if(fNSPT=='md'){
								var oFCBB3=document.createElement("span");
								oFCBB3.className="icon-pencil";
								oFCBB3.onclick=function(){
									moveB();
									var oFCB=document.getElementsByClassName("fileContentBox");
									if(oFCB.length>0){
										document.body.removeChild(oFCB[0]);
									};
								};
								oFCBB3.setAttribute("title","编辑文件");
								fileButtMenu.appendChild(oFCBB3);
								var fileText=window.atob(ntxt.content.replace("\n",""));
								var fileContent=document.createElement("div");
								fileContent.className="fileContent";
								fileContentBox.appendChild(fileContent);
								fileContent.innerText=fileText;
							}else{
								var imgContent=document.createElement("img");
								imgContent.setAttribute("src","data:image/"+fNSPT+";base64,"+ntxt.content.replace("\n",""));
								fileContentBox.appendChild(imgContent);
							};
						};
					};
				};
				deleteANM();
			};
			request.send();
		};
	};
};
getRepoSet();
getRepo();
getRepoBranch();
getRepoTag();
getRepoContent();