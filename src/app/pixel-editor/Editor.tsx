import React from "react";
import { getToken } from "./token-generator";
import PixlrPage from "./pixlr-page";
import { Label } from "~/components/ui/label";

const Editor = async () => {
  const { token } = await getToken();

  return (
    <>
      <Label className="  text-3xl"> Add own design</Label>
      <div className=" mt-14">
        <PixlrPage token={token} />
      </div>
    </>
  );
};

export default Editor;
