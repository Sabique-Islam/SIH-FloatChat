'use client';

import { useState } from 'react';
import { 
  MessageCircle, 
  Map, 
  BarChart3, 
  Waves, 
  Search, 
  Send, 
  MapPin,
  Calendar,
  Thermometer,
  Droplets,
  Activity,
  Download,
  Filter,
  Globe,
  TrendingUp,
  Info
} from 'lucide-react';

interface Message {
  type: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState('chat');
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      type: 'assistant' as const,
      content: 'Hello! I\'m your ARGO float data assistant. You can ask me about oceanographic data, request visualizations, or explore float trajectories. What would you like to know?'
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    
    const newMessages = [
      ...chatMessages,
      { type: 'user' as const, content: currentMessage }
    ];
    
    // Simulate AI response based on message content
    let response = '';
    if (currentMessage.toLowerCase().includes('salinity') && currentMessage.toLowerCase().includes('equator')) {
      response = 'I found 23 ARGO floats with salinity data near the equatorial region for March 2023. The average salinity was 35.2 PSU with notable variations between 34.8-35.6 PSU. I\'ve generated a visualization showing the salinity profiles and their geographic distribution. Would you like me to show specific depth ranges or compare with other months?';
    } else if (currentMessage.toLowerCase().includes('bgc') && currentMessage.toLowerCase().includes('arabian sea')) {
      response = 'Analyzing BGC parameters in the Arabian Sea for the last 6 months... I found data from 15 active floats showing interesting oxygen minimum zone dynamics. Chlorophyll-a concentrations peaked in February (0.8 mg/m³) with seasonal variations. The pH levels show a slight acidification trend. Should I create a comparative dashboard for these parameters?';
    } else if (currentMessage.toLowerCase().includes('nearest floats')) {
      response = 'Based on your location query, I found 8 ARGO floats within a 200km radius. The nearest active float (ID: 4903024) is 45km southwest, last reporting temperature: 28.4°C, salinity: 35.1 PSU. Float 2903771 is 78km northeast with recent BGC data. Would you like detailed profiles or trajectory maps for these floats?';
    } else {
      response = 'I understand you\'re interested in ARGO float data. I can help you explore temperature, salinity, BGC parameters, float trajectories, and much more. Try asking about specific regions, time periods, or parameters you\'d like to analyze!';
    }
    
    setTimeout(() => {
      setChatMessages([...newMessages, { type: 'assistant' as const, content: response }]);
    }, 1000);
    
