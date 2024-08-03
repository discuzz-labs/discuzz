import { Bookmark } from "lucide-react";

interface BookmarkActionProps {
  isBookMarked: boolean;
  onToggleBookmark: () => void;
}

const BookmarkAction: React.FC<BookmarkActionProps> = ({ isBookMarked, onToggleBookmark }) => (
  <Bookmark
    className={`h-5 w-5 ${isBookMarked ? "fill-blue-600 text-blue-600" : "hover:fill-blue-600 hover:text-blue-600"}`}
    onClick={onToggleBookmark}
  />
);

export default BookmarkAction;
