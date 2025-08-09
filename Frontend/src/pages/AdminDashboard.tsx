
import React, { useState, useEffect } from 'react';
import { getAnalytics } from '../api/admin';
import { useAuth, useUser } from '@clerk/clerk-react';
import { BarChart3, TrendingUp, Package, DollarSign, Users, ShoppingCart, Activity, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductManagement from '../components/ProductManagement';
import ProductForm from '../components/ProductForm';


const AdminDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'products'>('overview');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | undefined>(undefined);
  const { getToken } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAnalytics();
        setAnalytics(data);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError('Failed to load analytics data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️</div>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const handleProductSuccess = () => {
    // Refresh data when product is added/updated
    const loadAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAnalytics();
        setAnalytics(data);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError('Failed to load analytics data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadAnalytics();
  };

  const handleEditProduct = (productId: string) => {
    setEditingProductId(productId);
    setShowProductForm(true);
  };

  const handleAddProduct = () => {
    setEditingProductId(undefined);
    setShowProductForm(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, {user?.firstName || user?.username || 'Admin'}! Here's an overview of your store's performance.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'products'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Products
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{analytics?.totalRevenue?.toFixed(2) || '0.00'}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analytics?.totalOrders || 0}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <ShoppingCart className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Products</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analytics?.totalProducts || 0}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Package className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analytics?.totalViews || 0}
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Activity className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Analytics Details */}
          {analytics && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Most Viewed Product */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Most Viewed Product</h2>
                </div>
                {analytics.mostViewed ? (
                  <div className="flex items-center space-x-4">
                    {analytics.mostViewed.image ? (
                      <img
                        src={analytics.mostViewed.image}
                        alt={analytics.mostViewed.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                        <Package className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-900">{analytics.mostViewed.name}</h3>
                      <p className="text-gray-600 text-sm">{analytics.mostViewed.views || 0} views</p>
                      <p className="text-blue-600 font-semibold">₹{analytics.mostViewed.price?.toFixed(2)}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">No product views recorded yet.</p>
                )}
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
                </div>
                <div className="space-y-3">
                  <button 
                    onClick={handleAddProduct}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="font-medium text-gray-900">Add New Product</div>
                    <div className="text-sm text-gray-600">Create a new product listing</div>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                    <div className="font-medium text-gray-900">View All Orders</div>
                    <div className="text-sm text-gray-600">Manage customer orders</div>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                    <div className="font-medium text-gray-900">Analytics Report</div>
                    <div className="text-sm text-gray-600">Generate detailed reports</div>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </>
      )}

      {activeTab === 'products' && (
        <ProductManagement />
      )}

      {/* Product Form Modal */}
      {showProductForm && (
        <ProductForm
          productId={editingProductId}
          onClose={() => setShowProductForm(false)}
          onSuccess={handleProductSuccess}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
