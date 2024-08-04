import { Bookmark, Edit, Trash } from "lucide-react";
import useBookmark from "@/hooks/useBookmark";
import useUnbookmark from "@/hooks/useUnbookmark";
import useDeletePost from "@/hooks/useDeletePost";

interface PostActionsProps {
  viewerId: string;
  postId: string;
  isOwner: boolean;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
  onDelete: () => void;
}

const PostActions: React.FC<PostActionsProps> = ({
  viewerId,
  postId,
  isOwner,
  isBookmarked,
  onBookmarkToggle,
  onDelete,
}) => {
  const bookmark = useBookmark();
  const unBookmark = useUnbookmark();
  const deletePost = useDeletePost(viewerId);

  const toggleBookmark = async () => {
    if (!isBookmarked) {
      bookmark.mutate({ userId: viewerId, postId });
    } else {
      unBookmark.mutate({ userId: viewerId, postId });
    }
    onBookmarkToggle();
  };

  const handleDelete = async () => {
    await deletePost.mutateAsync({ userId: viewerId, postId });
    onDelete();
  };

  return (
    <div className="flex flex-col justify-start items-center gap-5">
      <Bookmark
        onClick={toggleBookmark}
        className={`w-5 transition-colors hover:fill-blue-500 ${isBookmarked ? "fill-blue-500" : ""}`}
      />
      {isOwner && (
        <Trash
          onClick={handleDelete}
          className="w-5 hover:fill-destructive transition-colors"
        />
      )}
      <Edit className="w-5 hover:fill-muted-background" />
    </div>
  );
};

export default PostActions;
