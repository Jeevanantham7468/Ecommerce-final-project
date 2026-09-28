const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderById,
  getMyOrders,
  getOrders,
  updateOrderStatus,
  getDashboardStats,
} = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createOrder)
  .get(protect, adminOnly, getOrders);

router.get('/myorders', protect, getMyOrders);
router.get('/stats/summary', protect, adminOnly, getDashboardStats);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/status').put(protect, adminOnly, updateOrderStatus);

module.exports = router;
