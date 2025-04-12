import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { doubleNumberTool } from "./tools/double_number/index.js";

const server = new McpServer({
  name: "mcp-example",
  version: "1.0.0",
});

// ツールの登録
server.tool(
  doubleNumberTool.name,
  doubleNumberTool.description,
  doubleNumberTool.schema,
  doubleNumberTool.handler
);

server.tool("get_test_text", "テスト用の文字列データを取得する", {}, async () => {
  const resp = await fetch("http://localhost:3000/test");
  const body = await resp.text();
  return { content: [{ type: "text", text: body }] };
});

server.tool("get_test_with_env", "環境変数からデータを取得する", {}, async () => {
  const foo = process.env.FOO ?? "";
  return { content: [{ type: "text", text: foo }] };
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Example MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main(): ", error);
  process.exit(1);
});
