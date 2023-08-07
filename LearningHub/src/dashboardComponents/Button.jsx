import React from 'react';

import { useStateContext } from '../contexts/ContextProvider';
import { useUserAuth } from "../firebase/firebase";
const Button = ({ icon, bgColor, color, bgHoverColor, size, text, borderRadius, width }) => {
  const { setIsClicked, initialState } = useStateContext();
  return (
    <button
      type="button"
      onClick={() => {
        setIsClicked(initialState);
      } }
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};
export const ButtonLogout = ({ icon, bgColor, color, bgHoverColor, size, text, borderRadius, width }) => {
  const { setIsClicked, initialState } = useStateContext();
  const { signOutFirebase } = useUserAuth();
  return (
    <button
      type="button"
      onClick={ async () => {
        setIsClicked(initialState);
        let response = await signOutFirebase();
        console.log(response);
      } }
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};
export default Button;
