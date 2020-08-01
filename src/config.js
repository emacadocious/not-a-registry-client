const {
  REACT_APP_STRIPE_KEY_DEV,
  REACT_APP_S3_REGION_DEV,
  REACT_APP_S3_BUCKET_DEV,
  REACT_APP_API_GATEWAY_REGION_DEV,
  REACT_APP_API_GATEWAY_URL_DEV,
  REACT_APP_COGNITO_REGION_DEV,
  REACT_APP_COGNITO_USER_POOL_ID_DEV,
  REACT_APP_COGNITO_APP_CLIENT_ID_DEV,
  REACT_APP_COGNITO_IDENTITY_POOL_ID_DEV
} = process.env;

const dev = {
  STRIPE_KEY: REACT_APP_STRIPE_KEY_DEV,
  s3: {
    REGION: REACT_APP_S3_REGION_DEV,
    BUCKET: REACT_APP_S3_BUCKET_DEV
  },
  apiGateway: {
    REGION: REACT_APP_API_GATEWAY_REGION_DEV,
    URL: REACT_APP_API_GATEWAY_URL_DEV
  },
  cognito: {
    REGION: REACT_APP_COGNITO_REGION_DEV,
    USER_POOL_ID: REACT_APP_COGNITO_USER_POOL_ID_DEV,
    APP_CLIENT_ID: REACT_APP_COGNITO_APP_CLIENT_ID_DEV,
    IDENTITY_POOL_ID: REACT_APP_COGNITO_IDENTITY_POOL_ID_DEV
  }
};

const prod = {
  STRIPE_KEY: "pk_test_51GwW4oBe5ZMf8HfoqsQVfm3xnjmnCJqON6rGblG28uRdTXUapmWav5u1nW0YkKacdzAcr2uORetCQlRuOxhpPfMO00OL21BdiB",
  s3: {
    REGION: "us-east-1",
    BUCKET: "not-a-registry-api-prod-attachmentsbucket-u5t6jce8fird"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://07dw1p0aw4.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_8XLV5lkr8",
    APP_CLIENT_ID: "2ostqvevqbgdo810k2mbo73n6s",
    IDENTITY_POOL_ID: "us-east-1:509f4464-918e-4441-8bf5-0d5a30b5028c"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
