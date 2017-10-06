function gistcreat(){
	var request=getHTTPObject();
	if (request){
		var to=document.getElementById("t").value;
		 var to="6f29e41b100c55643afb581eca2025ae798f5f10";
		var tolink="https://api.github.com/gists?access_token="+to;
		request.open("POST",tolink,true);
		//提取表格内的信息
		var gtitle=document.getElementById("gtitle").value;
		var gdescription=document.getElementById("gdescription").value;
		var gcontent=document.getElementById("gcontent").value;
		var gpubtrue=document.getElementById("gtrue").checked;
		var gpubfalse=document.getElementById("gfalse").checked;
		console.log(gpubtrue);
		console.log(gpubfalse);
		if(gpubtrue==true){
			gpub=true;
		};
		if(gpubfalse==true){
			gpub=false;
		};
		if(gpubtrue==false&&gpubfalse==false){
			alert("请决定Gist是否公开！");
			return;
		};
		console.log(gtitle);	
		console.log(gdescription);
		console.log(gpub);
		var pregtest='{"description":"'+gdescription+'","public":'+gpub+',"files":{"'+gtitle+'":{"content":"'+gcontent+'"}}}';
		console.log(pregtest);
		var objgtest=JSON.parse(pregtest);
		console.log(objgtest);
		var gtest=JSON.stringify(objgtest);
		//模板
		// var gtest=JSON.stringify({	
			// "description": "testdescription",
			// "public": false,
			// "files": {
				// "title": {
					// "content": "testcontent"
					// }
			// }
		// });
		console.log(gtest);
		request.send(gtest);
		request.onreadystatechange=function(){
			if(request.readyState==4){
				var ntxt=JSON.parse(request.responseText);
				console.log(ntxt);
			};
		};
	}
	else{
		alert('Sorry,your browser doesn\'t support XMLHttpRequest');
	};
};		