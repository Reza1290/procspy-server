import { NextFunction, Request, Response } from "express";

export default function corsMiddleware(req: Request, res: Response, next: NextFunction) {

  const allowedOrigins = [
    'https://192.168.2.7',
    'https://192.168.2.7:800',
    'null', // Chrome extension
  ];
  const origin = req.headers.origin!;

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  // if (req.method === 'OPTIONS') {
  //   return res.sendStatus(204); 
  // }

  next();
}
