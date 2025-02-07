export const createMockResponse = (options: {
  ok?: boolean;
  status?: number;
  data?: unknown;
  text?: string;
} = {}) => {
  const {
    ok = true,
    status = 200,
    data = {},
    text = ''
  } = options;

  return {
    ok,
    status,
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(text)
  };
}; 