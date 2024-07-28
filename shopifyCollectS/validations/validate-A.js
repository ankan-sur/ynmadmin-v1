/**
 * Validation code for shopifyCollections field to ensure only smart collections are allowed
 * @param {import("gadget-server").ShopifyCollectSCustomCollectionFieldValidationContext} context - All the useful bits for running this validation.
 */
export default async ({ api, record, errors, logger, field }) => {
  // Assuming 'shopifyCollections' is an array of collection objects
  if (record.shopifyCollections) {
    record.shopifyCollections.forEach((collection) => {
      if (collection.collectionType !== 'smart') {
        // If the collectionType is not 'smart', add an error message
        errors.add(field, 'Invalid collection type. Only smart collections are allowed.');
      }
    });
  }
};
