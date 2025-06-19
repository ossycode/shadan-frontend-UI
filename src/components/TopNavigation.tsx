import {
  Calendar,
  LayoutGrid,
  Table,
  Monitor,
  Rss,
  Share,
  Plus,
  Filter,
  ChartNoAxesColumn,
} from "lucide-react";
import { useState } from "react";
import ContentModal from "./ContentModal";
import { Post } from "@/types/post";

interface TopNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  setOpenPreview: (value: boolean) => void;
  onPostSubmit: (formData: Partial<Post>) => void;
}

const TopNavigation = ({
  activeTab,
  onTabChange,
  setOpenPreview,
  onPostSubmit,
}: TopNavigationProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const tabs = [
    { name: "Calendar", icon: Calendar },
    { name: "Board", icon: LayoutGrid },
    { name: "Table", icon: Table },
    { name: "Preview", icon: Monitor },
    { name: "Feed", icon: Rss },
    { name: "Analytics", icon: ChartNoAxesColumn },
  ];

  const handleAddContent = () => {
    setIsModalOpen(true);
  };

  const handleModalSubmit = (formData: Partial<Post>) => {
    onPostSubmit(formData);
    setIsModalOpen(false);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleTabClick = (tab: string) => {
    console.log("Tab clicked:", tab);
    if (onTabChange) {
      if (tab.toLowerCase() === "preview") {
        setOpenPreview(true);
      } else {
        onTabChange(tab);
      }
    }
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const isCalenderView = activeTab === "Calendar";

  return (
    <>
      <header className="border-b border-gray-200 bg-white w-full flex-shrink-0">
        <div className="flex items-center justify-between px-6 h-16">
          <div className="flex items-center">
            <div className="p-1 bg-gray-100 rounded mr-3">
              <div className="grid grid-cols-3 gap-0.5">
                <div className="w-1 h-1 bg-gray-400 rounded-sm"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-sm"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-sm"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-sm"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-sm"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-sm"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-sm"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-sm"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-sm"></div>
              </div>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Beyond UI</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full">
              <svg
                width="20"
                height="20"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 14C12.6569 14 14 12.6569 14 11C14 9.34315 12.6569 8 11 8C9.34315 8 8 9.34315 8 11C8 12.6569 9.34315 14 11 14Z"
                  stroke="#344051"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.6224 9.3954L17.5247 6.7448L19 5L17 3L15.2647 4.48295L12.5578 3.36974L11.9353 1H9.98098L9.34908 3.40113L6.70441 4.51596L5 3L3 5L4.45337 6.78885L3.3725 9.44633L1 10V12L3.40111 12.6555L4.51575 15.2997L3 17L5 19L6.79116 17.5403L9.39701 18.6123L10 21H12L12.6045 18.6132L15.2551 17.5155C15.6969 17.8313 17 19 17 19L19 17L17.5159 15.2494L18.6139 12.598L20.9999 11.9772L21 10L18.6224 9.3954Z"
                  stroke="#344051"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-gray-100 hover:bg-gray-200 h-10 px-4 py-2 text-gray-700 hover:text-gray-900">
              Share
            </button>
            <button
              onClick={handleAddContent}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg"
            >
              Add Content
            </button>
          </div>
        </div>

        <div className="flex border-b border-gray-200 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => handleTabClick(tab.name)}
              className={`inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 text-base font-medium rounded-none transition-all border-b-2 ${
                activeTab === tab.name
                  ? "text-[#141C25] border-[#141C25]"
                  : "text-gray-600 hover:text-gray-900 border-transparent"
              }`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.name}
            </button>
          ))}
        </div>
      </header>

      <div
        className={`px-6  bg-white  ${
          isCalenderView ? "" : "border-b border-gray-200 py-3"
        }`}
      >
        {activeTab !== "Calendar" && (
          <button
            onClick={toggleFilters}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background hover:text-accent-foreground h-10 px-4 py-2 text-gray-600 border-gray-300 hover:bg-gray-50"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
        )}

        {activeTab !== "Calendar" && showFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>All statuses</option>
                <option>To Do</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>All priorities</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assigned to
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>Anyone</option>
                <option>Unassigned</option>
                <option>Me</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <ContentModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
    </>
  );
};

export default TopNavigation;
