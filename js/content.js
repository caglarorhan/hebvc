chrome.runtime.onMessage.addListener(  (request,sender, sendResponse)=>{
console.log(request);
let zips = request.ziplist.split(",");
let refreshrate = parseInt(request.refreshrate);
    let lookUp= ()=>{
        console.log('❤');
        let result = fetch('https://heb-ecom-covid-vaccine.hebdigital-prd.com/vaccine_locations.json').then(response => response.json()).then(data => {
            let founds = data.locations.filter(loc => loc.url!==null);
            let locals = founds.filter(loc => zips.includes(loc.zip.split('-')[0]));
            if(locals.length>0){
                location.replace(locals[0].url)
            }

        })
    }
    window.setInterval(lookUp,refreshrate);

});
