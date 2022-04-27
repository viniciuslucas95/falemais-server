import { NextFunction, Request, Response } from "express";
import { HttpRequestException } from "../errors/http-request-exception.error";

export function errorsHandler({ name, message, statusCode }: HttpRequestException, req: Request, res: Response, next: NextFunction) {
    if (!statusCode) {
        console.error(`ERROR: ${message}`)
        return res.status(500).json({ name: 'InternalServerError' })
    }

    res.status(statusCode).json({ name, message })
}