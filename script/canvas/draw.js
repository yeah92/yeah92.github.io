<script type="text/paperscript" canvas="canvas"></script>
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
	<!-- console.log(m17b.position); -->
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
	<!-- console.log(m17a.position); -->
	function m18m(){
		m18PI=m18PI+0.01;
	};
	function m19m(){
		m19PI=m19PI+0.007;
	};
	setInterval(m18m,10);
	setInterval(m19m,10);
	function onFrame(event){
		vector = vector + (mouseVector - vector) / 3000;
		for (var i = 0; i < count; i++) {
		var item = project.activeLayer.children[i];
		var size = item.bounds.size;
		var length = vector.length / 10 * size.width / 10;
		item.position += vector.normalize(length) + item.data.vector;
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
		
		

	// Run through the active layer's children list and change
	// the position of the placed symbols:
	
	};
	function onResize(){
		m18.position=[window.innerWidth*0.618+m18x,window.innerHeight*0.618+m18y];
		m18r.position=[window.innerWidth*0.618,window.innerHeight*0.618];
		m19.position=[window.innerWidth*0.618+m19x,window.innerHeight*0.618+m19y];
		m19r.position=[window.innerWidth*0.618,window.innerHeight*0.618];
		m17a.position=[window.innerWidth*0.618+120*Math.sin(23*Math.PI/180)/10.1,window.innerHeight*0.618-120*Math.cos(23*Math.PI/180)/3];
		m17b.position=[window.innerWidth*0.618-120*Math.sin(23*Math.PI/180)/10.1,window.innerHeight*0.618+120*Math.cos(23*Math.PI/180)/3];
	};
	   // The amount of symbol we want to place;
    var count = 30;

    // Create a symbol, which we will use to place instances of later:
    var path = new Path.Circle({
        center: new Point(0, 0),
        radius: 5,
        fillColor: 'white',
    });

    var symbol = new SymbolDefinition(path);

    // Place the instances of the symbol:
    for (var i = 0; i < count; i++) {
        // The center position is a random point in the view:
        var center = Point.random() * view.size;
        var placed = symbol.place(center);
        var scale = (i + 1) / count;
        placed.scale(scale);
		<!-- console.log(scale); -->
		if (scale<0.8){
			placed.insertBelow(m17a);
			placed.insertBelow(m17b);
		};
        placed.data.vector = new Point({
            angle: Math.random() * 360,
            length : scale * Math.random() / 5
        });
    }

    var vector = new Point({
        angle: 45,
        length: 0
    });

    var mouseVector = vector.clone();

    function onMouseMove(event) {
        mouseVector = (view.center - event.point)/50;
    };

    // The onFrame function is called up to 60 times a second:
    function keepInView(item) {
        var position = item.position;
        var itemBounds = item.bounds;
        var bounds = view.bounds;
        if (itemBounds.left > bounds.width) {
            position.x = -item.bounds.width/10;
        }

        if (position.x < -itemBounds.width) {
            position.x = (bounds.width + itemBounds.width)/10;
        }

        if (itemBounds.top > view.size.height) {
            position.y = -itemBounds.height/10;
        }

        if (position.y < -itemBounds.height) {
            position.y = (bounds.height  + itemBounds.height / 2)/10;
        }
    };
