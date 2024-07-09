const url = require("is-url")

const build = async () => {
    if (process.env.NODE_ENV === "development") {
        // CHECK REQUIRED ENV VARIABELS
        const requiredEnvVariables = [
            'NEXT_PUBLIC_METADATA_NAME',
            'NEXT_PUBLIC_METADATA_TITLE',
            'NEXT_URL',
            'NEXT_PUBLIC_SENDEER_EMAIL',
            'NEXT_PUBLIC_SENDER_EMAIL_PASSWORD',
            'NEXT_PUBLIC_SENDER_EMAIL_PROVIDER',
            'APP_KEY',
            'DATABASE_URL'
        ];

        const missingEnvVariables = requiredEnvVariables.filter(envVar => !process.env[envVar] || process.env[envVar]?.trim() === "");

        if (missingEnvVariables.length > 0) {
            console.warn(`Missing the following required environment variables: ${missingEnvVariables.join(', ')}`);
            throw new Error(`Missing environment variables: ${missingEnvVariables.join(', ')}`)
        }

        // Chexk APP_KEY
        if(
            (process.env.APP_KEY as string).length >= 32 ) throw new Error(`AUTH_SECRET is not valid: MUST BE AT LEAST 32 BYTES LONG.`)


        // Check NEXT_URL
        if (!url(process.env.NEXT_URL)) throw new Error(`NEXT_URL is not valid: MUST BE A VALID URL.`)

    } else {
        return 0;
    }
    }

export default build;