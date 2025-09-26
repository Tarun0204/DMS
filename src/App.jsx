import { useState } from 'react';
import { ShoppingCart, Users, DollarSign, Truck } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import PlatformChart from './components/PlatformChart';
import AlertsPanel from './components/AlertsPanel';
import QuickActions from './components/QuickActions';
import DeliveryHotspots from './components/DeliveryHotspots';
import UsersList from './components/users/UsersList';
import OrderManagement from './components/OrderManagement';
import VendorManagement from './components/VendorManagement';
import DeliveryPartnerManagement from './components/DeliveryPartnerManagement';
import Support from './components/Support';

function App() {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    {
      title: 'Total Orders',
      value: '2,543',
      change: '+12%',
      icon: ShoppingCart,
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600'
    },
    {
      title: 'Active Users',
      value: '42,853',
      change: '+8%',
      icon: Users,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Revenue',
      value: '$38,492',
      change: '+7.2%',
      icon: DollarSign,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      title: 'Delivery Success',
      value: '98.3%',
      change: '+1.2%',
      icon: Truck,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    }
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activeItem) {
      case 'users':
        return (
          <main className="flex-1 overflow-y-auto bg-gray-50">
            <div className="p-4 lg:p-6 max-w-7xl mx-auto">
              <UsersList />
            </div>
          </main>
        );
      case 'orders':
        return <OrderManagement />;
      case 'vendors':
        return <VendorManagement />;
      case 'delivery':
        return <DeliveryPartnerManagement />;
      case 'support':
        return <Support />;
      case 'dashboard':
      default:
        return (
          <main className="flex-1 overflow-y-auto">
            <div className="p-4 lg:p-6 max-w-7xl mx-auto">
              {/* Page Header */}
              <div className="mb-6 lg:mb-8">
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1 text-sm lg:text-base">Overview of platform performance and activity</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
                {stats.map((stat, index) => (
                  <StatCard key={index} {...stat} />
                ))}
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
                <div className="xl:col-span-2">
                  <PlatformChart />
                </div>
                <div>
                  <AlertsPanel />
                </div>
              </div>

              {/* Bottom Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
                <QuickActions />
                <DeliveryHotspots />
              </div>
            </div>
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Full screen overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}

      <Sidebar 
        activeItem={activeItem} 
        setActiveItem={setActiveItem}
        sidebarOpen={sidebarOpen}
        closeSidebar={closeSidebar}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        
        {renderContent()}
      </div>
    </div>
  );
}

export default App;