import { z } from "zod";

export type ToolSchema = Record<string, z.ZodTypeAny>;

export type ToolResponse = {
  content: Array<{
    type: "text";
    text: string;
  }>;
};

export type ToolDefinition = {
  name: string;
  description: string;
  schema: ToolSchema;
  handler: (
    args: Record<string, unknown>,
    extra?: Record<string, unknown>
  ) => Promise<ToolResponse>;
};