    setCurrentMessage('');
  };

  const sampleQueries = [
    "Show me salinity profiles near the equator in March 2023",
    "Compare BGC parameters in the Arabian Sea for the last 6 months",
    "What are the nearest ARGO floats to coordinates 15°N, 60°E?",
    "Temperature anomalies in the North Atlantic over the past year",
    "Deep water oxygen levels in the Pacific Ocean"
  ];

  const ChatInterface = () => (
    <div className="w-full h-full flex flex-col md:flex-row gap-8">
      {/* Chat Section */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Card */}
        <div className="bg-gradient-to-r from-blue-700/90 to-cyan-600/80 text-white rounded-2xl shadow-lg p-6 mb-6 flex items-center gap-4">
          <div className="bg-white/20 rounded-xl p-3 flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-white drop-shadow" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight mb-1">ARGO Data Assistant</h2>
            <p className="text-blue-100 text-sm">Ask questions about oceanographic data in natural language</p>
          </div>
        </div>

        {/* Chat Card */}
        <div className="flex-1 flex flex-col bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
          {/* Sample Queries */}
          <div className="p-5 bg-gradient-to-r from-blue-50/80 to-cyan-50/60 border-b border-blue-100">
            <p className="text-xs text-blue-700 font-semibold mb-2 tracking-wide uppercase">Sample Research Queries</p>
            <div className="flex flex-wrap gap-2">
              {sampleQueries.slice(0, 3).map((query, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentMessage(query)}
                  className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-full transition-all duration-200 focus:scale-105 hover:scale-105 shadow-sm font-medium"
                  style={{ willChange: 'transform' }}
                >
                  {query.length > 50 ? query.substring(0, 50) + '...' : query}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-2xl p-4 rounded-2xl transition-all duration-200 ${
                  msg.type === 'user' 
                    ? 'bg-gradient-to-br from-blue-600 to-cyan-500 text-white rounded-br-md hover:scale-105 hover:shadow-lg' 
                    : 'bg-white/90 border border-blue-100 rounded-bl-md shadow-sm hover:scale-105 hover:shadow-lg'
                }`} style={{ willChange: 'transform' }}>
                  <p className="text-base leading-relaxed">{msg.content}</p>
                  {msg.type === 'assistant' && idx > 0 && (
                    <div className="mt-4 flex gap-2">
                      <button className="text-xs bg-gray-100 hover:bg-blue-100 px-3 py-1 rounded-lg flex items-center gap-1 transition-all duration-200 hover:scale-105 font-medium" style={{ willChange: 'transform' }}>
                        <BarChart3 className="w-3 h-3" />
                        View Chart
                      </button>
                      <button className="text-xs bg-gray-100 hover:bg-blue-100 px-3 py-1 rounded-lg flex items-center gap-1 transition-all duration-200 hover:scale-105 font-medium" style={{ willChange: 'transform' }}>
                        <Map className="w-3 h-3" />
                        Show Map
                      </button>
                      <button className="text-xs bg-gray-100 hover:bg-blue-100 px-3 py-1 rounded-lg flex items-center gap-1 transition-all duration-200 hover:scale-105 font-medium" style={{ willChange: 'transform' }}>
                        <Download className="w-3 h-3" />
                        Export Data
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-5 border-t bg-white/80">
            <div className="flex gap-3">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about ARGO float data..."
                className="flex-1 p-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 focus:scale-105 text-base bg-white/90"
                style={{ willChange: 'transform' }}
              />
              <button
                onClick={handleSendMessage}
                className="bg-gradient-to-tr from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white p-3 rounded-xl transition-all duration-200 hover:scale-110 shadow-md flex items-center justify-center"
                style={{ willChange: 'transform' }}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Research Info/Sidebar */}
      <div className="hidden md:flex flex-col w-80 min-w-[18rem] pl-2">
        <div className="bg-gradient-to-br from-cyan-100/80 to-blue-50/60 border border-cyan-200 rounded-2xl shadow-lg p-6 flex flex-col gap-4 h-full">
          <h3 className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2"><Info className="w-5 h-5 text-cyan-600" /> Research Assistant Tips</h3>
          <ul className="text-sm text-blue-900/80 space-y-2">
            <li>• Ask about <span className="font-semibold text-blue-700">specific regions</span> or <span className="font-semibold text-blue-700">parameters</span> for targeted insights.</li>
            <li>• Use <span className="font-semibold text-blue-700">natural language</span> for complex queries (e.g., &quot;Compare BGC trends in the Arabian Sea&quot;).</li>
            <li>• Request <span className="font-semibold text-blue-700">visualizations</span> or <span className="font-semibold text-blue-700">data exports</span> for your research.</li>
            <li>• Explore <span className="font-semibold text-blue-700">float trajectories</span> and <span className="font-semibold text-blue-700">profile comparisons</span>.</li>
          </ul>
          <div className="mt-4">
            <div className="bg-white/80 border border-blue-100 rounded-xl p-4 text-xs text-blue-800">
              <span className="font-bold">Did you know?</span> The ARGO network provides over 1.5 million ocean profiles for climate and marine research.
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const DashboardInterface = () => (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">ARGO Float Analytics Dashboard</h2>
        <p className="text-blue-100">Real-time oceanographic data visualization and analysis</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border transition-all duration-200 hover:scale-105 hover:shadow-xl" style={{ willChange: 'transform' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Floats</p>
              <p className="text-2xl font-bold text-gray-900">3,847</p>
            </div>
            <Waves className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border transition-all duration-200 hover:scale-105 hover:shadow-xl" style={{ willChange: 'transform' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Daily Profiles</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
            <Activity className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-xs text-green-600 mt-1">↑ 8% from yesterday</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border transition-all duration-200 hover:scale-105 hover:shadow-xl" style={{ willChange: 'transform' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">BGC Floats</p>
              <p className="text-2xl font-bold text-gray-900">892</p>
            </div>
            <Thermometer className="w-8 h-8 text-orange-500" />
          </div>
          <p className="text-xs text-blue-600 mt-1">23% of total fleet</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border transition-all duration-200 hover:scale-105 hover:shadow-xl" style={{ willChange: 'transform' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Coverage Area</p>
              <p className="text-2xl font-bold text-gray-900">94%</p>
            </div>
            <Globe className="w-8 h-8 text-purple-500" />
          </div>
          <p className="text-xs text-green-600 mt-1">Global ocean coverage</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map Visualization */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Global Float Distribution</h3>
            <Filter className="w-5 h-5 text-gray-500" />
          </div>
          <div className="bg-blue-50 rounded-lg h-64 flex items-center justify-center border">
            <div className="text-center">
              <Map className="w-16 h-16 text-blue-400 mx-auto mb-2" />
              <p className="text-gray-600">Interactive World Map</p>
              <p className="text-sm text-gray-500">Showing 3,847 active floats</p>
              <div className="mt-3 flex justify-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Core Floats (2,955)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>BGC Floats (892)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Temperature Trends */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Temperature Anomaly Trends</h3>
            <TrendingUp className="w-5 h-5 text-gray-500" />
          </div>
          <div className="bg-red-50 rounded-lg h-64 flex items-center justify-center border">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-red-400 mx-auto mb-2" />
              <p className="text-gray-600">Temperature Analysis Chart</p>
              <p className="text-sm text-gray-500">Global SST anomalies</p>
              <div className="mt-3 text-xs text-gray-600">
                <p>Current anomaly: +0.87°C</p>
                <p>Last update: 2 hours ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Queries */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4">Recent AI Queries</h3>
          <div className="space-y-3">
            {[
              { query: "Salinity profiles near equator", time: "2 min ago", status: "completed" },
              { query: "BGC parameters Arabian Sea", time: "15 min ago", status: "processing" },
              { query: "Temperature trends Pacific", time: "1 hour ago", status: "completed" },
              { query: "Oxygen levels North Atlantic", time: "3 hours ago", status: "completed" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">{item.query}</p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  item.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Data Quality Metrics */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4">Data Quality Overview</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Temperature Data Quality</span>
                <span>96%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Salinity Data Quality</span>
                <span>94%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>BGC Data Quality</span>
                <span>89%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '89%' }}></div>
              </div>
            </div>
            <div className="pt-2 border-t">
              <p className="text-xs text-gray-600">Last QC check: 1 hour ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ProfileExplorer = () => (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">ARGO Profile Explorer</h2>
        <p className="text-green-100">Detailed analysis of individual float profiles and trajectories</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow border transition-all duration-200 hover:scale-105 hover:shadow-xl" style={{ willChange: 'transform' }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Float ID</label>
            <input
              type="text"
              placeholder="e.g., 4903024"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <input
              type="text"
              placeholder="Last 30 days"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Parameter</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>Temperature</option>
              <option>Salinity</option>
              <option>Pressure</option>
              <option>Oxygen</option>
              <option>Chlorophyll</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2" style={{ willChange: 'transform' }}>
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Float Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow border transition-all duration-200 hover:scale-105 hover:shadow-xl" style={{ willChange: 'transform' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Float 4903024 - Temperature Profile</h3>
            <div className="flex gap-2">
              <button className="text-sm bg-gray-100 hover:bg-blue-100 px-3 py-1 rounded transition-all duration-200 hover:scale-105 flex items-center gap-1" style={{ willChange: 'transform' }}>
                <Download className="w-3 h-3" />
                Export
              </button>
              <button className="text-sm bg-gray-100 hover:bg-blue-100 px-3 py-1 rounded transition-all duration-200 hover:scale-105 flex items-center gap-1" style={{ willChange: 'transform' }}>
                <Info className="w-3 h-3" />
                Metadata
              </button>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg h-80 flex items-center justify-center border">
            <div className="text-center">
              <Activity className="w-20 h-20 text-blue-400 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">Temperature vs Depth Profile</p>
              <p className="text-sm text-gray-500 mb-4">Latest profile from March 15, 2024</p>
              <div className="bg-white p-3 rounded border text-xs text-left max-w-sm mx-auto">
                <div className="grid grid-cols-2 gap-2">
                  <div>Surface Temp: <strong>28.4°C</strong></div>
                  <div>Max Depth: <strong>2000m</strong></div>
                  <div>Mixed Layer: <strong>45m</strong></div>
                  <div>Thermocline: <strong>120m</strong></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border transition-all duration-200 hover:scale-105 hover:shadow-xl" style={{ willChange: 'transform' }}>
          <h3 className="text-lg font-semibold mb-4">Float Details</h3>
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium">Current Location</span>
              </div>
              <p className="text-sm text-gray-700">15.234°N, 60.567°E</p>
              <p className="text-xs text-gray-500">Last update: 6 hours ago</p>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium">Deployment</span>
              </div>
              <p className="text-sm text-gray-700">January 15, 2023</p>
              <p className="text-xs text-gray-500">425 days active</p>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium">Latest Measurements</span>
              </div>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Temperature:</span>
                  <span className="font-medium">28.4°C</span>
                </div>
                <div className="flex justify-between">
                  <span>Salinity:</span>
                  <span className="font-medium">35.1 PSU</span>
                </div>
                <div className="flex justify-between">
                  <span>Pressure:</span>
                  <span className="font-medium">1013.2 dbar</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">Status</span>
              </div>
              <p className="text-sm text-green-700">Active • Transmitting</p>
              <p className="text-xs text-green-600">Next profile in 6 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trajectory Map */}
      <div className="bg-white p-6 rounded-lg shadow border transition-all duration-200 hover:scale-105 hover:shadow-xl" style={{ willChange: 'transform' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Float Trajectory</h3>
          <div className="flex gap-2">
            <button className="text-sm bg-gray-100 hover:bg-blue-100 px-3 py-1 rounded transition-all duration-200 hover:scale-105" style={{ willChange: 'transform' }}>Last 30 days</button>
            <button className="text-sm bg-gray-100 hover:bg-blue-100 px-3 py-1 rounded transition-all duration-200 hover:scale-105" style={{ willChange: 'transform' }}>Last 90 days</button>
            <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded transition-all duration-200 hover:scale-105 hover:bg-blue-700" style={{ willChange: 'transform' }}>Full trajectory</button>
          </div>
        </div>
        <div className="bg-green-50 rounded-lg h-64 flex items-center justify-center border">
          <div className="text-center">
            <Map className="w-16 h-16 text-green-400 mx-auto mb-2" />
            <p className="text-gray-600">Float Trajectory Map</p>
            <p className="text-sm text-gray-500">Showing 425 days of movement</p>
            <div className="mt-3 flex justify-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Start Position</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Current Position</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Profile Locations (142)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const navigation = [
    { id: 'chat', name: 'AI Assistant', icon: MessageCircle },
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'explorer', name: 'Profile Explorer', icon: Activity }
  ];

  const renderActiveComponent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardInterface />;
      case 'explorer':
        return <ProfileExplorer />;
      default:
        return <ChatInterface />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-100 flex font-sans">
      {/* Sidebar */}
      <div className="w-72 min-h-screen bg-white/60 backdrop-blur-lg shadow-xl border-r border-blue-100 flex flex-col justify-between relative z-10">
        <div>
          <div className="p-6 border-b border-blue-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
              <Waves className="w-7 h-7 text-white drop-shadow" />
            </div>
            <div>
              <h1 className="font-extrabold text-2xl text-gray-900 tracking-tight">ARGO AI</h1>
              <p className="text-xs text-blue-500 font-medium mt-1">Oceanographic Research Suite</p>
            </div>
          </div>
          <nav className="p-6 space-y-2">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-base transition-all duration-200 shadow-sm border border-transparent ${
                  currentPage === item.id
                    ? 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-300 shadow-md'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6 border-t border-blue-100 text-xs text-gray-400 text-center">
          <span>© {new Date().getFullYear()} ARGO Research Lab</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col px-0 md:px-8 py-8 md:py-12 transition-all duration-300">
        <div className="max-w-7xl w-full mx-auto">
          {renderActiveComponent()}
        </div>
      </div>
    </div>
  );
}
