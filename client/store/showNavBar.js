/* ----------------------- ACTION TYPES ------------------------ */

const VIEW_NAVBAR = 'VIEW_NAVBAR';

/* ----------------------- INITIAL STATE ----------------------- */

const initialState = true;

/* ---------------------- ACTION CREATORS ---------------------- */

export const viewNavBar = bool => ({ type: VIEW_NAVBAR, navBarInView: bool });

/* -------------------------- REDUCER -------------------------- */

export default function showNavBar(state = initialState, action) {
  switch (action.type) {
    case VIEW_NAVBAR:
      return action.navBarInView;
    default:
      return state;
  }
}
