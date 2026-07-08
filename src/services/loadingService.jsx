let setLoading = null;

export const registerLoading = (setter) => {
  setLoading = setter;
};

export const showLoading = () => {
  setLoading?.(true);
};

export const hideLoading = () => {
  setLoading?.(false);
};
