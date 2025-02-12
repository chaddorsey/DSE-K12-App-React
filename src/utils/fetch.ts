interface RetryOptions {
  maxRetries?: number;
  delayMs?: number;
}

export async function fetchWithRetry(
  url: string, 
  options: RetryOptions = {}
): Promise<Response> {
  const { maxRetries = 3, delayMs = 1000 } = options;
  let lastError: Error = new Error('Failed to fetch');

  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
    } catch (error: unknown) {
      lastError = error instanceof Error ? error : new Error('Failed to fetch');
      console.log(`Attempt ${i + 1} failed, retrying in ${delayMs}ms...`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }

  throw lastError;
} 