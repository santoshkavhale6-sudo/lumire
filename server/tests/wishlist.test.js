const request = require('supertest');
const express = require('express');

jest.mock('../models/User');
jest.mock('../models/Product');
jest.mock('../middleware/authMiddleware', () => ({
    protect: (req, res, next) => {
        req.user = { _id: 'user123', wishlist: [] };
        next();
    }
}));

const User = require('../models/User');
const Product = require('../models/Product');
// Note: We don't need to explicitly require authMiddleware here as it's mocked globally above
const wishlistRoutes = require('../routes/wishlistRoutes');

const app = express();
app.use(express.json());

// Mock auth middleware for testing
app.use((req, res, next) => {
    req.user = { _id: 'user123', wishlist: [] };
    next();
});

app.use('/api/wishlist', wishlistRoutes);

describe('Wishlist API', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/wishlist', () => {
        it('should return user wishlist', async () => {
            const mockUser = {
                _id: 'user123',
                wishlist: ['prod1', 'prod2'],
                populate: jest.fn().mockReturnThis()
            };
            // populate needs to eventually resolve to user with populated wishlist
            // But controller does: await User.findById().populate('wishlist')
            // The await applies to the Query object.

            const mockQuery = {
                populate: jest.fn().mockResolvedValue({ wishlist: ['prod1', 'prod2'] })
            };
            User.findById.mockReturnValue(mockQuery);

            const res = await request(app).get('/api/wishlist');

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(['prod1', 'prod2']);
        });
    });

    describe('POST /api/wishlist', () => {
        it('should add item to wishlist', async () => {
            const mockProduct = { _id: 'prod1' };
            Product.findById.mockResolvedValue(mockProduct);

            const mockSave = jest.fn();
            const mockUser = {
                _id: 'user123',
                wishlist: [],
                save: mockSave
            };
            User.findById.mockResolvedValue(mockUser);

            const res = await request(app)
                .post('/api/wishlist')
                .send({ productId: 'prod1' });

            expect(res.statusCode).toEqual(201);
            expect(mockUser.wishlist).toContain('prod1');
            expect(mockSave).toHaveBeenCalled();
        });
    });

    describe('DELETE /api/wishlist/:id', () => {
        it('should remove item from wishlist', async () => {
            const mockSave = jest.fn();
            const mockUser = {
                _id: 'user123',
                wishlist: ['prod1'],
                save: mockSave
            };
            User.findById.mockResolvedValue(mockUser);

            const res = await request(app).delete('/api/wishlist/prod1');

            expect(res.statusCode).toEqual(200);
            expect(mockUser.wishlist).not.toContain('prod1');
            expect(mockSave).toHaveBeenCalled();
        });
    });
});
