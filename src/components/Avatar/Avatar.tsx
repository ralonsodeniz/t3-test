import Image from "next/image";
import { enLocale } from "../../../public/locales";
import { type FC } from "react";

const Avatar: FC<{ profileImageUrl: string }> = ({ profileImageUrl }) => (
  <Image
    src={profileImageUrl}
    alt={enLocale["create-post"].iamge.alt}
    width={56}
    height={56}
    className="h-14 w-14 rounded-full"
  />
);

export default Avatar;
