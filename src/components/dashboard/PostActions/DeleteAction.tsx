import { Trash2 } from "lucide-react";

interface DeleteActionProps {
  onDelete: () => void;
}

const DeleteAction: React.FC<DeleteActionProps> = ({ onDelete }) => (
  <Trash2
    className="w-5 h-5 hover:fill-destructive hover:text-foreground"
    onClick={onDelete}
  />
);

export default DeleteAction;
