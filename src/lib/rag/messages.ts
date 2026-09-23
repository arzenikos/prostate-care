export const MESSAGES = {
  invalidRequest: "Invalid request body.",
  serverError: "Something went wrong. Please try again.",
  noContext:
    "I couldn't find anything in the source documents that answers that question.",
  rateLimited: "You're sending messages too quickly — please wait a moment.",
  genericError: "Something went wrong answering that question.",
} as const;