const envName = process.env.ENV || "qa";

const envConfig = {
  dev: {
    name: "dev",
    baseUrl: "https://www.saucedemo.com/",
    username: "dev_user",
    password: "dev_password"
  },
  // That is the saucedemo file
  qa: {
    name: "qa",
    baseUrl: "https://www.saucedemo.com/",
    username: "standard_user",
    password: "secret_sauce"
  },
  stage: {
    name: "stage",
    baseUrl: "https://www.saucedemo.com/",
    username: "stage_user",
    password: "stage_password"
  }
};

export const env = envConfig[envName as keyof typeof envConfig] || envConfig.qa;
export type Environment = typeof env;