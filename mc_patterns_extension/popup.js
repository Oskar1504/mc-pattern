window.onload=function(){
	document.getElementById("start").addEventListener("click",  function() {start();},false );
}




//sends message to the current tab u looking on
function start(){
	let msg = {
		betreff:"start",
		data:[document.getElementById("width").value],
		msg:"popup send start"
	}
	chrome.runtime.sendMessage(msg);
}

