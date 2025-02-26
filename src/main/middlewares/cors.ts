import { NextFunction, Request, Response } from "express";

export default (req: Request, res: Response, next: NextFunction): void => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', '*');
    res.set('Access-Control-Allow-Headers', '*');
    next();
}