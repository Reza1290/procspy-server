import { NextFunction, Request, Response } from "express";

export default function corsMiddleware(req: Request, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Origin', 'https://192.168.2.7:800');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  // if (req.method === 'OPTIONS') {
  //   return res.sendStatus(204); 
  // }

  next();
}
