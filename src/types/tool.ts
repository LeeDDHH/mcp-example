import { z } from "zod";

export type ArgsType = Record<string, unknown>;

export type ToolSchema = Record<string, z.ZodTypeAny> | {[key: string]: never};

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
    args: ArgsType,
    extra?: ArgsType
  ) => Promise<ToolResponse>;
};
