const arbo = document.querySelector('ul.tree');
const svgNs = "http://www.w3.org/2000/svg";
const child = document.querySelectorAll('ul.tree ul div');
const svgBG = document.createElementNS(svgNs, 'svg');
var resizeTimeOut;

svgBG.setAttribute('class', 'svg-wrapper ');
arbo.parentNode.insertBefore(svgBG, arbo);


function generateSvg(width) {
	svgBG.style.display = 'none';
	for (let i = 0; i < child.length; i++) {
		let x1, y1, x2, y2;
		let parent = child[i].parentNode.parentNode.parentNode.querySelector('div');
		let path = document.createElementNS(svgNs, 'path');
		path.id = "linesvg-"+i;
		let animate = document.createElementNS(svgNs, 'animate');

		if(width > 1000) {
			x1 = child[i].offsetLeft+child[i].offsetWidth/2;
			y1 = child[i].offsetTop;
			x2 = parent.offsetLeft+parent.offsetWidth/2;
			y2 = parent.offsetTop+parent.offsetHeight;
			if(child[i].parentNode.nextElementSibling || child[i].parentNode.previousElementSibling) {
				path.setAttribute('d', 
					 ' M '+x1+','+y1
					+' V '+(y1-12)
					+' H '+x2
					+' V '+y2);
			} else {
				path.setAttribute('d',
					' M '+x1+','+y1
					+' V '+y2);
			}
		} 
		else if(width >= 600) {
			x1 = child[i].offsetLeft;
			y1 = child[i].offsetTop+child[i].offsetHeight/2;
			x2 = parent.offsetLeft+parent.offsetWidth;
			y2 = parent.offsetTop+parent.offsetHeight/2;
			if(child[i].parentNode.nextElementSibling || child[i].parentNode.previousElementSibling) {
				path.setAttribute('d', 
					 ' M '+x1+','+y1
					+' H '+(x1-12)
					+' V '+y2
					+' H '+x2);
			} else {
				path.setAttribute('d',
					' M '+x1+','+y1
					+' H '+x2);
			}

		} else {
			x1 = child[i].offsetLeft;
			y1 = child[i].offsetTop+child[i].offsetHeight/2;
			x2 = parent.offsetLeft+12;
			y2 = parent.offsetTop+parent.offsetHeight;
			path.setAttribute('d', 
				 ' M '+x1+','+y1
				+' H '+(x1-12)
				+' V '+y2);
		}
		path.setAttribute('stroke', "black");
		path.setAttribute('stroke-width', "2");
		path.setAttribute('fill', "transparent");
		svgBG.append(path);
	}
}

function branchReload(width) {
	svgBG.style.animation =  '';
	setTimeout(function() {
		svgBG.style.display = 'block';
		if(width > 1000) {
			svgBG.style.animation =  'bgFromTop 3s ease-in';
		} else {
			svgBG.style.animation =  'bgFromLeft 3s ease-in';
		}
	}, 0);
}

function resize() {
	svgBG.setAttribute('view-box', '0 0 '+arbo.offsetWidth+' '+arbo.offsetHeight);
	svgBG.setAttribute('height', arbo.offsetHeight);
	svgBG.setAttribute('width', arbo.offsetWidth);
	svgBG.innerHTML = '';
	generateSvg(arbo.offsetWidth);
	clearTimeout(resizeTimeOut);
	resizeTimeOut = setTimeout(function() {branchReload(arbo.offsetWidth)}, 100);
}

resize();
window.onresize = resize;