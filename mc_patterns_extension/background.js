

chrome.runtime.onMessage.addListener(
	function (request, sender) {
		console.log("------------MSG-RECEIVED: "+request.betreff+"-------------");

		if(request.betreff == "start"){
			console.log(request.msg);
			chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
				console.log("------STARTING SETUP------");
			  	chrome.tabs.sendMessage(tab[0].id,{betreff:'start',data:[]});
			});

		}
	}
);


function download(array){
	console.log(array);
	var a = document.createElement('a');
		var file = new Blob([ array.join('\n') ], { type: 'text/plain' });

		a.href = URL.createObjectURL(file);
		a.download = 'ygo_preise_'+getTime()+'.txt';
		a.click();

		end_data = [];
		g_seriennummern = [];
}


    function getTime() {
        let d = new Date();
        let n = d.getHours();
        let m = d.getMinutes();
        let s = d.getSeconds();
        let output = n + "_"+m +"_"+s;
        return output;
    }