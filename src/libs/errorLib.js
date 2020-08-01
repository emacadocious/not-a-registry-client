import * as Sentry from "@sentry/browser";
import { toast } from 'react-toastify';

const isLocal = process.env.NODE_ENV === "development";

export function onError(error) {
  console.log(process.env)
  let errorInfo = {};
  let message = error.toString();

  // Auth errors
  if (!(error instanceof Error) && error.message) {
    errorInfo = error;
    message = error.message;
    error = new Error(message);
    // API errors
  } else if (error.config && error.config.url) {
    errorInfo.url = error.config.url;
  }

  logError(error, errorInfo);

  toast.error(message)
}

export function initSentry() {
  if (isLocal) {
    return;
  }

  Sentry.init({ dsn: "https://9f8da9a8301a4e03b56f5b3c825d84a5@o416818.ingest.sentry.io/5313447" });
}

export function logError(error, errorInfo = null) {
  if (isLocal) {
    return;
  }

  Sentry.withScope((scope) => {
    errorInfo && scope.setExtras(errorInfo);
    Sentry.captureException(error);
  });
}
