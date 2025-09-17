/**
 * Shared constants used across the application.
 */

/**
 * Twilio constants
 */
export const TWILIO_WHATSAPP_FROM = 'whatsapp:+14155238886';
export const TWILIO_QUICKREPLY2_SID = 'HX6c6c260dd71fc49fa19afdef5692cb9d'; // 2-button template
export const TWILIO_QUICKREPLY3_SID = 'HX90784e01c2facb3f9aa4e77b118290a5'; // 3-button template

/**
 * Media links
 */
export const WELCOME_IMAGE_URL = 'https://res.cloudinary.com/dn3g1tzq1/image/upload/v1755066077/photo.png';
export const MESSAGE_TTL_SECONDS = 60 * 60; // 1 hour
export const USER_STATE_TTL_SECONDS = 24 * 60 * 60; // 24 hours

export const USER_REQUEST_LIMIT = 5;
export const TOKEN_REFILL_PERIOD_MS = 10 * 1000;