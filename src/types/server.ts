export type ServerMessage = {
  success?: boolean;
  error?: boolean;
  message: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isServerMessage = (data: any): data is ServerMessage => {
  return (data?.success ?? data?.error) && typeof data?.message === 'string';
};