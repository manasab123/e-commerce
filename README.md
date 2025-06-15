
#  E-Commerce Platform (MERN Stack)

A full-featured e-commerce web application built using the MERN stack with role-based access for **Customers** and **Admins**. Customers can browse to purchase products, while Admins can manage inventory and perform backend operations via a dedicated dashboard.

---

##  Tech Stack

- **Frontend:**
  - Vite for Admin
  -  React for Customer
- **Backend:**
  - Node.js
  - Express.js
- **Database:**
  - MongoDB

---

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/e-commerce.git
cd e-commerce
```

### 2. Setup Backend
```bash
cd backend
npm install
node ./index.js
```

### 3. Setup Customer App
```bash
cd frontend
npm install
npm start
```

### 4. Setup Admin Dashboard
```bash
cd admin
npm install
npm run dev
```

---

##  Environment Variables (in backend)

Create a `.env` file in the `server` directory with the following:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```



## ✅ Future Enhancements
- Payment gateway integration (Stripe/Razorpay)
- Product reviews & ratings
