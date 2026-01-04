# Deployment Guide

This guide explains how to deploy the **E-commerce Platform** (Client & Server).

## Prerequisites
- A **GitHub** account (for code hosting).
- **Vercel** account (for Client).
- **Render** or **Vercel** account (for Server).
- **MongoDB Atlas** account (for Database).

## 1. Database (MongoDB Atlas)
1. Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database user and allow access from anywhere (`0.0.0.0/0`).
3. Get the Connection String: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/lumiere_db?retryWrites=true&w=majority`.

## 2. Server Deployment (Render.com)
Recommended for Node.js APIs.

1. Connect your GitHub repository to Render.
2. Create a **Web Service**.
3. **Build Command**: `npm install`
4. **Start Command**: `npm start`
5. **Environment Variables**:
   - `MONGO_URI`: (Your MongoDB Connection String)
   - `JWT_SECRET`: (A secure random string)
   - `RAZORPAY_KEY_ID`: (Your Key)
   - `RAZORPAY_KEY_SECRET`: (Your Secret)
   - `PORT`: `5000` (Render handles this automatically usually, but good to set)

## 3. Client Deployment (Vercel)
Recommended for Next.js.

1. Install Vercel CLI or go to [vercel.com](https://vercel.com).
2. Import your repository.
3. **Environment Variables**:
   - `NEXT_PUBLIC_API_URL`: The URL of your deployed server (e.g., `https://lumiere-server.onrender.com/api`).
     *Note: Ensure you include `/api` at the end if your logic expects it, or matches the `api.js` logic.*
4. Deploy!

## 4. Final Configuration
1. Update **Server CORS**:
   - Once the client is deployed, get its domain (e.g., `https://lumiere-store.vercel.app`).
   - Update `server/index.js` `cors()` configuration to allow requests from this domain, or leave it open (`app.use(cors())`) if public API is intended (but be careful).

## Local Development vs Production
- **Local**:
  - Client `.env.local`: `NEXT_PUBLIC_API_URL=http://localhost:5000/api`
  - Server `.env`: `MONGO_URI=mongodb://localhost:27017/lumiere_db`
- **Production**:
  - Update env vars in the hosting platform dashboard.
