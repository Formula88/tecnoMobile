let setLoading = null;
let activeRequests = 0;

export const registerLoading = (setter) => {
  setLoading = setter;
};

export const showLoading = () => {
  activeRequests++;
  if (activeRequests === 1) {
    setLoading?.(true);
  }
};

export const hideLoading = () => {
  if (activeRequests > 0) {
    activeRequests--;
  }
  if (activeRequests === 0) {
    setLoading?.(false);
  }
};
