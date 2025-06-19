import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ListFilter,
} from "lucide-react";
import { Post } from "@/types/post";
import ContentModal from "./ContentModal";
import { format, parse } from "date-fns";
import { generateCalendarGrid } from "@/lib/utils";
import { PlatformIcon } from "./platformSvg";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";

interface CalendarViewProps {
  posts: Post[];
  onPostsReorder: (
    postId: string,
    source: { droppableId: string; index: number },
    destination: { droppableId: string; index: number }
  ) => void;
}
const CalendarView = ({ posts, onPostsReorder }: CalendarViewProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    // first and last of this month
    const firstOfMonth = new Date(year, month, 1);
    const lastOfMonth = new Date(year, month + 1, 0);

    // we want 0=Mon … 6=Sun
    const offset = (firstOfMonth.getDay() + 6) % 7;

    // build a flat array of Date objects (prev-month, this-month, next-month)
    const totalCells =
      offset +
      lastOfMonth.getDate() +
      ((7 - ((offset + lastOfMonth.getDate()) % 7)) % 7);
    const days: Date[] = [];

    // start from Monday of the week containing the 1st
    const startDate = new Date(firstOfMonth);
    startDate.setDate(firstOfMonth.getDate() - offset);

    for (let i = 0; i < totalCells; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      days.push(d);
    }

    return days;
  };

  const getPostsForDate = (day: Date) => {
    if (!day) return [];

    return posts.filter((post) => {
      const d = parse(post.date, "MMMM d, yyyy", new Date());
      return (
        d.getFullYear() === day.getFullYear() &&
        d.getMonth() === day.getMonth() &&
        d.getDate() === day.getDate()
      );
    });
  };

  const handlePreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
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
    console.log("Calendar modal submit:", formData);
    handleModalClose();
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    // if dropped into same cell and position, no-op:
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    onPostsReorder(draggableId, source, destination);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const days = getDaysInMonth(currentDate);

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm flex flex-col h-full">
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex items-center justify-between py-3 px-6 flex-shrink-0">
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="h-8 p-2">
                <Calendar width={15} height={15} />
                Today
              </Button>

              <div className="flex items-center space-x-1 text-sm font-medium">
                <button
                  onClick={handlePreviousMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <span className="">{format(currentDate, "MMMM yyyy")}</span>
                <button
                  onClick={handleNextMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="h-8 p-2">
                <ListFilter width={15} height={15} />
                Filters
              </Button>

              <Button variant="outline" size="sm" className="h-8 p-2">
                Month
                <ChevronDown width={15} height={15} />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 border-t flex-shrink-0">
            {dayNames.map((day) => (
              <div
                key={day}
                className="p-2 text-center text-sm font-medium text-gray-500 border-l border-r"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto">
            <DragDropContext onDragEnd={handleDragEnd}>
              <div className="grid grid-cols-7">
                {days.map((day, index) => {
                  const dateKey = format(day, "yyyy-MM-dd");

                  const posts = getPostsForDate(day);
                  const isToday =
                    day.toDateString() === new Date().toDateString();
                  const isThisMonth = day.getMonth() === currentDate.getMonth();
                  const dayOfWeek = day.getDay(); // 0 = Sunday, 6 = Saturday
                  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

                  return (
                    <Droppable key={dateKey} droppableId={dateKey}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`
          min-h-[130px] w-auto p-2 border border-gray-200
          ${isWeekend ? "bg-gray-100" : " hover:bg-gray-50"}
          ${!isThisMonth ? "text-gray-400" : ""}
          ${isToday ? "ring-2 ring-blue-500" : ""}${
                            snapshot.isDraggingOver ? "bg-blue-50" : "bg-white"
                          }
        `}
                        >
                          <div
                            className={`
            text-sm font-medium mb-2
            ${isWeekend ? "text-gray-500" : ""}
            ${isToday ? "text-blue-600" : "text-gray-900"}
          `}
                          ></div>
                          {day && (
                            <>
                              <div
                                className={`text-sm font-medium mb-2 ${
                                  isToday ? "text-blue-600" : "text-gray-900"
                                }`}
                              >
                                {day.getDate()}
                              </div>
                              <div className="space-y-1">
                                {posts.map((post, idx) => (
                                  <Draggable
                                    key={post.id}
                                    draggableId={post.id}
                                    index={idx}
                                  >
                                    {(provided) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        onClick={() => handlePostClick(post)}
                                        className="text-xs bg-gray-200  text-gray-900 p-1.5 rounded cursor-pointer truncate flex items-center gap-2 justify-between border-l-[3px] border-gray-600 "
                                      >
                                        <div className="flex items-center space-x-1">
                                          {post.platforms.map((p) => (
                                            <PlatformIcon
                                              key={p}
                                              platform={p}
                                              className="w-3.5 h-3.5"
                                            />
                                          ))}
                                        </div>
                                        {post.title}
                                        <div className="e flex items-center gap-1 ">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={15}
                                            height={15}
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              fill="none"
                                              stroke="currentColor"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth={2}
                                              d="M10 20.777a9 9 0 0 1-2.48-.969M14 3.223a9.003 9.003 0 0 1 0 17.554m-9.421-3.684a9 9 0 0 1-1.227-2.592M3.124 10.5c.16-.95.468-1.85.9-2.675l.169-.305m2.714-2.941A9 9 0 0 1 10 3.223"
                                            ></path>
                                          </svg>
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={15}
                                            height={15}
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              fill="currentColor"
                                              fillRule="evenodd"
                                              d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12S5.925 1 12 1s11 4.925 11 11M7 13l1.5-1.5l2 2l5-5L17 10l-6.5 6.5z"
                                              clipRule="evenodd"
                                              className="text-green-600"
                                            ></path>
                                          </svg>
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </Droppable>
                  );
                })}
              </div>
            </DragDropContext>
          </div>
        </div>
      </div>

      <ContentModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        editingPost={selectedPost || undefined}
      />
    </>
  );
};

export default CalendarView;
