export function generateCustomValidationMessage(message, key) {
  let customMessage = "";
  switch (message) {
    case "Value is required":
      customMessage = `* ${key} is required`;
      break;

    case "Value is not a valid email address":
      customMessage = "* Please enter a valid email address";
      break;

   

    default:
      customMessage = " Validation error";
      break;
  }
  return customMessage;
}
