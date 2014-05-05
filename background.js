chrome.tabs.onUpdated.addListener(function(id, info, tab){
	var url = getLocation(tab.url);
	if (url.hostname == "soundcloud.com")
	{
    	chrome.pageAction.show(tab.id);
    }
    console.log(url);
});

var getLocation = function(href) {
    var l = document.createElement("a");
    l.href = href;
    return l;
};