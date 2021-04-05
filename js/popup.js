window.onload=()=>{
    document.querySelector('#zipMes').addEventListener('click',()=>{
        let zipList = document.querySelector('#zipList');
        let refreshRate = document.querySelector('#refreshRate');
        let refreshrate = refreshRate.value || 1500;
        let filterBy = document.getElementsByName('filterBy').value;
        if(!zipList.value){alert('Please enter at least one zip code!'); return false;}

        m2c({ziplist:zipList.value, refreshrate, filterBy});

        document.querySelector('#heart').style.display='';
    })

    getmeToTheCurrentURL("https://vaccine.heb.com/scheduler");

}


function getmeToTheCurrentURL(incomingURL){
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
            chrome.tabs.update({url: incomingURL});
    })
}


function m2c(messageToContentSide){
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, messageToContentSide, function (response) {
        });
    });
}

//Receiving message from the content side
chrome.runtime.onMessage.addListener((request)=>{
    if(request.targetUrl){
        getmeToTheCurrentURL(request.targetUrl)
    }
    return true;
});
