//function init(){
//	var anchors = document.getElementsByTagName('a');
//	var i;
//	for(i = 0; i < anchors.length; i++){
//		var a = anchors[i];
//		if(a.getAttribute("href") && !a.target)
//			a.target = '_top';
//	}
//	var forms = document.getElementsByTagName('form');
//	for(i = 0; i < forms.length; i++)
//		forms[i].target = '_top';
//}

function loadFontStylesheet(){
	//<link rel='stylesheet' type='text/css' href='fonts/DoulosSILR.css' />
	var windows = [self];
	if(parent.frames.inputFrame)
		windows.push(parent.frames.inputFrame);
	
	for(var i = 0; i < windows.length; i++){
		
		
		//console.info(top.frames[i].location, self.location.host)
		try {
			//console.info(top.frames[i])
			var head = windows[i].document.getElementsByTagName('head')[0];
			var body = windows[i].document.getElementsByTagName('body')[0];
			
			var link = document.createElement('link');
			link.rel = 'stylesheet';
			link.type = 'text/css';
			link.href = "/projects/ipa-chart/view/fonts/DoulosSILR.css";
			head.appendChild(link);
			
			body.style.fontFamily = "IPAChartFallback";
		}
		catch(e){
			console.error(e)
		}
	}
	document.getElementById('loadFontBtn').style.display = 'none';
}