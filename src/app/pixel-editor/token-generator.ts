import { PixlrPayloadJWT, createToken } from "~/utils/tokenServer";

export const getToken = async () => {
  const url = "http://localhost:3000/pixel-editor";
  const payload: PixlrPayloadJWT = { mode: "embedded", origin: url };
  const token = await createToken(payload);
  return { token };
};
