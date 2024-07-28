import { Test3GlobalActionContext } from "gadget-server";

/**
 * @param { Test3GlobalActionContext } context
 */
export async function run({ params, logger, api, connections }) {
  try {
    // Generate dummy data for the Test3 model
    const dummyData = {
      field1: "Dummy Field 1",
      field2: "Dummy Field 2",
      field3: "Dummy Field 3",
      // ... other fields as required by your Test3 model
    };

    // Create a new record in the Test3 model with the dummy data
    const test3Record = await api.shopifyCollectS.create({ data: dummyData });

    // Log the result
    logger.info("Test3 record created successfully", { test3RecordId: test3Record.id });

    // Return the created record or any other relevant information
    return test3Record;
  } catch (error) {
    // Log the error
    logger.error("Error creating Test3 record", { error });

    // Rethrow the error to handle it according to Gadget's action error handling
    throw error;
  }
}
