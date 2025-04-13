import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { doubleNumberTool } from "./tools/double_number/index.js";
import { getTestTextTool } from "./tools/get_test_text/index.js";
import { getTestWithEnv } from "./tools/get_test_with_env/index.js";

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

server.tool(
  getTestTextTool.name,
  getTestTextTool.description,
  getTestTextTool.schema,
  getTestTextTool.handler
);

server.tool(
  getTestWithEnv.name,
  getTestWithEnv.description,
  getTestWithEnv.schema,
  getTestWithEnv.handler
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Example MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main(): ", error);
  process.exit(1);
});
