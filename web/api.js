import { Client } from "@gadget-client/ynmadmin";

export const api = new Client({ environment: window.gadgetConfig.environment });
