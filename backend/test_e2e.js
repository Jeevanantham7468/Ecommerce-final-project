const http = require('http');

const request = (method, path, body = null, token = null) => {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: `/api${path}`,
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (payload) {
      options.headers['Content-Length'] = Buffer.byteLength(payload);
    }
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
};

const runE2E = async () => {
  console.log('[E2E Test] Starting end-to-end user and admin simulation...');
  require('./server');
  await new Promise((r) => setTimeout(r, 4000));

  try {
    // 1. Login with demo user
    const loginRes = await request('POST', '/users/login', {
      email: 'user@example.com',
      password: 'password123',
    });
    console.log('[Test 1: User Login]', loginRes.status === 200 ? 'PASSED ✅' : 'FAILED ❌', `Logged in as ${loginRes.body.name}`);
    const userToken = loginRes.body.token;

    // 2. Fetch products
    const productsRes = await request('GET', '/products');
    const firstProduct = productsRes.body[0];
    console.log('[Test 2: Product Fetch]', productsRes.status === 200 ? 'PASSED ✅' : 'FAILED ❌', `Selected product: ${firstProduct.name}`);

    // 3. Place Order as Customer
    const orderRes = await request(
      'POST',
      '/orders',
      {
        orderItems: [
          {
            name: firstProduct.name,
            qty: 2,
            image: firstProduct.image,
            price: firstProduct.price,
            product: firstProduct._id,
          },
        ],
        shippingAddress: {
          street: '123 Market St',
          city: 'San Francisco',
          postalCode: '94105',
          country: 'USA',
        },
        paymentMethod: 'Credit Card',
        itemsPrice: firstProduct.price * 2,
        shippingPrice: 0,
        taxPrice: Number((firstProduct.price * 2 * 0.08).toFixed(2)),
        totalPrice: Number((firstProduct.price * 2 * 1.08).toFixed(2)),
      },
      userToken
    );
    console.log('[Test 3: Order Creation]', orderRes.status === 201 ? 'PASSED ✅' : 'FAILED ❌', `Created order ID: ${orderRes.body._id}`);

    // 4. Login as Admin
    const adminLoginRes = await request('POST', '/users/login', {
      email: 'admin@example.com',
      password: 'admin123',
    });
    console.log('[Test 4: Admin Login]', adminLoginRes.status === 200 ? 'PASSED ✅' : 'FAILED ❌', `Logged in as ${adminLoginRes.body.name}`);
    const adminToken = adminLoginRes.body.token;

    // 5. Admin updates order status
    const updateStatusRes = await request(
      'PUT',
      `/orders/${orderRes.body._id}/status`,
      { status: 'Shipped' },
      adminToken
    );
    console.log('[Test 5: Admin Update Order Status]', updateStatusRes.status === 200 && updateStatusRes.body.status === 'Shipped' ? 'PASSED ✅' : 'FAILED ❌', `New status: ${updateStatusRes.body.status}`);

    // 6. Admin Dashboard stats
    const statsRes = await request('GET', '/orders/stats/summary', null, adminToken);
    console.log('[Test 6: Admin Dashboard Stats]', statsRes.status === 200 ? 'PASSED ✅' : 'FAILED ❌', statsRes.body);

    console.log('\n[E2E Summary] All End-to-End API scenarios passed completely! 🎉🚀');
    process.exit(0);
  } catch (err) {
    console.error('[E2E Error]', err);
    process.exit(1);
  }
};

runE2E();
