const axios = require('axios')


const url = 'http://192.168.0.104:3000/api/products';

const data = {
  name: "name",
  price: 123,
  picture: "picture",
  description: "a"
};

const postData = async () => {
    await axios.post(url, data);
};


const sendRequest = async (url) => {
    console.log('sending', url)
  await axios.get(url);
};

const main = async () => {
  const url = 'http://192.168.0.104:3000/api/products';
  while (true) {
    await sendRequest(url)
  }
};

for (let i = 0; i < 24; i++) {
  main();
}