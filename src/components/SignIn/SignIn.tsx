import { SignInButton, SignOutButton } from "@clerk/nextjs";

const SignIn = ({
  isLoaded,
  isSignedIn,
}: {
  isLoaded: boolean;
  isSignedIn?: boolean;
}) => (
  <div className="flex flex-col justify-center border-b border-slate-400 p-4 ">
    {isLoaded ? (
      !isSignedIn ? (
        <SignInButton />
      ) : (
        <SignOutButton />
      )
    ) : (
      <div className="my-1.5 h-3 w-20 self-center rounded-full bg-gray-200 dark:bg-gray-700" />
    )}
  </div>
);
export default SignIn;
