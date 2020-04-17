const BASE_URL = 'https://cfw-takehome.developers.workers.dev/api/variants';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

class CustomWriter {
    element(element) {
        if(element.tagName === 'title') {
            element.setInnerContent("Nikhil Nayak")
        }
        if(element.tagName === 'h1') {
            element.setInnerContent("Nikhil Nayak Variant")
        }
        if(element.tagName==='p') {
            element.setInnerContent("Final year undergrad computer science student.")
        }
        if(element.tagName === 'a') {
            element.setAttribute('href', 'https://nikhilnayak.dev')
            element.setInnerContent("My Website")
        }
    }
}

/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
    try {
        let response = await fetch(BASE_URL);
        let rand = Math.floor(Math.random() * 2);
        let data = await response.json();
        let request = new Request(data['variants'][rand]);
        let result = await fetch(request);
        result = new Response(result.body, result);
        result.headers.set('set-cookie', "id=" + rand.toString() + "Expires=30 April 2020,Secure, HttpOnly");
        var hwriter = new HTMLRewriter();
        hwriter.on('p', new CustomWriter()).on('title', new CustomWriter()).on('a', new CustomWriter()).on('h1', new CustomWriter());
        return hwriter.transform(result);
  }
  catch(e){
    console.log("Exception: " + e)
  }
}
