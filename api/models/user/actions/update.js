import { applyParams, save, ActionOptions, UpdateUserActionContext } from "gadget-server";

/**
 * @param { UpdateUserActionContext } context
 */
export async function run({ params, record, logger, api, connections }) {
  // Before applying new parameters, you might want to add some custom logic
  // For example, to handle the 'keys' field specifically
  if (params.keys) {
    // Custom logic for keys, if needed
    // This could include validation or modification of the keys array
    record.keys = params.keys;
  }

  // Apply other parameters to the record
  applyParams(params, record);

  // Save the updated record
  await save(record);
}

/**
 * @param { UpdateUserActionContext } context
 */
export async function onSuccess({ params, record, logger, api, connections }) {
  // Logic to execute on successful update
  // You can log the success or perform additional operations if needed
  logger.info(`User ${record.id} successfully updated.`);
}

/** @type { ActionOptions } */
export const options = {
  actionType: "update",
  triggers: { api: true },
};
