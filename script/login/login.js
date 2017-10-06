function login(){
	if(localStorage.to==null||localStorage.to==""||localStorage.to==undefined){
		var l=document.createElement("div");
		l.setAttribute("id","loginBox");
		var d1=document.createElement("div");
		var d2=document.createElement("div");
		var s=document.createElement("div");
		var i=document.createElement("input");
		document.body.appendChild(l);
		l.appendChild(d1);
		l.appendChild(d2);
		d1.appendChild(s);
		d1.appendChild(i);
		s.innerText="输入你的token：";
		d2.innerText="登录";
		d2.onclick=function (){
			localStorage.to=i.value;
			console.log(localStorage.to);
			location.reload();
		};
	};
};
addLoadEvent(login);