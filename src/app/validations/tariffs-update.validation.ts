import { NextFunction, Request, Response } from "express";
import { DddBadRequestException } from "../errors/ddd-bad-request-exception.error";
import { validateDdd } from "./helpers/validate-ddd.helper";
import { validatePrice } from "./helpers/validate-price.helper";

export function tariffsUpdateValidation(req: Request, res: Response, next: NextFunction) {
    const { originDdd, destinyDdd, pricePerMin } = req.body

    if (originDdd && destinyDdd) if (originDdd === destinyDdd) throw new DddBadRequestException()

    const validatedBody = {
        originDdd: typeof originDdd !== 'undefined' ? validateDdd(originDdd) : null,
        destinyDdd: typeof destinyDdd !== 'undefined' ? validateDdd(destinyDdd) : null,
        pricePerMin: typeof pricePerMin !== 'undefined' ? validatePrice(pricePerMin) : null
    }

    req.body = validatedBody

    next()
}