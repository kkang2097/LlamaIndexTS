import { BaseQueryEngine } from "./QueryEngine";
import { BaseRetriever } from "./Retriever";

export interface ToolMetadata {
  description: string;
  name: string;
}

/**
 * Simple Tool interface. Likely to change.
 */
export interface BaseTool {
  metadata: ToolMetadata;
}

/**
 * A Tool that uses a QueryEngine.
 */
export interface QueryEngineTool extends BaseTool {
  queryEngine: BaseQueryEngine;
}

/**
 * A Tool that uses a Retriever.
 */
export interface RetrieverTool extends BaseTool {
  retriever: BaseRetriever;
}