export enum HTTP {
  OK = 200,
  CREATED = 201,
  REDIRECTED = 300,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  MOT_FOUND = 404,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  NETWORK_TIMEOUT = 599,
}

export interface errorArgs {
  name: string;
  message: string;
  status: HTTP;
  isSuccess: boolean;
}
