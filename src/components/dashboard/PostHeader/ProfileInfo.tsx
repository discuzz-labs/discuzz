import { FC } from "react";
import ProfileImage from "@/components/ProfileImage";
import Link from "next/link";
import routes from "@/services/routes";
import { Dot } from "lucide-react";

interface ProfileInfoProps {
  name: string;
  email: string;
  image: string;
  userId: string;
  createdAt: Date;
}

const ProfileInfo: FC<ProfileInfoProps> = ({
  createdAt,
  name,
  email,
  image,
  userId,
}) => (
  <Link
    href={`${routes.user.index.path}/${userId}`}
    className="flex items-center gap-2"
  >
    <ProfileImage size={10} img={image} />
    <div className="grid gap-1">
      <p className="text-sm font-medium leading-none">{name}</p>
      <p className="text-sm text-muted-foreground">{email}</p>
    </div>
    <p className="flex items-center gap-2 text-sm text-muted-foreground">
      <Dot /> {createdAt.toLocaleDateString()}
    </p>
  </Link>
);

export default ProfileInfo;
