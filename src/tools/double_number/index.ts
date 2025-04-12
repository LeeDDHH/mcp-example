import { ToolDefinition } from "../../types/tool.js";
import { schema } from "./schema.js";

export const doubleNumberTool: ToolDefinition = {
  name: "double_number",
  description: "与えられた数値を2倍にする",
  schema,
  handler: async (args) => {
    if (typeof args.num === "number") {
      // num が存在し、number 型であることを確認
      return {
        content: [
          {
            type: "text",
            text: (args.num * 2).toString(),
          },
        ],
      };
    }
    throw new Error("Invalid arguments");
  },
};
