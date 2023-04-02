import { type User } from "@clerk/backend";

export const filterUsersForClient = ({
  id,
  username,
  profileImageUrl,
}: User) => ({
  id,
  username,
  profileImageUrl,
});
