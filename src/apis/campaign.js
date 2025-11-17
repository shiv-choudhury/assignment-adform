import * as api from "./api";

export const getCampaigns = (payload) => {
  let url = `users`;
  return api.getResponse(url, payload);
};
