console.log(process.env)

const dev = {
  STRIPE_KEY: "pk_test_51GwW4oBe5ZMf8HfoqsQVfm3xnjmnCJqON6rGblG28uRdTXUapmWav5u1nW0YkKacdzAcr2uORetCQlRuOxhpPfMO00OL21BdiB",
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-2-api-dev-serverlessdeploymentbucket-g5ywzf02qgqj"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://btu4tm1oe1.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_36vnTHUtC",
    APP_CLIENT_ID: "6j1uikbf1rcjrr8b5jm8svr8gb",
    IDENTITY_POOL_ID: "us-east-1:25398ba7-ef9e-4c80-bf7f-b650e9e938bc"
  }
};

const prod = {
  STRIPE_KEY: "pk_test_51GwW4oBe5ZMf8HfoqsQVfm3xnjmnCJqON6rGblG28uRdTXUapmWav5u1nW0YkKacdzAcr2uORetCQlRuOxhpPfMO00OL21BdiB",
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-2-api-prod-attachmentsbucket-1t4fzahipaxjh"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://hyyadruly5.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_4jFq0OZli",
    APP_CLIENT_ID: "3rvgipk4p6mp1kein686ik9iut",
    IDENTITY_POOL_ID: "us-east-1:ef45ef4a-9f27-42f8-9b39-3204a2e858b4"
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
