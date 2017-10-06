function count(x){
	if(x>=1000){
		if(x>=1000000){
			var ntc=new Number(x/1000000);
			x=ntc.toFixed(1)+"M";
		}else{
			var ntc=new Number(x/1000);
			x=ntc.toFixed(1)+"K";
		};
	}else{
		x=x;
	};
	return x;
};
function countSize(x){
	if(x>=1024){
		if(x>=1073741824){
			var ntc=new Number(x/1073741824);
			x=ntc.toFixed(1)+"gb";
		}else{
			if(x>=1048576){
				var ntc=new Number(x/1048576);
				x=ntc.toFixed(1)+"mb";
			}else{
				var ntc=new Number(x/1024);
				x=ntc.toFixed(1)+"kb";
			};
		};
	}else{
		x=x+"b";
	};
	return x;
;}