// Loading service retired in favor of inline non-blocking Skeleton Loading
let activeRequests = 0;

export const registerLoading = () => {};

export const showLoading = () => {
  activeRequests++;
};

export const hideLoading = () => {
  if (activeRequests > 0) activeRequests--;
};
