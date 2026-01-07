


const API_URL = 'http://127.0.0.1:5001/api';

async function testCheckout() {
    console.log('--- Starting Direct API Checkout Verification ---');

    try {
        // 1. Get Products
        console.log('Step 1: Fetching products...');
        const productsRes = await fetch(`${API_URL}/products`);
        if (!productsRes.ok) throw new Error('Failed to fetch products');
        const products = await productsRes.json();
        const testProduct1 = products[0];
        const testProduct2 = products[1] || products[0]; // Fallback to same if only one exists
        console.log(`Using products: ${testProduct1.name} and ${testProduct2.name}`);

        // 2. Login
        console.log('Step 2: Logging in...');
        const loginRes = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'admin@lumiere.com',
                password: 'password123'
            })
        });
        if (!loginRes.ok) {
            const errData = await loginRes.json();
            throw new Error(`Login failed: ${errData.message}`);
        }
        const { token } = await loginRes.json();
        console.log('Login successful, token obtained.');

        // 3. Create Order
        console.log('Step 3: Creating order with 2 items...');
        const orderData = {
            orderItems: [
                {
                    name: testProduct1.name,
                    qty: 1,
                    image: testProduct1.image,
                    price: testProduct1.price,
                    product: testProduct1._id
                },
                {
                    name: testProduct2.name,
                    qty: 1,
                    image: testProduct2.image,
                    price: testProduct2.price,
                    product: testProduct2._id
                }
            ],
            shippingAddress: {
                address: '123 API St',
                city: 'ServerCity',
                postalCode: '10101',
                country: 'Localhost'
            },
            paymentMethod: 'card',
            totalPrice: testProduct1.price + testProduct2.price,
            itemsPrice: testProduct1.price + testProduct2.price,
            taxPrice: 0,
            shippingPrice: 0
        };

        const orderRes = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(orderData)
        });

        console.log(`Order response status: ${orderRes.status} ${orderRes.statusText}`);
        const responseBody = await orderRes.text();
        console.log(`Order response body: ${responseBody}`);

        if (!orderRes.ok) {
            console.error('Order creation failed Status:', orderRes.status);
            throw new Error(`Order creation failed with status ${orderRes.status}`);
        }

        const orderResult = JSON.parse(responseBody);

        console.log('SUCCESS: Order created via API!');
        console.log('Razorpay Order ID:', orderResult.razorpayOrderId);
        console.log('Total Price:', orderResult.amount / 100, orderResult.currency);

        if (orderResult.razorpayOrderId) {
            console.log('--- VERIFICATION SUCCESSFUL ---');
        } else {
            console.log('--- VERIFICATION FAILED: No Razorpay Order ID ---');
        }

    } catch (error) {
        console.error("ERROR during API verification:", {
            message: error.message,
            stack: error.stack,
            error
        });
    }
}

testCheckout();
