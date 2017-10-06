function divScrollbar(x){
	var ad=document.getElementById(x);
	var adsbyc=document.createElement("div");
	var adsby=document.createElement("div");
	adsbyc.className='sbyc';
	adsby.className='sby';
	ad.appendChild(adsbyc);
	adsbyc.appendChild(adsby);
	function adsb(){
		var adst=ad.scrollTop;
		var adsl=ad.scrollLeft;
		var adsh=ad.scrollHeight;
		var adsw=ad.scrollWidth;
		var adoh=ad.offsetHeight;
		var adow=ad.offsetWidth;
		if(adsh<=adoh){
			adsbyc.style.display="none";
			adsby.style.display="none";
			ad.removeEventListener('DOMMouseScroll',adms);
			ad.removeEventListener('mousewheel',adms);
			ad.removeEventListener("mouseup",admouseTwo);
		}else{
			adsbyc.style.display="block";
			adsby.style.display="block";
			adsbyc.style.left=adow-6+'px';
			adsbyc.style.height=adoh+'px';
			adsbyc.style.width=6+'px';
			// adsbyc.style.position="absolute";
			// adsbyc.style.zIndex="10";
			// adsbyc.style.margin="0px";
			adsby.style.height=adoh/adsh*adsbyc.offsetHeight+'px';
			adsby.style.width=6+'px';
			// adsby.style.position="absolute";
			// adsby.style.zIndex="10";
			// adsby.style.margin="0px";
			if(adst<=adsh-adoh){
				adsbyc.style.top=adst+'px';
				adsby.style.top=adst/adsh*adsbyc.offsetHeight+'px';
			}else{
				adsbyc.style.top=adsh-adsbyc.offsetHeight+'px';
				adsby.style.top=adsbyc.offsetHeight-adsby.offsetHeight+'px';
			};
			// adsby.style.backgroundColor="red";
			ad.addEventListener('DOMMouseScroll',adms);
			ad.addEventListener('mousewheel',adms);
			ad.addEventListener("mouseup",admouseTwo);
		};
		// if(adsw<=adow){
			// sbxc.style.display="none";
			// sbx.style.display="none";
		// }else{
			// sbxc.style.top=adoh-6+'px';
			// sbxc.style.height=6+'px';
			// sbxc.style.width=adow-6+'px';
			// sbx.style.height=6+'px';
			// sbx.style.width=adow/adsw*sbxc.offsetWidth+'px';
			// if(adsl<=adsw-adow){
				// sbxc.style.left=adsl+'px';
				// sbx.style.left=adsl/adsw*sbxc.offsetWidth+'px';
			// }else{
				// sbxc.style.left=adsw-sbc.offsetWidth+'px';
				// sbx.style.left=sbxc.offsetWidth-sbc.offsetWidth+'px';
			// };
			// sbx.style.backgroundColor="blue";
		// };
	};
	adsb();
	function adms(a){
		var e = a || ad.event; 
		e.stopPropagation();	
		if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件               
			if (e.wheelDelta > 0) { //当滑轮向上滚动时  
				ad.scrollTop+=-50;
			}  
			if (e.wheelDelta < 0) { //当滑轮向下滚动时  
				ad.scrollTop+=50;
			}  
		} else if (e.detail) {  //Firefox滑轮事件  
			if (e.detail> 0) { //当滑轮向下滚动时  
				this.scrollBy(0,50);
			}  
			if (e.detail< 0) { //当滑轮向上滚动时  
				this.scrollBy(0,-50);
			}  
		}  
	};
	function adymsd(evt){
		var adsh=ad.scrollHeight;
		var mevent=evt||event;
		mevent.stopPropagation();
		mdy=mevent.clientY;
		ad.onmousemove=function(evt){
			var mevent=evt||event;
			mevent.stopPropagation();
			mmy=mevent.clientY;
			var yVector=(mmy-mdy)/adsbyc.offsetHeight*adsh;
			mdy=mmy;
			ad.scrollTop+=yVector;
			adsb();
			ad.onmouseup=function (){
				ad.onmousemove=null;
				ad.onmouseup=mouseTwo;
			};
		};
	};
	function admouseTwo(evt){
		var mevent=evt||event;
		mevent.stopPropagation();
		mdy=mevent.clientY;
		if (mevent.button==1){
			var adsh=ad.scrollHeight;
			ad.onmousemove=function(evt){
				var mevent=evt||event;
				mevent.stopPropagation();
				mmy=mevent.clientY;
				var yVector=(mmy-mdy)/adsbyc.offsetHeight*adsh;
				ad.scrollTop+=yVector;
				adsb();
			};
			ad.onmouseup=function (){
				ad.onmousemove=null;
				// ad.onmouseup=admouseTwo;
			};
		};
	};
	
	adsby.addEventListener("mousedown",adymsd);
	ad.addEventListener('DOMMouseScroll',adsb);
	ad.addEventListener('mousewheel',adsb);
	ad.addEventListener('mouseover',adsb);
	ad.addEventListener("mouseout",function (){
		adsbyc.style.display="none";
		adsby.style.display="none";
	});
	addOnload(adsb);
	addOnresize(adsb);
};
// divScrollbar("c");