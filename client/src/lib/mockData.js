export const mockOrders = [
    {
        _id: 'ORD-7782-XJ',
        user: { name: 'John Doe', email: 'john@example.com' },
        totalPrice: 125000,
        orderStatus: 'Delivered',
        isPaid: true,
        createdAt: '2023-10-15T10:30:00Z',
        courierInfo: { name: 'BlueDart', awb: 'BD123456789' }
    },
    {
        _id: 'ORD-9921-MC',
        user: { name: 'Sarah Smith', email: 'sarah@example.com' },
        totalPrice: 45000,
        orderStatus: 'Processing',
        isPaid: true,
        createdAt: '2023-10-18T14:20:00Z',
        courierInfo: { name: '', awb: '' }
    },
    {
        _id: 'ORD-1102-PP',
        user: { name: 'Mike Ross', email: 'mike@example.com' },
        totalPrice: 210000,
        orderStatus: 'Pending',
        isPaid: false,
        createdAt: '2023-10-19T09:15:00Z',
        courierInfo: { name: '', awb: '' }
    },
    {
        _id: 'ORD-3321-KL',
        user: { name: 'Emma Watson', email: 'emma@example.com' },
        totalPrice: 8500,
        orderStatus: 'Cancelled',
        isPaid: false,
        createdAt: '2023-10-12T16:45:00Z',
        courierInfo: { name: '', awb: '' }
    }
];
