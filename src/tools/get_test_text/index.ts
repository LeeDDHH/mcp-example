import { ToolDefinition } from "../../types/tool.js";

export const getTestTextTool: ToolDefinition = {
  name: "get_test_text",
  description: "テスト用の文字列データを取得する",
  schema: {},
  handler: async () => {
    const resp = await fetch("http://localhost:3000/test");
    const body = await resp.text();
    return { content: [{ type: "text", text: body }] };
  }
};
