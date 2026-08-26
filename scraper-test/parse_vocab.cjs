const fs = require('fs');
const html = fs.readFileSync('n5_vocab_list.html', 'utf8');
const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">(.+?)<\/script>/);
if (match) {
  const data = JSON.parse(match[1]);
  const props = data.props.pageProps;
  console.log(Object.keys(props));
  if (props.data) {
    console.log('Items:', props.data.length);
    console.log(JSON.stringify(props.data[0], null, 2));
  } else if (props.initialData) {
    console.log('Items:', props.initialData.length);
    console.log(JSON.stringify(props.initialData[0], null, 2));
  } else if (props.page) {
      console.log(Object.keys(props.page));
  }
} else {
    console.log("No NEXT_DATA found");
}
