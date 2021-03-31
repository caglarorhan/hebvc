console.log('content injecte edildi')

chrome.runtime.onMessage.addListener(  (request,sender, sendResponse)=>{

let zips = request.value.split(",");
console.log(zips)

    let lookUp= ()=>{
        console.log('lookup calisti');

        let result = fetch('https://heb-ecom-covid-vaccine.hebdigital-prd.com/vaccine_locations.json').then(response => response.json()).then(data => {
            //console.log(data.locations[0].zip);
            let founds = data.locations.filter(loc => loc.url!==null);
            let locals = founds.filter(loc => zips.includes(loc.zip.split('-')[0]));
            //console.log(founds);
            console.log(locals);
            location.replace(founds[0].url)
        })
    }
    window.setInterval(lookUp,2000);

});
