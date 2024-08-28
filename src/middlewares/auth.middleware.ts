import { Request, Response, NextFunction } from "express";

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const { accessToken, refreshToken } = req.body.tokens;

    const authResponse = await fetch(
      `${process.env.API_URI}/api/v1/auth/authorize`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken, refreshToken }),
      }
    );

    const authData = await authResponse.json();

    req.body.authData = authData;

    if (authData.error) throw new Error();

    next();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ error: "authorization failed" });
    }
  }
}

export default authMiddleware;
