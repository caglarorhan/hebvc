window.onload=()=>{
    document.querySelector('#zipMes').addEventListener('click',()=>{
        let zipList = document.querySelector('#zipList');
        let refreshRate = document.querySelector('#refreshRate');
        let refreshrate = refreshRate.value || 1500;
        if(!zipList.value){alert('Please enter at least one zip code!'); return false;}
m2c({ziplist:zipList.value, refreshrate})
    })

    getmeToTheCurrentURL();
}


function getmeToTheCurrentURL(){
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
            chrome.tabs.update({url: "https://vaccine.heb.com/scheduler"});
    })
}


function m2c(messageToContentSide){
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, messageToContentSide, function (response) {
        });
    });
}

