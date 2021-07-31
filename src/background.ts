/* When the browser-action button is clicked... */
chrome.browserAction.onClicked.addListener(function(tab) {
    console.log(tab);
    chrome.tabs.sendMessage(tab.id, {
        command: "change_title",
        title: "hoge"
      },
      function(msg) {
        console.log("result message:", msg);
      });
  });
console.log('test');
chrome.alarms.create('NAME_OF_ALARM', { delayInMinutes: 1, periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name == 'NAME_OF_ALARM') {
    console.log('on_alarm');
    chrome.tabs.query( {title:'最新ツイート / Twitter'}, function(tabs){
      console.log(tabs);
      console.log(tabs[0]);
      chrome.tabs.sendMessage(tabs[0].id, {
        command: "change_title",
          title: "hoge"
        },
        function(msg) {
          console.log("result message:", msg);
        });
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender) => {
	if(request.type == 'users_theme'){//ここで判別
		console.log(request.data[0]);
    localStorage.setItem(request.data[0], request.data[1]);
    console.log(localStorage.getItem("testKey"));
		return true;
	}
});