chrome.runtime.onMessage.addListener(  (request,sender, sendResponse)=>{
console.log(request);
let zips = request.ziplist.split(",");
let refreshrate = parseInt(request.refreshrate);
    let lookUp= ()=>{
        console.log('❤');
        let result = fetch('https://heb-ecom-covid-vaccine.hebdigital-prd.com/vaccine_locations.json').then(response => response.json()).then(data => {
            let founds = [];
            if(request.filterBy==='openTimeslots'){
                founds = data.locations.filter(loc => loc.openTimeslots>0);
            }else{
                founds = data.locations.filter(loc => loc.url!==null);
            }


            let locals = founds.filter(loc => zips.includes(loc.zip.split('-')[0]));
            if(locals.length>0){
                //location.replace(locals[0].url)
                m2p({targetUrl:locals[0].url})
            }

        })
    }
    window.setInterval(lookUp,refreshrate);

});

function m2p(outgoingMessage){
    chrome.runtime.sendMessage(outgoingMessage);
}

console.log('HEBvc on duty!');

if(document.location.href==="https://vaccine.heb.com/scheduler") {
    console.log('Requesting and checking HEB vaccine slots json data file ...');
}else if(document.location.href.startsWith('https://heb.secure.force.com/FlexibleScheduler')){
    // let myAudio = new Audio(chrome.runtime.getURL("./sounds/carhorn.mp3"));
    // myAudio.play();



    let dynaDOM = document;
    let oFunc = (inputElementIndexNo)=>{
        let butt = document.createElement('button');
        butt.type='button'; butt.style.display='none';
        // Date Appointment Input/Option
        dynaDOM.forms[0].elements[inputElementIndexNo].insertAdjacentElement('afterend', butt);
        butt.focus();
        butt.parentNode.click(); //open options (also get from state for first time)
        console.log('Date options are open');
        let targetParent = butt.parentNode.parentNode.parentNode;
return new Promise((resolve)=>{
    try{
        let optionContainer = targetParent.children[0].children[1].children[0];
        //console.log(optionContainer);
        optionContainer.click();
        butt.remove();
        resolve();
    }catch(e){console.log(`Hata:${e}`); butt.remove(); resolve();}
})

    }



    let subMit = ()=>{
        return new Promise((resolve)=>{
            let butt = document.createElement('button');
            butt.type='button'; butt.style.display='none';
            dynaDOM.forms[0].insertAdjacentElement('afterend', butt);

            let countTo = setInterval(()=>{
                let cTarget = butt.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.children[0].children[0];
                //console.log(cTarget);
                if(cTarget.title='Continue'){
                    resolve(cTarget);
                    clearInterval(countTo);
                }else{
                    console.log(`Target couldnt found: ${cTarget}`)
                }

            },400)


        })


    }

    let goGo = ()=>{
        oFunc(1).then(response=>{
            oFunc(1).then(response=>{
                oFunc(2).then(response=>{
                    oFunc(2).then(response=>{
                        subMit().then(butt=>{butt.click();})
                    })
                })
            })
        })
    }



    let waitBit = setTimeout(goGo,2500);



}

