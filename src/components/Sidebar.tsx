import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Search,
  Inbox,
  Plus,
  House,
  TriangleAlert,
  Headphones,
  ChevronLeft,
  ChevronRight,
  ChevronRight as ChevronRightSmall,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  onNavigate?: (page: string) => void;
}

const Sidebar = ({ collapsed, onToggle, onNavigate }: SidebarProps) => {
  const [socialSpacesExpanded, setSocialSpacesExpanded] = useState(true);

  const handleInboxClick = () => {
    if (onNavigate) {
      onNavigate("inbox");
    }
  };

  const handleMyContentClick = () => {
    if (onNavigate) {
      onNavigate("board");
    }
  };

  if (collapsed) {
    return (
      <div className="fixed left-0 top-0 h-screen w-16 bg-white border-r border-gray-200 transition-all duration-300 z-50 flex flex-col">
        <div className="p-4 border-b border-gray-100 flex justify-center">
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">F</span>
          </div>
        </div>
        <div className="flex-1 px-3 py-4 space-y-1 flex flex-col items-center">
          <button
            onClick={handleMyContentClick}
            className="w-full flex justify-center p-2 text-sm rounded-md transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <House className="w-4 h-4" />
          </button>
          <button className="w-full flex justify-center p-2 text-sm rounded-md transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900">
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={handleInboxClick}
            className="w-full flex justify-center p-2 text-sm rounded-md transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900 relative"
          >
            <Inbox className="w-4 h-4" />
            <span className="absolute top-0 right-0 bg-blue-100 text-blue-800 text-xs px-1 rounded-full">
              3
            </span>
          </button>
        </div>
        <button
          onClick={onToggle}
          className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 bg-white border border-gray-200 rounded-full p-1 shadow-sm hover:bg-gray-50 transition-all"
          aria-label="Expand sidebar"
        >
          <ChevronRight className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    );
  }

  return (
    <div
      className="flex-shrink-0 fixed left-0 top-0 h-screen z-50"
      style={{ width: "256px" }}
    >
      <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <button className="flex items-center justify-between w-full text-left font-medium text-gray-900 hover:bg-gray-50 rounded-md p-2 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">F</span>
                </div>
                <span className="text-sm font-medium">Flux Corporation</span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="flex-1 px-3 py-4 space-y-1">
          <button
            onClick={handleMyContentClick}
            className="w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <House className="w-4 h-4" />
            <span>My content</span>
          </button>

          <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900">
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>

          <button
            onClick={handleInboxClick}
            className="w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <Inbox className="w-4 h-4" />
            <span>Inbox</span>
            <span className="ml-auto bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
              3
            </span>
          </button>

          <div className="pt-4">
            <button
              onClick={() => setSocialSpacesExpanded(!socialSpacesExpanded)}
              className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
            >
              <div className="flex items-center space-x-2">
                <ChevronRightSmall
                  className={`w-3 h-3 text-gray-400 transition-transform ${
                    socialSpacesExpanded ? "rotate-90" : ""
                  }`}
                />
                <span className="font-medium">Social Spaces</span>
              </div>
              <Plus className="w-4 h-4" />
            </button>

            {socialSpacesExpanded && (
              <div className="mt-1 ml-3 space-y-1">
                <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-colors bg-gray-100 text-gray-900">
                  <div className="w-4 h-4 bg-blue-500 rounded text-white flex items-center justify-center text-xs font-medium">
                    B
                  </div>
                  <span>Beyond UI</span>
                </button>

                <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                  <div className="w-4 h-4 bg-blue-500 rounded text-white flex items-center justify-center text-xs font-medium">
                    M
                  </div>
                  <span>Marketing</span>
                </button>

                <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                  <div className="w-4 h-4 bg-blue-500 rounded text-white flex items-center justify-center text-xs font-medium">
                    H
                  </div>
                  <span>HR</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="px-3 pb-4 space-y-3">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <TriangleAlert className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-orange-800 font-medium">
                  7 days left in trial
                </p>
                <button className="mt-1 text-sm text-blue-600 font-medium hover:text-blue-700 underline">
                  Upgrade
                </button>
              </div>
            </div>
          </div>

          <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900">
            <Headphones className="w-4 h-4" />
            <span>Support</span>
          </button>

          <div className="relative">
            <button className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-50 rounded-md transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-sm font-medium">AT</span>
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900">Anna Taylor</div>
                  <div className="text-xs text-gray-500">anna@email.com</div>
                </div>
              </div>
              <ChevronUp className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={onToggle}
        className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 bg-white border border-gray-200 rounded-full p-1 shadow-sm hover:bg-gray-50 transition-all"
        aria-label="Collapse sidebar"
      >
        <ChevronLeft className="w-4 h-4 text-gray-500" />
      </button>
    </div>
  );
};

export default Sidebar;
