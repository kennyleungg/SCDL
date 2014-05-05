var getLocation = function(href) {
    var l = document.createElement("a");
    l.href = href;
    return l;
};

var  scQuery = {
	preURL:"https://api.sndcdn.com/resolve?url=https%3A//soundcloud.com",
	postURL:"&_status_code_map%5B302%5D=200&_status_format=json&client_id=YOUR_CLIENT_ID",

	request: function(songDirectory) {
		console.log(this.preURL + songDirectory + this.postURL);
		var xmlhttp= new XMLHttpRequest();
		xmlhttp.open("GET", this.preURL + songDirectory + this.postURL, true);
		xmlhttp.onload = this.locationRequest.bind(this);
    	xmlhttp.send(null);
	},

	locationRequest: function(e) {
		var response = e.target.response;
		var jsonResponse = JSON.parse(response);
		console.log(jsonResponse);
		if (jsonResponse.location) {
			var xmlhttp= new XMLHttpRequest();
			xmlhttp.open("GET", jsonResponse.location, true);
			xmlhttp.onload = this.apiRequest.bind(this);
	    	xmlhttp.send(null);
		}
	},

	apiRequest: function(e) {
		var response = e.target.response;
		var parser = new DOMParser();
  		var xmlResponse = parser.parseFromString(response,"text/xml");
  		if (xmlResponse)
  		{
  			var streamURLs = xmlResponse.getElementsByTagName("stream-url");
  			console.log(streamURLs);
  			if (streamURLs && streamURLs.length > 0) {
  				var songTitle = xmlResponse.getElementsByTagName("title")[0].innerHTML + ".mp3";
  				console.log(document.getElementById("bodyText"));
  				document.getElementById("bodyText").innerHTML = songTitle;

  				var button = document.createElement('a');
				button.id = "divButton";
				button.innerHTML = "Download!";
				button.href = streamURLs[0].innerHTML + "?client_id=YOUR_CLIENT_ID";
				button.download = songTitle;
				document.body.appendChild(button);
  			}
  			
  		}
		
	},

	loadStream: function(e) {
		console.log(e);
	}
};

var test = function() {
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
		var url = getLocation(tabs[0].url);
		console.log(url.pathname);
		scQuery.request(url.pathname);
	});
};

document.addEventListener('DOMContentLoaded', function () {
	test();
 //  	var button = document.createElement('div');
	// button.id = "divButton";
	// button.innerHTML = "Download!";
	// if (button.addEventListener) {  // all browsers except IE before version 9
	//   button.addEventListener("click", test, false);
	// } else {
	//   if (button.attachEvent) {   // IE before version 9
	//     button.attachEvent("click", test);
	//   }
	// }
	// document.body.appendChild(button);
});

