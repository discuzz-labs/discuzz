import { Dot } from "lucide-react";
import ProfileImage from "@/components/ProfileImage";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import config from "@/lib/config";
import Link from "next/link";
import routes from "@/services/routes";
interface ProfileHeaderProps {
  name: string;
  email: string;
  createdAt: Date;
  isRestricted: boolean;
  reason: string;
  image: string;
  userId: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  isRestricted,
  name,
  email,
  createdAt,
  image,
  reason,
  userId
}) => {
  return (
    <div className="flex items-center gap-4 w-full">
      <Link href={`${routes.user.index.path}/${userId}`} className="flex items-center gap-2">
        <ProfileImage size={10} img={image}/>
        <div className="grid gap-1">
          <p className="text-sm font-medium leading-none">{name}</p>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
      </Link>
      <div>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Dot /> {createdAt.toLocaleDateString()}
        </p>
      </div>
      {isRestricted && (
        <div className="ml-auto">
          <Popover>
            <PopoverTrigger>
              <Badge className="bg-destructive text-destructive-foreground">
                Restricted
              </Badge>
            </PopoverTrigger>
            <PopoverContent>
              Reason: {reason}<br />{" "}
              <p className="text-sm font-thin">
                Unfair! Contact support {config.site.supportEmail}{" "}
              </p>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
