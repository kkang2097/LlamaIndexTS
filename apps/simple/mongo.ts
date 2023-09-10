import { MongoClient } from "mongodb";
import { VectorStoreIndex } from "../../packages/core/src/indices";
import { Document } from "../../packages/core/src/Node";
import { SimpleMongoReader } from "../../packages/core/src/readers/SimpleMongoReader";
import { serviceContextFromDefaults } from "../../packages/core/src/ServiceContext";
import { storageContextFromDefaults } from "../../packages/core/src/storage/StorageContext";
import { SubQuestionQueryEngine } from "../../packages/core/src/QueryEngine";
import { QueryEngineTool, ToolMetadata } from "../../packages/core/src/Tool";

import { stdin as input, stdout as output } from "node:process";
import readline from "node:readline/promises";

async function main() {
  //Dummy test code
  const query: object = { _id: "waldo" };
  const options: object = {};
  const projections: object = { embedding: 0 };
  const limit: number = Infinity;
  const uri: string = process.env.MONGO_URI ?? "fake_uri";
  const client: MongoClient = new MongoClient(uri);

  //Where the real code starts
  const MR = new SimpleMongoReader(client);
  const documents: Document[] = await MR.loadData(
    "data",
    "posts",
    4,
    {},
    options,
    projections,
  );

  //
  //If you need to look at low-level details of
  // a queryEngine (for example, needing to check each individual node)
  //

  // Split text and create embeddings. Store them in a VectorStoreIndex
  // var storageContext = await storageContextFromDefaults({});
  // var serviceContext = serviceContextFromDefaults({});
  // const docStore = storageContext.docStore;

  // for (const doc of documents) {
  //   docStore.setDocumentHash(doc.id_, doc.hash);
  // }
  // const nodes = serviceContext.nodeParser.getNodesFromDocuments(documents);
  // console.log(nodes.toString());

  //
  //Making Vector Store from documents
  //

  // const index = await VectorStoreIndex.fromDocuments(documents);
  const index1 = await VectorStoreIndex.fromDocuments(documents.slice(0,2));
  const index2 = await VectorStoreIndex.fromDocuments(documents.slice(2));
  // Create query engine
  const qe1 = index1.asQueryEngine();
  const qe2 = index2.asQueryEngine();

  const qe_bundle: QueryEngineTool[] = new ToolMetaData({"name": "smth", "description": "nothing"}), qe1)

  const xqe = SubQuestionQueryEngine.fromDefaults([
                                                  new QueryEngineTool(new ToolMetaData({"name": "smth", "description": "nothing"}), qe1)
                                                  ]);



  const rl = readline.createInterface({ input, output });
  while (true) {
    const query = await rl.question("Query: ");

    if (!query) {
      break;
    }

    const response = await queryEngine.query(query);

    // Output response
    console.log(response.toString());
  }
}

main();
