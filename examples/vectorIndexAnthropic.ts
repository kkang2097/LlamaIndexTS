import fs from "node:fs/promises";

import {
  Anthropic,
  Document,
  serviceContextFromDefaults,
  VectorStoreIndex,
} from "llamaindex";

async function main() {
  // Load essay from abramov.txt in Node
  const path = "node_modules/llamaindex/examples/abramov.txt";

  const essay = await fs.readFile(path, "utf-8");

  // Create Document object with essay
  const document = new Document({ text: essay, id_: path });

  // Split text and create embeddings. Store them in a VectorStoreIndex
  const serviceContext = serviceContextFromDefaults({ llm: new Anthropic() });
  const index = await VectorStoreIndex.fromDocuments([document], {
    serviceContext,
  });

  // Query the index
  const queryEngine = index.asQueryEngine();
  const response = await queryEngine.query(
    "What did the author do in college?",
  );

  // Output response
  console.log(response.toString());
}

main().catch(console.error);
