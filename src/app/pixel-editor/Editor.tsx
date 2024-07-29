import React from "react";
import { getToken } from "./token-generator";
import PixlrPage from "./pixlr-page";

const Editor = async () => {
  const { token } = await getToken();

  return (
    <>
      <PixlrPage token={token} />
    </>
  );
};

export default Editor;
