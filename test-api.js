const axios = require('axios');

async function test() {
  try {
    const res = await axios.get('https://ecommerce-backend-iota-six.vercel.app/api/v1/storefront/products', {
      params: { organizationId: 'default-org', limit: 2 }
    });
    console.log("RESPONSE DATA:", JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.error("ERROR:", err.message);
  }
}

test();
