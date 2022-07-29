import {
  RETRIEVE_PROMOTIONS,
  CREATE_PROMOTION,
  UPDATE_PROMOTION,
  DELETE_PROMOTION,
} from "../actions/types";

const initialState = [];

export default function (promotions = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_PROMOTION:
      return [...promotions, payload];
    case RETRIEVE_PROMOTIONS:
      return payload;
    case UPDATE_PROMOTION:
      return promotions.map((promotion) => {
        if (promotion.id === payload.id) {
          return {
            ...promotion,
            ...payload,
          };
        } else {
          return promotion;
        }
      });
    case DELETE_PROMOTION:
      return promotions.filter(({ id }) => id !== payload.id);
    default:
      return promotions;
  }
}
