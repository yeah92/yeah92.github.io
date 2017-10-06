var notice=document.getElementById("notice");
var contentBox=document.getElementById("contentBox");
function moveA(){
	notice.className="noticeN";
	contentBox.className="contentBoxN";
};
contentBox.onclick=moveA;