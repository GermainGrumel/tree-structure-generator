let arbo = document.querySelector('ul.tree');
var svgNs = "http://www.w3.org/2000/svg";
let svgBG = document.createElementNS(svgNs, 'svg');
svgBG.setAttribute('class', 'svg-wrapper ');
arbo.parentNode.insertBefore(svgBG, arbo);

let child = document.querySelectorAll('ul.tree ul div');

function generateSvg(width) {
	for (let i = 0; i < child.length; i++) {
		let x1, y1, x2, y2;
		let parent = child[i].parentNode.parentNode.parentNode.querySelector('div');
		let path = document.createElementNS(svgNs, 'path');

		if(width > 800) {
			x1 = child[i].offsetLeft+child[i].offsetWidth/2;
			y1 = child[i].offsetTop;
			x2 = parent.offsetLeft+parent.offsetWidth/2;
			y2 = parent.offsetTop+parent.offsetHeight;
			path.setAttribute('d', 
				 ' M '+x1+','+y1
				+' L '+x1+','+(y1-12)
				+' L '+x2+','+(y2+12)
				+' L '+x2+','+y2);
			if(child[i].parentNode.nextElementSibling || child[i].parentNode.previousElementSibling) {
			} else{
				path.setAttribute('d',
					' M '+x1+','+y1
					+' V '+y2);
			}
		} else {
			x1 = child[i].offsetLeft;
			y1 = child[i].offsetTop+child[i].offsetHeight/2;
			x2 = parent.offsetLeft+12;
			y2 = parent.offsetTop+parent.offsetHeight;
			path.setAttribute('d', 
				 ' M '+x1+','+y1
				+' L '+(x1-12)+','+y1
				+' L '+x2+','+y2);
		}
		path.setAttribute('stroke', "black");
		path.setAttribute('stroke-width', "2");
		path.setAttribute('fill', "transparent");
		svgBG.append(path);
	}
}

function resize() {
	svgBG.setAttribute('view-box', '0 0 '+arbo.offsetWidth+' '+arbo.offsetHeight);
	svgBG.setAttribute('height', arbo.offsetHeight);
	svgBG.setAttribute('width', arbo.offsetWidth);
	svgBG.innerHTML = '';
	generateSvg(arbo.offsetWidth);
}

// resize();
// window.onresize = resize;