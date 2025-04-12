import { z } from "zod";

export const schema = {
  num: z.preprocess((v) => Number(v), z.number().describe("数値")),
};
