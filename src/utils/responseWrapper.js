/**
 * Wraps a successful JSON response in a consistent format.
 * @param {*} data - The data payload to send.
 * @param {string} [message='Success'] - An optional message.
 * @returns {object} The standardized response object.
 */
// This is the fix: Changed from 'export const wrapResponse' to 'export default'
export default (data, message = 'Success') => {
  return {
    success: true,
    message,
    meta: Array.isArray(data) ? { count: data.length } : undefined,
    data,
  };
};

/**
 * Wraps an error response in a consistent format.
 * @param {string} message - The error message.
 * @param {Array} [errors=[]] - An array of validation errors.
 * @returns {object} The standardized error response object.
 */
export const wrapError = (message, errors = []) => {
  return {
    success: false,
    message,
    errors,
  };
};

