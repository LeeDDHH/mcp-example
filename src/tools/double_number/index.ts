import { schema } from "./schema.js";
import { ArgsType, ToolDefinition } from "../../types/tool.js";

export const doubleNumberTool: ToolDefinition = {
  name: "double_number",
  description: "与えられた数値を2倍にする",
  schema,
  handler: async (args: ArgsType) => {
    const parsedArgs = { num: schema.num.parse(args.num) }; // schema.num を使って型チェックとパースを行う
    return {
      content: [
        {
          type: "text",
          text: (parsedArgs.num * 2).toString(),
        },
      ],
    };
  },
};
