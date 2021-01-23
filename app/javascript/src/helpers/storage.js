const setToLocalStorage = ({ authToken, email, userId }) => {
  localStorage.setItem("authToken", authToken);
  localStorage.setItem("authEmail", email);
  localStorage.setItem("authUserId", userId);
};

const clearLocalStorage = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("authEmail");
  localStorage.removeItem("authUserId");
};

const getFromLocalStorage = (key) => {
  return localStorage.getItem(key);
};

export { setToLocalStorage, getFromLocalStorage, clearLocalStorage };
