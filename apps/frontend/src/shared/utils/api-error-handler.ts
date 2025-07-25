export async function apiErrorHandler<T>(
  apiCall: () => Promise<{ data: T }>,
): Promise<T> {
  try {
    const response = await apiCall();
    return response.data;
  } catch (error: unknown) {
    const errMessage =
      error instanceof Error ? error.message : "Undefined error";

    console.error("API Error:", errMessage);
    throw new Error(errMessage);
  }
}
