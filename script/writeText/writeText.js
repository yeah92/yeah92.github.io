function writeText(x){
	var b=new RegExp(/@[a-z|0-9]+(?= )/,'ig');
	var c=new RegExp(/@[a-z|0-9]+(?!s|.)/,'ig');
	var m=new RegExp(/[a-z|0-9|.|@]+(?=>)/,'g');
	var d=x.match(b);
	var e=x.match(c);
	var f=x.match(m);
	if(d!==null){
		for(di=0;di<d.length;di++){
			var rd=d[di].replace('@','');
			x=x.replace(d[di],"<a href='userIndex.html?="+rd+"'>"+d[di]+"</a>");
		};
	};
	if(e!==null){
		var re=e[e.length-1];
		var rre=e[e.length-1].replace('@','');
		x=x.replace(re,"<a href='userIndex.html?="+rre+"'>"+re+"</a>");
	};
	if(f!==null){
		for(fi=0;fi<f.length;fi++){
		var rf='<'+f[fi]+'>';
		x=x.replace(rf,"<a href='mailto:"+f[fi]+"'>"+f[fi]+"</a>");
		};
	};
	return x;
};