//Test the Selector here.
import { defaultSingleSelectPrompt, buildToolsText, SimplePrompt, SingleSelectPrompt, MultiSelectPrompt, defaultMultiSelectPrompt } from "../../packages/core/src/Prompt";
import {OpenAI, LLM} from '../../packages/core/src/llm/LLM';
import { ToolMetadata } from "../../packages/core/src/Tool";
import { LLMSelector } from "../../packages/core/src/Selector";

async function main(){
  // const mock_metadata: ToolMetadata[] = [
  //   {name: "Database A", description: "has recent tech news articles"},
  //   {name: "Database B", description: "fulltexts of theoretical computer science books"},
  //   {name: "Database C", description: "has fulltexts of mathematics books"},
  //   {name: "Database D", description: "has fulltexts of books on variational inference"}
  // ];
  const mock_metadata: ToolMetadata[] = [
    {name: "Database A", description: "has information on the FBI"},
    {name: "Database B", description: "contains blueprints for building a house"}
  ];
  const query: string = "Where should I look for variational calculus info?";
  const llm: LLM = new OpenAI();
  const prompt: SingleSelectPrompt = defaultSingleSelectPrompt;
  const prompt2: MultiSelectPrompt = defaultMultiSelectPrompt;

  const selector = new LLMSelector(llm, prompt2);
  console.log(await selector.select(query, mock_metadata, 2));
};


main();