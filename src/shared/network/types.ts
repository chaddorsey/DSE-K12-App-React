interface INetworkConfig {
  retry: {
    attempts: number;
    baseDelay: number;
    maxDelay: number;
  };
  cache: {
    questionBatchSize: Record<string, number>;
    ttl: number;
  };
} 