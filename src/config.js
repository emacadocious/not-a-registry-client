const dev = {
  STRIPE_KEY: "pk_test_51GwW4oBe5ZMf8HfoqsQVfm3xnjmnCJqON6rGblG28uRdTXUapmWav5u1nW0YkKacdzAcr2uORetCQlRuOxhpPfMO00OL21BdiB",
  s3: {
    REGION: "us-east-1",
    BUCKET: "not-a-registry-api-dev-attachmentsbucket-udlpoklq6y1f"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://gnk7t4279h.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_WzZ9rG11O",
    APP_CLIENT_ID: "49tammeb8gghjhehklp1gms9nj",
    IDENTITY_POOL_ID: "us-east-1:64112c0b-37d3-455f-aa1a-a4cf5ebd1374"
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
