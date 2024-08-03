import { TABS } from "@/app/(user)/user/[userId]/routeType";
import BookmarkAction from "./BookmarkAction";
import DeleteAction from "./DeleteAction";

interface PostActionsProps {
  isBookMarked: boolean;
  onToggleBookmark: () => void;
  onDelete: () => void;
  activeTab: keyof typeof TABS;
  isOwner: boolean;
}

const PostActions: React.FC<PostActionsProps> = ({ isOwner, activeTab, isBookMarked, onToggleBookmark, onDelete }) => {
  return (
    <div className="ml-auto flex items-center gap-2">
      <BookmarkAction isBookMarked={isBookMarked} onToggleBookmark={onToggleBookmark} />
      {activeTab !== TABS.FOLLOWING && isOwner && <DeleteAction onDelete={onDelete} />}
    </div>
  );
};

export default PostActions;
