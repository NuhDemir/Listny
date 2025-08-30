export const errorHandler = (err, req, res, next) => {
  console.error("Global error handler", err);
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message,
  });
};
