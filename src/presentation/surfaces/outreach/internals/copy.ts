// src/presentation/surfaces/outreach/internals/copy.ts
//
// Every string the outreach surface renders. Grouped so the form, the status
// banner and the fallback affordance can be reworded without opening a component.

export const FIELD_COPY = {
  name: { label: "Name", placeholder: "Your name" },
  email: { label: "Email", placeholder: "you@example.com" },
  message: {
    label: "Message",
    placeholder: "Tell me about your project or opportunity...",
  },
} as const;

export const SUBMIT_COPY = { idle: "Send Message", busy: "Sending..." } as const;

export const CHANNEL_COPY = {
  email: "Email",
  phone: "Phone",
  location: "Location",
} as const;

export const STATUS_COPY = {
  sent: "Message sent! I'll get back to you soon.",
  rejected: "Sending failed — use the email button below instead.",
  offline:
    "Sending didn't go through, but your message isn't lost — send it with one click below.",
  fallbackAction: "Send via my email app instead",
} as const;

/** Hard cap on the message field, matching the transport's expectations. */
export const MESSAGE_MAX_LENGTH = 1500;

export const MESSAGE_ROWS = 5;
