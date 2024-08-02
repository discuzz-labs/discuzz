import { TABS } from "@/app/(user)/user/[userId]/routeType";
import { Bookmark, Trash2 } from "lucide-react";

interface PostActionsProps {
  isBookMarked: boolean;
  onToggleBookmark: () => void;
  onDelete: () => void;
  activeTab: keyof typeof TABS;
  isOwner: boolean;
}

const PostActions: React.FC<PostActionsProps> = ({ isOwner, activeTab, isBookMarked, onToggleBookmark, onDelete }) => {
  return (
    <div className="ml-auto flex items-center gap-2 ">
      <Bookmark
        className={`h-5 w-5 ${
          isBookMarked
            ? "fill-blue-600 text-blue-600"
            : "hover:fill-blue-600 hover:text-blue-600"
        }`}
        onClick={onToggleBookmark}
      />
      {activeTab !== TABS.FOLLOWING && isOwner &&
      <Trash2
        className="w-5 h-5 hover:fill-destructive hover:text-foreground"
        onClick={onDelete}
      />}
    </div>
  );
};

export default PostActions;
