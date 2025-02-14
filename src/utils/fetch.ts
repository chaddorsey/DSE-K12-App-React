interface RetryOptions {
  maxRetries?: number;
  delayMs?: number;
  validateResponse?: (response: Response) => boolean;
}

export async function fetchWithRetry(url: string, options: RetryOptions = {}) {
  const { maxRetries = 3, delayMs = 1000, validateResponse = (res) => res.ok } = options;
  let lastError: Error = new Error('Initial fetch attempt failed');

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url);
      if (validateResponse(response)) {
        return response;
      }
      lastError = new Error(`Invalid response from ${url}`);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Failed to fetch');
      if (attempt < maxRetries) {
        console.log(`Attempt ${attempt} failed, retrying in ${delayMs}ms...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }

  throw lastError;
} 