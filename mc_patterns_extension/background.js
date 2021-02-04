

chrome.runtime.onMessage.addListener(
	function (request, sender) {
		console.log("------------MSG-RECEIVED: "+request.betreff+"-------------");

		if(request.betreff == "start"){
			console.log(request.msg);
			chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
				console.log("------STARTING SETUP------");
			  	chrome.tabs.sendMessage(tab[0].id,{betreff:'start',data:request.data});
			});

		}
	}
);
