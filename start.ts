const url = require("is-url");


const build = async () => {
  if (process.env.NODE_ENV === "development") {
    // CHECK REQUIRED ENV VARIABELS
    const requiredEnvVariables = [

    const missingEnvVariables = requiredEnvVariables.filter(
      (envVar) => !process.env[envVar] || process.env[envVar]?.trim() === ""
    );

    if (missingEnvVariables.length > 0) {
      console.warn(
        `Missing the following required environment variables: ${missingEnvVariables.join(", ")}`
      );
      throw new Error(
        `Missing environment variables: ${missingEnvVariables.join(", ")}`
      );
    }

    // Check APP_KEY
    if ((process.env.APP_KEY as string).length < 32)
      throw new Error(`APP_KEY is not valid: MUST BE AT LEAST 32 BYTES LONG.`);

    // Check NEXT_URL
    if (!url(process.env.NEXT_URL))
      throw new Error(`NEXT_URL is not valid: MUST BE A VALID URL.`);
  } else {
    return 0;
  }
};

export default build;
