
console.log("Braceltconverter loaded")
chrome.runtime.onMessage.addListener(
	function (request, sender){
		console.log("Message received: "+request.betreff);
		if(request.betreff == "start"){
			console.log("received start msg from background script")
			grabData(request.data);
		}
	}	
);

function grabData(size){

	//array full of useelemts which contains pixel data / color starting top left
	let pixels = document.getElementsByTagName("object")[0].getSVGDocument().getElementsByTagName("use");

	let pattern = [],row = [],count = 0;
	for(pixel of pixels){

		if(count < size[0]){
			row.push(window.getComputedStyle(pixel).fill);
		}else{
			pattern.push(row);
			row = [];
			count = 0;
			row.push(window.getComputedStyle(pixel).fill);
		}

		count++;
		
	}
	
	console.log(pattern)

	let parentNode  = document.getElementsByClassName("pattern")[0];

	let outputNode = document.createElement("textarea");
	outputNode.style.color  = "black";
	outputNode.rows = 15;
	outputNode.cols = 250;
	outputNode.id = "output"

	for(row2 of pattern){
		outputNode.value += row2.join("/") + "|";
	}

	document.getElementById("content").insertBefore(outputNode, parentNode);

	copyWords();
}

	function copyWords(){
		let copyText = document.getElementById("output");
		copyText.select();
		copyText.setSelectionRange(0, 9999999)
		document.execCommand("copy");
	}