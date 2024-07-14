import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user: { [key: object]: any };
    doctor: {
      d_id: number;
    };
  }
}
