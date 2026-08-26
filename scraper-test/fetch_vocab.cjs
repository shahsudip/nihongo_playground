const fs = require('fs');

async function scrapeVocab() {
  const url = 'https://www.jlptmatome.com/jlpt-n5-vocabulary-list';
  const response = await fetch(url);
  const html = await response.text();
  
  const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">(.+?)<\/script>/);
  if (match) {
    const data = JSON.parse(match[1]);
    const props = data.props.pageProps;
    let list = [];
    if (props.data) {
        list = props.data;
    } else if (props.page) {
        // JLPTMatome stores its lists differently sometimes.
        console.log(Object.keys(props.page));
    }
    
    // Look for application/ld+json script which sometimes has the table data
    const ldMatch = html.match(/<script type="application\/ld\+json">([\s\S]+?)<\/script>/g);
    if (ldMatch) {
        console.log("Found ld+json");
        for (const m of ldMatch) {
            if (m.includes('ItemList') || m.includes('Vocab')) {
                console.log(m.substring(0, 500));
            }
        }
    }

    console.log("Saving HTML...");
    fs.writeFileSync('n5_vocab_list.html', html);
  }
}

scrapeVocab();
