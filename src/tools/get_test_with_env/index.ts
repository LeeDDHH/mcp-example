import { ToolDefinition } from "../../types/tool.js";

export const getTestWithEnv: ToolDefinition = {
  name: "get_test_with_env",
  description: "環境変数からデータを取得する",
  schema: {},
  handler: async () => {
    const foo = process.env.FOO ?? "";
    return { content: [{ type: "text", text: foo }] };
  }
};
