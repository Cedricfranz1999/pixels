import Link from "next/link";
import UploadFile from "./example-uploader/page";
// hasFakeCaretimport { api } from "~/trpc/server";

export default async function Home() {
  return (
    <div>
      <UploadFile />
    </div>
  );
}
