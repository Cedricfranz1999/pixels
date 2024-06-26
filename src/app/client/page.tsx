import { SignedIn, UserButton } from "@clerk/nextjs";

const Client = () => {
  return (
    <div>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default Client;
