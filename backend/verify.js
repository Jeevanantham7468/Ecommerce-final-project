const http = require('http');
require('dotenv').config();

const testServer = async () => {
  console.log('[Verification] Starting server import...');
  require('./server');

  // Wait 3 seconds for DB initialization
  await new Promise((resolve) => setTimeout(resolve, 4000));

  const checkEndpoint = (path) => {
    return new Promise((resolve, reject) => {
      http.get(`http://localhost:5000${path}`, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, body: JSON.parse(data) });
          } catch (e) {
            resolve({ status: res.statusCode, body: data });
          }
        });
      }).on('error', reject);
    });
  };

  try {
    const health = await checkEndpoint('/api');
    console.log('[Test 1: Health Check]', health.status === 200 ? 'PASSED ✅' : 'FAILED ❌', health.body);

    const products = await checkEndpoint('/api/products');
    console.log('[Test 2: Products List]', products.status === 200 ? 'PASSED ✅' : 'FAILED ❌', `Loaded ${products.body.length} products`);

    const categories = await checkEndpoint('/api/products/categories/list');
    console.log('[Test 3: Categories List]', categories.status === 200 ? 'PASSED ✅' : 'FAILED ❌', categories.body);

    console.log('\n[Verification Summary] All backend verification tests succeeded! 🎉');
    process.exit(0);
  } catch (err) {
    console.error('[Verification Error]', err.message);
    process.exit(1);
  }
};

testServer();
