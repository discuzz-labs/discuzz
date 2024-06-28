const logUI = (err: any, message: string) => {
  if (process.env.NODE_ENV == "development") {
    throw new Error(`${message} - ${err}`);
  }
};

export default logUI;
