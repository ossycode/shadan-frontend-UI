import { useState } from "react";
import {
  Search,
  Filter,
  Star,
  Archive,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import TopNavigation from "@/components/TopNavigation";

interface InboxItem {
  id: string;
  sender: string;
  subject: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  avatar: string;
}

interface InboxProps {
  onNavigate?: (page: string) => void;
}

const Inbox = ({ onNavigate }: InboxProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("Inbox");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Handle tab change to navigate back to board
  const handleTabChange = (tab: string) => {
    console.log("Tab changed to:", tab);
    setActiveTab(tab);
    if (tab !== "Inbox" && onNavigate) {
      console.log("Navigating to board");
      onNavigate("board");
    }
  };

  // Handle sidebar navigation
  const handleSidebarNavigation = (page: string) => {
    console.log("Sidebar navigation to:", page);
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const [inboxItems] = useState<InboxItem[]>([
    {
      id: "1",
      sender: "Sarah Johnson",
      subject: "Content Review Required",
      message:
        "Hi there! I've reviewed the latest banner design and have some feedback. The color scheme looks great but...",
      timestamp: "2 hours ago",
      isRead: false,
      isStarred: true,
      avatar: "SJ",
    },
    {
      id: "2",
      sender: "Marketing Team",
      subject: "Campaign Performance Update",
      message:
        "Weekly performance report for our social media campaigns. Overall engagement is up 15% compared to...",
      timestamp: "4 hours ago",
      isRead: true,
      isStarred: false,
      avatar: "MT",
    },
    {
      id: "3",
      sender: "Client Portal",
      subject: "New Project Assignment",
      message:
        'You have been assigned to a new project: "Summer Campaign 2024". Please review the requirements and...',
      timestamp: "1 day ago",
      isRead: false,
      isStarred: false,
      avatar: "CP",
    },
    {
      id: "4",
      sender: "Anna Taylor",
      subject: "Design Approval Needed",
      message:
        "The Instagram post design is ready for your review. Please check the attached mockups and let me know...",
      timestamp: "2 days ago",
      isRead: true,
      isStarred: true,
      avatar: "AT",
    },
    {
      id: "5",
      sender: "System Notification",
      subject: "Scheduled Post Published",
      message:
        'Your scheduled post "New Product Launch" has been successfully published across all selected platforms...',
      timestamp: "3 days ago",
      isRead: true,
      isStarred: false,
      avatar: "SN",
    },
  ]);

  const filteredItems = inboxItems.filter((item) => {
    const matchesSearch =
      item.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase());

    switch (selectedFilter) {
      case "unread":
        return !item.isRead && matchesSearch;
      case "starred":
        return item.isStarred && matchesSearch;
      default:
        return matchesSearch;
    }
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        <TopNavigation activeTab={activeTab} onTabChange={handleTabChange} />
        <main className="p-6">
          <div className="bg-white rounded-lg shadow-sm">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold text-gray-900">Inbox</h1>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <Archive className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Messages</option>
                    <option value="unread">Unread</option>
                    <option value="starred">Starred</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Message List */}
            <div className="divide-y divide-gray-200">
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <p>No messages found.</p>
                </div>
              ) : (
                filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                      !item.isRead ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      {/* Avatar */}
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium text-gray-700">
                        {item.avatar}
                      </div>

                      {/* Message Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3
                            className={`text-sm font-medium ${
                              !item.isRead ? "text-gray-900" : "text-gray-700"
                            }`}
                          >
                            {item.sender}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">
                              {item.timestamp}
                            </span>
                            <button
                              className={`p-1 rounded ${
                                item.isStarred
                                  ? "text-yellow-400"
                                  : "text-gray-300 hover:text-yellow-400"
                              }`}
                            >
                              <Star
                                className="w-4 h-4"
                                fill={item.isStarred ? "currentColor" : "none"}
                              />
                            </button>
                          </div>
                        </div>
                        <h4
                          className={`text-sm mb-1 ${
                            !item.isRead
                              ? "font-semibold text-gray-900"
                              : "text-gray-700"
                          }`}
                        >
                          {item.subject}
                        </h4>
                        <p className="text-sm text-gray-500 truncate">
                          {item.message}
                        </p>
                      </div>

                      {/* Unread Indicator */}
                      {!item.isRead && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Inbox;
