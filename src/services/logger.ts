export class Logger {
  private readonly context: string;

  constructor(context: string) {
    this.context = context;
  }

  private formatMessage(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] [${this.context}]: ${message}`;
  }

  public info(message: string): void {
    console.log(this.formatMessage("INFO", message));
  }

  public warn(message: string): void {
    console.warn(this.formatMessage("WARN", message));
  }

  public error(message: string, error?: Error | unknown): void {
    console.error(this.formatMessage("ERROR", message));
    if (error instanceof Error) {
      console.error(error.stack);
    } else if (error) {
      console.error(error);
    }
  }

  public debug(message: string): void {
    if (process.env.NODE_ENV !== "production") {
      console.debug(this.formatMessage("DEBUG", message));
    }
  }
}