import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import TopNavigation from "@/components/TopNavigation";
import KanbanBoard, { Column } from "@/components/KanbanBoard";
import CalendarView from "@/components/CalendarView";
import TableView from "@/components/TableView";
import Inbox from "./Inbox";
import { Post } from "@/types/post";
import PreviewView from "@/components/PreviewView";
import {
  groupByDateKeyIntoColumns,
  saveColumns,
  seedColumnsIfEmpty,
} from "@/lib/utils";
import { format, formatISO, parse, parseISO } from "date-fns";

// Initial data structure for columns
const initialColumns: Column[] = [
  {
    id: "idea",
    title: "Idea",
    count: 8,
    posts: [
      {
        id: "post-1",
        title: "Post a Banner",
        description: "Create a marketing banner for the campaign",
        date: "July 25, 2025",
        time: "7:00 AM",
        platforms: ["tiktok", "instagram", "facebook"],
        image: "/lovable-uploads/6cc9ce2f-f1e2-40fe-aeaf-c8c9332f7f84.png",
        author: "John Doe",
        likes: 0,
        notes: "This is a sample note",
      },
      {
        id: "post-2",
        title: "Social Media Campaign",
        description: "Create engaging social media content",
        date: "June 26, 2025",
        time: "8:00 AM ",
        platforms: ["tiktok", "instagram"],
        image: "/lovable-uploads/6cc9ce2f-f1e2-40fe-aeaf-c8c9332f7f84.png",
        author: "Jane Smith",
        likes: 5,
        notes: "Focus on trending hashtags",
      },
      {
        id: "post-3",
        title: "Product Launch Video",
        description: "Create promotional video for new product",
        date: "October 27, 2025",
        time: "9:00 AM ",
        platforms: ["facebook", "instagram"],
        image: "/lovable-uploads/6cc9ce2f-f1e2-40fe-aeaf-c8c9332f7f84.png",
        author: "Mike Johnson",
        likes: 12,
        notes: "Include product features",
      },
      {
        id: "post-5",
        title: "Holiday Special Post",
        description: "Create festive content for holidays",
        date: "August 28, 2025",
        time: "10:00 AM ",
        platforms: ["tiktok", "facebook"],
        image: "/lovable-uploads/6cc9ce2f-f1e2-40fe-aeaf-c8c9332f7f84.png",
        author: "Sarah Wilson",
        likes: 8,
        notes: "Use holiday themes",
      },
      {
        id: "post-6",
        title: "Behind the Scenes",
        description: "Show company culture and team",
        date: "October 29, 2023",
        time: "11:00 AM",
        platforms: ["instagram", "facebook"],
        image: "/lovable-uploads/6cc9ce2f-f1e2-40fe-aeaf-c8c9332f7f84.png",
        author: "Tom Brown",
        likes: 15,
        notes: "Authentic content",
      },
      {
        id: "post-7",
        title: "Customer Testimonial",
        description: "Feature satisfied customer reviews",
        date: "July 30, 2025",
        time: "12:00 PM",
        platforms: ["tiktok", "instagram", "facebook"],
        image: "/lovable-uploads/6cc9ce2f-f1e2-40fe-aeaf-c8c9332f7f84.png",
        author: "Lisa Davis",
        likes: 20,
        notes: "Include customer quotes",
      },
      {
        id: "post-8",
        title: "Tutorial Content",
        description: "Educational content about product usage",
        date: "October 31, 2025",
        time: "1:00 PM",
        platforms: ["tiktok", "instagram"],
        image: "/lovable-uploads/6cc9ce2f-f1e2-40fe-aeaf-c8c9332f7f84.png",
        author: "Alex Chen",
        likes: 18,
        notes: "Step-by-step guide",
      },
      {
        id: "post-9",
        title: "Weekly Roundup",
        description: "Summary of week's highlights",
        date: "November 1, 2025",
        time: "2:00 PM",
        platforms: ["facebook", "instagram"],
        image: "/lovable-uploads/6cc9ce2f-f1e2-40fe-aeaf-c8c9332f7f84.png",
        author: "Emma Taylor",
        likes: 10,
        notes: "Include key metrics",
      },
    ],
  },
  {
    id: "progress",
    title: "In Progress",
    count: 4,
    posts: [
      {
        id: "post-4",
        title: "Post a Banner",
        description: "Create a marketing banner for the campaign",
        date: "July 25, 2025",
        time: "7:00 AM ",
        platforms: ["tiktok", "instagram", "facebook"],
        image: "/lovable-uploads/6cc9ce2f-f1e2-40fe-aeaf-c8c9332f7f84.png",
        author: "John Doe",
        likes: 0,
        notes: "This is a sample note",
      },
      {
        id: "post-10",
        title: "Video Editing",
        description: "Edit promotional video content",
        date: "June 21, 2025",
        time: "3:00 PM ",
        platforms: ["tiktok", "instagram"],
        image: "/lovable-uploads/6cc9ce2f-f1e2-40fe-aeaf-c8c9332f7f84.png",
        author: "David Lee",
        likes: 7,
        notes: "Add transitions and effects",
      },
      {
        id: "post-11",
        title: "Content Review",
        description: "Review and approve content drafts",
        date: "June 21, 2025",
        time: "4:00 PM ",
        platforms: ["facebook", "instagram"],
        image: "/lovable-uploads/6cc9ce2f-f1e2-40fe-aeaf-c8c9332f7f84.png",
        author: "Rachel Green",
        likes: 3,
        notes: "Check brand guidelines",
      },
      {
        id: "post-12",
        title: "Graphics Design",
        description: "Create visual assets for posts",
        date: "June 20, 2025",
        time: "5:00 PM",
        platforms: ["tiktok", "facebook"],
        image: "/lovable-uploads/6cc9ce2f-f1e2-40fe-aeaf-c8c9332f7f84.png",
        author: "Kevin Park",
        likes: 11,
        notes: "Use brand colors",
      },
    ],
  },
  {
    id: "pending",
    title: "Pending",
    count: 0,
    posts: [],
  },
  {
    id: "approved",
    title: "Approved",
    count: 0,
    posts: [],
  },
  {
    id: "closed",
    title: "Closed",
    count: 0,
    posts: [],
  },
];

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("Board");
  const [currentPage, setCurrentPage] = useState("board");
  const [openPreview, setOpenPreview] = useState(false);
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    const seeded = seedColumnsIfEmpty(initialColumns);
    setColumns(seeded);
  }, []);

  const handleColumnsChange = (updatedColumns: Column[]) => {
    setColumns(updatedColumns);
    saveColumns(updatedColumns);
  };

  // Handle navigation from sidebar
  const handleSidebarNavigation = (page: string) => {
    console.log("Index: Navigation to page:", page);
    setCurrentPage(page);
    if (page === "board") {
      setActiveTab("Board");
    }
  };

  const handlePostSubmit = (postData: Partial<Post>) => {
    setColumns((prevColumns) => {
      const isEditing = !!postData.id;
      let newColumns: Column[];

      if (isEditing) {
        newColumns = prevColumns.map((col) => ({
          ...col,
          posts: col.posts.map((post) =>
            post.id === postData.id ? { ...post, ...postData } : post
          ),
        }));
      } else {
        const newPost: Post = {
          id: `post-${Date.now()}`,
          title: postData.title || "Untitled Post",
          description: postData.description || "",
          date: postData.date || new Date().toDateString(),
          time: postData.time || new Date().toLocaleTimeString(),
          platforms: postData.platforms || ["instagram"],
          image: postData.image || "/default-image.png",
          author: postData.author || "John Doe",
          likes: 0,
          notes: postData.notes || "",
        };

        const columnId = postData.id || "idea";
        newColumns = prevColumns.map((col) =>
          col.id === columnId
            ? {
                ...col,
                posts: [...col.posts, newPost],
                count: col.posts.length + 1,
              }
            : col
        );
      }

      saveColumns(newColumns); // persist
      return newColumns;
    });
  };

  const toggleAutoPost = (postId: string, newValue: boolean) => {
    setColumns((cols) => {
      const updated = cols.map((col) => ({
        ...col,
        posts: col.posts.map((p) =>
          p.id === postId ? { ...p, autoPost: newValue } : p
        ),
      }));
      saveColumns(updated);
      return updated;
    });
  };

  const postsWithStatus = columns.flatMap((col) =>
    col.posts.map((post) => ({
      ...post,
      status: col.id,
    }))
  );

  const onPostsReorder = (
    postId: string,
    source: { droppableId: string; index: number },
    destination: { droppableId: string; index: number }
  ) => {
    setColumns((prevCols) => {
      const newCols = prevCols.map((col) => {
        const posts = col.posts.map((post) => {
          if (post.id !== postId) return post;

          // Update the date field only
          const newDate = format(
            parse(destination.droppableId, "yyyy-MM-dd", new Date()),
            "MMMM d, yyyy"
          );
          return { ...post, date: newDate };
        });

        return { ...col, posts };
      });

      saveColumns(newCols);
      return newCols;
    });
  };

  if (currentPage === "inbox") {
    console.log("Rendering Inbox component");
    return <Inbox onNavigate={handleSidebarNavigation} />;
  }

  return (
    <div className="flex min-h-screen overflow-hidden bg-white">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        onNavigate={handleSidebarNavigation}
      />
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
          sidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        <TopNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          setOpenPreview={setOpenPreview}
          onPostSubmit={handlePostSubmit}
        />
        <main
          className="flex-1 flex flex-col overflow-hidden
        "
        >
          {activeTab === "Board" && (
            <KanbanBoard
              columns={columns}
              onColumnsChange={handleColumnsChange}
              onPostSubmit={handlePostSubmit}
            />
          )}
          {activeTab === "Calendar" && (
            <CalendarView
              posts={columns.flatMap((col) => col.posts)}
              onPostsReorder={onPostsReorder}
            />
          )}
          {activeTab === "Table" && (
            <TableView
              posts={postsWithStatus}
              onPostSubmit={handlePostSubmit}
              onToggleAutoPost={toggleAutoPost}
            />
          )}

          {activeTab === "Feed" && (
            <div className="text-center py-20 text-gray-500">
              Feed coming soon
            </div>
          )}
          {activeTab === "Analytics" && (
            <div className="text-center py-20 text-gray-500">
              Analytics coming soon
            </div>
          )}
        </main>
      </div>
      {openPreview && (
        <PreviewView
          setOpenPreview={setOpenPreview}
          openPreview={openPreview}
          columns={columns}
          onColumnsChange={handleColumnsChange}
        />
      )}
    </div>
  );
};

export default Index;
