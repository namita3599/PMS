import { clerkClient } from "@clerk/clerk-sdk-node";
import { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
  auth?: {
    clerkId: string;
  };
}

export const clerkAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Missing Authorization header" });
    }

    const token = authHeader.replace("Bearer ", "");

    const payload = await clerkClient.verifyToken(token);

    req.auth = {
      clerkId: payload.sub,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
