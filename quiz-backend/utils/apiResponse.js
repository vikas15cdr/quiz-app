export const sendSuccessResponse = (res, data, statusCode = 200) => {
  res.status(statusCode).json({ success: true, data });
};

export const sendErrorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({ success: false, error: message });
};