import { LibsqlError } from "@libsql/client";
import { customAlphabet } from "nanoid";
import { ZodError, ZodType } from "zod";

export const timestamps: { createdAt: true; updatedAt: true } = {
  createdAt: true,
  updatedAt: true,
};

export const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789");

/**
 * Returns the current date and time in the format "YYYY-MM-DD HH:mm:ss".
 * @returns {string} The current date and time.
 */
export function datetimeNow() {
  return new Date().toISOString().slice(0, 19).replace("T", " ");
}

/**
 * Handles a LibsqlError and returns an object with a message property containing the appropriate error message.
 *
 * @param error - The LibsqlError object to handle.
 * @returns An object with a message property containing the appropriate error message.
 */
export function handleLibSqlError(error: LibsqlError) {
  const uniqueConstraint =
    error.code === "SQLITE_CONSTRAINT_UNIQUE"
      ? "Email already subscribed"
      : null;
  return {
    message: { email: uniqueConstraint ?? "Server Error" },
  };
}

/**
 * @SEE: blog.stackademic.com/form-validation-with-zod-8e30c9fb464a
 * Handles a ZodError with a single level of issues.
 * #NOTE: used by handleZodValidation below
 * @param {ZodError<unknown>} error - The ZodError object to handle.
 * @returns {string | Record<string, string>} - The error message or a record of form data with error messages.
 */
export const handleOneLevelZodError = ({ issues }: ZodError<unknown>) => {
  const formData: Record<string, string> = {};

  // check to make sure there is no nested issues
  if (issues.length === 1 && issues[0].path.length < 1)
    return issues[0].message;

  issues.forEach(({ path, message }) => {
    formData[path.join("-")] = message;
  });

  return formData;
};

/**
 * Validates the given form data against the provided schema.
 *
 * @param formData - The form data to validate.
 * @param schema - The schema to validate against.
 * @returns An object containing the validation result.
 */
export function validateSchema(formData: FormData, schema: ZodType<any, any>) {
  try {
    const data = schema.parse(Object.fromEntries(formData));
    return { data };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        message: handleOneLevelZodError(error),
      };
    }
  }
}
