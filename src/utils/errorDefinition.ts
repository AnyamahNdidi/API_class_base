import { HTTP, errorArgs } from '@interfaces/error.interface';

export class MainAppError extends Error {
  public readonly name: string;
  public readonly message: string;
  public readonly status: HTTP;
  public readonly isSuccess: boolean = true;

  constructor(args: errorArgs) {
    super(args.message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = args.name;
    this.message = args.message;
    this.status = args.status;

    if (args.isSuccess !== undefined) {
      this.isSuccess = args.isSuccess;
    }

    Error.captureStackTrace(this);
  }
}
