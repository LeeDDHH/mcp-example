import { z } from "zod";

export const schema = {
  num: z.preprocess((v) => Number(v), z.number({
    required_error: "num is required",
    invalid_type_error: "num must be a number"
  }).describe("数値")),
};
