export const sendSuccessResponse = (res, statusCode, data) => {
  res.status(statusCode).json({
    success: true,
    data: data
  });
};

export const sendErrorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({
    success: false,
    error: message
  });
};
