	var m18PI=0;
		var m19PI=0;
		var m18x=200*Math.cos(m18PI);
		var m18y=52*Math.sin(m18PI);
		var m19x=300*Math.cos(m19PI);
		var m19y=98*Math.sin(m19PI);
		var m17b=new Path.Arc({
			position:[window.innerWidth*0.618-120*Math.sin(23*Math.PI/180)/10.1,window.innerHeight*0.618+120*Math.cos(23*Math.PI/180)/3],
			from:[window.innerWidth*0.618-120*Math.cos(23*Math.PI/180),window.innerHeight*0.618-120*Math.sin(23*Math.PI/180)-1.2],
			through:[window.innerWidth*0.618-120*Math.sin(23*Math.PI/180),window.innerHeight*0.618+120*Math.cos(23*Math.PI/180)],
			to:[window.innerWidth*0.618+120*Math.cos(23*Math.PI/180),window.innerHeight*0.618+120*Math.sin(23*Math.PI/180)-1.2],
			strokeColor:"#ffc1c1",
			strokeWidth:4,
			fillColor:"#cc5151",
		});
		var m18r=new Shape.Ellipse({
			position:[window.innerWidth*0.618,window.innerHeight*0.618],
			radius:[200,52],
			strokeColor:'#ffffe5',
			strokeWidth:4,
			rotation:23,
		});
		var m18=new Shape.Circle({
			position:[window.innerWidth*0.618+m18x,window.innerHeight*0.618+m18y],
			radius:12,
			fillColor:'#a0522d',
		});
		var m19r=new Path.Ellipse({
			position:[window.innerWidth*0.618,window.innerHeight*0.618],
			radius:[300,98],
			strokeColor:'#fffff4',
			strokeWidth:4,
			rotation:23,
		});
		var m19=new Shape.Circle({
			position:[window.innerWidth*0.618+m19x,window.innerHeight*0.618+m19y],
			radius:20,
			fillColor:'#daa520',
		});
		var m17a=new Path.Arc({
			position:[window.innerWidth*0.618+120*Math.sin(23*Math.PI/180)/10.1,window.innerHeight*0.618-120*Math.cos(23*Math.PI/180)/3],
			from:[window.innerWidth*0.618-120*Math.cos(23*Math.PI/180),window.innerHeight*0.618-120*Math.sin(23*Math.PI/180)+1.2],
			through:[window.innerWidth*0.618+120*Math.sin(23*Math.PI/180),window.innerHeight*0.618-120*Math.cos(23*Math.PI/180)],
			to:[window.innerWidth*0.618+120*Math.cos(23*Math.PI/180),window.innerHeight*0.618+120*Math.sin(23*Math.PI/180)+1.2],
			strokeColor:"#ffc1c1",
			strokeWidth:4,
			fillColor:"#cc5151",
		});
		function m18m(){
			m18PI=m18PI+0.01;
		};
		function m19m(){
			m19PI=m19PI+0.007;
		};
		setInterval(m18m,10);
		setInterval(m19m,10);
    var count = 30;
    var path = new Path.Circle({
        center: new Point(750, 750),
        radius: 5,
        fillColor: 'white',
    });
    var symbol = new SymbolDefinition(path);
    for (var i = 0; i < (count-6); i++) {
        var center = Point.random() * view.size;
        var placed = symbol.place(center);
        var scale = (i + 2) / count ;
        placed.scale(scale);
		if (scale<0.5){
			placed.insertBelow(m17a);
			placed.insertBelow(m17b);
		};
        placed.data.vector = new Point({
            angle: Math.random() * 360,
            length : (scale * Math.random() / 700 ),
        });
    }
    var vector = new Point({
        angle: 45,
        length: 0
    });
    var mouseVector = vector.clone()+18;
    function onMouseMove(event) {
        mouseVector = (view.center - event.point)/1;
    };
    function keepInView(item) {
        var position = item.position;
        var itemBounds = item.bounds;
        var bounds = view.bounds;
        if (itemBounds.left > bounds.width) {
            position.x = -item.bounds.width;
        }

        if (position.x < -itemBounds.width) {
            position.x = bounds.width;
        }

        if (itemBounds.top > view.size.height) {
            position.y = -itemBounds.height;
        }

        if (position.y < -itemBounds.height) {
            position.y = bounds.height  + itemBounds.height / 2;
        }
	};
	function onFrame(event){
		vector = vector + (mouseVector - vector) / 3000;
		for (var i = 0; i < count; i++) {
			var item = project.activeLayer.children[i];
			var size = item.bounds.size;
			var length = vector.length / 10 * size.width / 10;
			item.position += (vector.normalize(length) + item.data.vector) / 1;
			keepInView(item);
		};			
		var m18x=200*Math.cos(m18PI);
		var m18y=52*Math.sin(m18PI);
		var p18=new paper.Point(window.innerWidth*0.618+m18x,window.innerHeight*0.618+m18y);
		m18.position=p18;
		m18.rotate(23,[window.innerWidth*0.618,window.innerHeight*0.618]);
		var m19x=300*Math.cos(m19PI);
		var m19y=98*Math.sin(m19PI);
		var p19=new paper.Point(window.innerWidth*0.618+m19x,window.innerHeight*0.618+m19y);
		m19.position=p19;
		m19.rotate(23,[window.innerWidth*0.618,window.innerHeight*0.618]);
		<!-- m18.position=[window.innerWidth*0.618+m18x,window.innerHeight*0.618+m18y]; -->
		m18r.position=[window.innerWidth*0.618,window.innerHeight*0.618];
		<!-- m19.position=[window.innerWidth*0.618+m19x,window.innerHeight*0.618+m19y]; -->
		m19r.position=[window.innerWidth*0.618,window.innerHeight*0.618];
		m17a.position=[window.innerWidth*0.618+120*Math.sin(23*Math.PI/180)/10.1,window.innerHeight*0.618-120*Math.cos(23*Math.PI/180)/3];
		m17b.position=[window.innerWidth*0.618-120*Math.sin(23*Math.PI/180)/10.1,window.innerHeight*0.618+120*Math.cos(23*Math.PI/180)/3];        
	};
	function onResize(){
		m18.position=[window.innerWidth*0.618+m18x,window.innerHeight*0.618+m18y];
		m18r.position=[window.innerWidth*0.618,window.innerHeight*0.618];
		m19.position=[window.innerWidth*0.618+m19x,window.innerHeight*0.618+m19y];
		m19r.position=[window.innerWidth*0.618,window.innerHeight*0.618];
		m17a.position=[window.innerWidth*0.618+120*Math.sin(23*Math.PI/180)/10.1,window.innerHeight*0.618-120*Math.cos(23*Math.PI/180)/3];
		m17b.position=[window.innerWidth*0.618-120*Math.sin(23*Math.PI/180)/10.1,window.innerHeight*0.618+120*Math.cos(23*Math.PI/180)/3];
	};