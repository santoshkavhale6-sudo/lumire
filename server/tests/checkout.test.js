const request = require('supertest');
const express = require('express');

// Mock dependencies BEFORE importing controller/routes
jest.mock('../models/Order');
jest.mock('../models/Product');
jest.mock('razorpay');

const Order = require('../models/Order');
const Product = require('../models/Product');
const Razorpay = require('razorpay');

// Setup mock implementation for Razorpay
const mockOrdersCreate = jest.fn();
Razorpay.mockImplementation(() => {
    return {
        orders: {
            create: mockOrdersCreate
        }
    };
});

const orderRoutes = require('../routes/orderRoutes');

const app = express();
app.use(express.json());
// Mock middleware for user
app.use((req, res, next) => {
    req.user = { _id: 'user123' };
    next();
});
app.use('/api/orders', orderRoutes);

describe('Checkout / Order API', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /api/orders', () => {
        it('should create an order and a razorpay order', async () => {
            // Mock Order.save
            const mockSavedOrder = {
                _id: 'order123',
                totalPrice: 500,
                save: jest.fn().mockResolvedValue({ _id: 'order123' })
            };
            // When new Order() is called, return object that has save()
            Order.mockImplementation(() => mockSavedOrder);

            // Mock Razorpay response
            mockOrdersCreate.mockResolvedValue({
                id: 'rzp_order_123',
                amount: 50000,
                currency: 'INR'
            });

            const res = await request(app)
                .post('/api/orders')
                .send({
                    orderItems: [{ product: 'prod1', qty: 1 }],
                    shippingAddress: { address: '123 St' },
                    totalPrice: 500
                });

            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('mongoOrder');
            expect(res.body).toHaveProperty('razorpayOrder');
            expect(res.body).toHaveProperty('mongoOrder');
            expect(res.body).toHaveProperty('razorpayOrder');
            // expect(Razorpay).toHaveBeenCalled(); // Constructor call check can be flaky if module loaded globally
            expect(mockOrdersCreate).toHaveBeenCalled();
        });

        it('should return 400 if no order items', async () => {
            const res = await request(app)
                .post('/api/orders')
                .send({
                    orderItems: [],
                    totalPrice: 500
                });

            expect(res.statusCode).toEqual(400);
        });
    });
});
