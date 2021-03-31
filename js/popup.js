window.onload=()=>{
    document.querySelector('#zipMes').addEventListener('click',()=>{
        let zipList = document.querySelector('#zipList');
        if(!zipList.value){alert('Please enter at least one zip code!'); return false;}
        console.log(zipList);
m2c({value:zipList.value})
    })
}

function m2c(messageToContentSide){
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, messageToContentSide, function (response) {

        });
    });
}
