import { useState, useMemo, useEffect } from "react";
import {
  Search,
  ArrowUpDown,
  FileText,
  Calendar,
  ChevronDown,
  CircleCheck,
  FileImage,
  MessageSquare,
  Share2,
  User,
  Zap,
} from "lucide-react";
import { Post } from "@/types/post";
import ContentModal from "./ContentModal";
import { PlatformIcon } from "./platformSvg";

// Interface for props to receive data from parent
interface TableViewProps {
  posts: Array<Post & { status: string }>;
  onPostSubmit?: (formData: Partial<Post>) => void;
  onToggleAutoPost: (postId: string, newValue: boolean) => void;
}

const TableView = ({
  posts,
  onPostSubmit,
  onToggleAutoPost,
}: TableViewProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Post>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allPosts = posts;

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts;

    if (searchTerm) {
      filtered = filtered.filter((post) =>
        [post.title, post.author, post.description]
          .filter(Boolean)
          .some((field) =>
            field!.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (typeof aValue === "string") aValue = aValue.toLowerCase();
      if (typeof bValue === "string") bValue = bValue.toLowerCase();

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [searchTerm, sortField, sortDirection, posts]);

  const handleSort = (field: keyof Post) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const handleModalSubmit = (formData: Partial<Post>) => {
    onPostSubmit?.({ ...selectedPost, ...formData });
    handleModalClose();
  };

  const getPlatformIcons = (platforms: string[]) => {
    return platforms.map((p, index) => (
      <PlatformIcon key={index} platform={p} className="w-4 h-4" />
    ));
  };

  return (
    <>
      <div className="bg-white">
        <div className="">
          <div className="overflow-x-auto">
            <table className="w-full  divide-y divide-x divide-gray-200">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 divide-x divide-gray-200">
                  <th className="text-left py-1 px-1 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span>Content Name</span>
                      </div>
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="text-left py-1 px-1 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Post Date</span>
                      </div>
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="text-left py-1 px-1 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[300px]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        <span>Caption</span>
                      </div>
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="text-left py-1 px-1 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    <div className="flex items-center justify-between">
                      <FileImage className="h-4 w-4" />
                      <span>Files</span>
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="text-left py-1 px-1 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    <div className="flex items-center justify-between">
                      <CircleCheck className="h-4 w-4" />
                      <span>Status</span>
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="text-left py-1 px-1 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    <div className="flex items-center justify-between">
                      <Zap className="h-4 w-4" />
                      <span>Auto Post</span>
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="text-left py-1 px-1 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    <div className="flex items-center justify-between">
                      <Share2 className="h-4 w-4" />
                      <span>Platform</span>
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </th>
                  <th className="text-left py-1 px-1 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    <div className="flex items-center justify-between">
                      <User className="h-4 w-4" />
                      <span>Assignee</span>
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredAndSortedPosts.map((post) => (
                  <tr
                    key={post.id}
                    onClick={() => handlePostClick(post)}
                    className="hover:bg-gray-50 cursor-pointer divide-x divide-gray-200"
                  >
                    <td className="py-2 px-2 align-top">
                      <span className="text-sm font-medium text-gray-900">
                        {post.title}
                      </span>
                    </td>
                    <td className="py-2 px-2 align-top">
                      <div className="text-sm text-gray-900">{post.date}</div>
                      <div className="text-sm text-gray-500">{post.time}</div>
                    </td>
                    <td className="py-2 px-2 align-top whitespace-normal max-w-[300px]">
                      <div className="text-sm text-gray-900">
                        {post.description}
                      </div>
                    </td>
                    <td className="py-2 px-2 align-top">
                      {post.image && (
                        <div className="rounded-lg bg-gray-100 overflow-hidden w-16 h-16">
                          <img
                            src={post.image}
                            alt="preview"
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                    </td>
                    <td className="py-2 px-2 align-top ">
                      <span className="capitalize inline-flex items-center py-1 px-2 rounded-full text-sm font-medium bg-green-200 text-gray-700">
                        {post?.status}
                      </span>
                    </td>
                    <td className="py-2 px-2 align-top ">
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleAutoPost(post.id, !post.autoPost);
                        }}
                        className={`w-11 h-6 rounded-full relative ${
                          post.autoPost ? "bg-emerald-500" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 ${
                            post.autoPost ? "right-0.5" : "left-0.5"
                          } w-5 h-5 bg-white rounded-full shadow-sm transition-all`}
                        />
                      </div>
                    </td>
                    <td className="py-2 px-2 align-top">
                      <div className="flex items-center space-x-2">
                        {getPlatformIcons(post.platforms)}
                      </div>
                    </td>
                    <td className="py-2 px-2 align-top">
                      <div className="flex items-center space-x-2">
                        <img
                          src={post.image}
                          alt={post.author}
                          className="w-6 h-6 rounded-full bg-gray-100 object-cover"
                        />
                        <span className="text-sm text-gray-900">
                          {post.author}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredAndSortedPosts.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No posts found matching your search.
              </div>
            )}
          </div>
        </div>
      </div>

      <ContentModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        editingPost={selectedPost}
        allPosts={allPosts}
      />
    </>
  );
};

export default TableView;
