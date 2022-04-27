import { NextFunction, Request, Response } from "express";
import { BadRequestException } from "../errors/base/bad-request-exception.error";

export function idValidation(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    if (typeof id !== 'string') throw new BadRequestException('IdMustBeSentAsAString')

    const idNumber = parseInt(id)

    if (isNaN(idNumber)) throw new BadRequestException('InvalidId', 'It must be a positive number (1+)')
    if (idNumber <= 0) throw new BadRequestException('InvalidId', 'It must be a positive number (1+)')

    req.params.id = idNumber.toString()

    next()
}