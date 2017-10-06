var canvas=document.getElementById("canvas");
// var body=document.getElementsByTagName("body");
// console.log(canvas);
// canvas.style.display="none";
// document.body.style.background="url('"+canvas.toDataURL()+"')";
window.onscroll=window.onresize=function(){
	var wst=document.documentElement.scrollTop||document.body.scrollTop;
	var bch=document.documentElement.clientHeight||document.body.clientHeight;
	var dh=canvas.offsetHeight;
	var wsl=document.documentElement.scrollLeft||document.body.scrollLeft;
	var bcw=document.documentElement.clientWidth||document.body.clientWidth;
	var dw=canvas.offsetWidth;
	canvas.style.top=wst+((bch-dh)/2)+"px";
	canvas.style.left=wsl+((bcw-dw)/2)+"px";
}