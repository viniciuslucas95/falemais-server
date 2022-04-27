import { Router, Request, Response, NextFunction } from "express";
import { STATUS_CODE } from "../constants/status-code.constant";
import { TariffsService } from "../services/tariffs.service";
import { idValidation } from "../validations/id.validation";
import { tariffsCreationValidation } from "../validations/tariffs-creation.validation";
import { tariffsUpdateValidation } from "../validations/tariffs-update.validation copy";

export class TariffsController {
    constructor(private service: TariffsService, public router: Router) {
        this.setupPost()
        this.setupPatch()
        this.setupDelete()
        this.setupGetAll()
    }

    private setupPost() {
        this.router.post('/', tariffsCreationValidation, async (req: Request, res: Response, next: NextFunction) => {
            try {
                const result = await this.service.create(req.body)
                res.status(STATUS_CODE.CREATED).json(result)
            } catch (err) {
                next(err)
            }
        })
    }

    private setupPatch() {
        this.router.patch('/:id', idValidation, tariffsUpdateValidation, async (req: Request, res: Response, next: NextFunction) => {
            try {
                await this.service.update(req.body.id, req.body)
                res.sendStatus(STATUS_CODE.NO_CONTENT)
            } catch (err) {
                next(err)
            }
        })
    }

    private setupDelete() {
        this.router.delete('/:id', idValidation, async (req: Request, res: Response, next: NextFunction) => {
            try {
                await this.service.delete(req.body.id)
                res.sendStatus(STATUS_CODE.NO_CONTENT)
            } catch (err) {
                next(err)
            }
        })
    }

    private setupGetAll() {
        this.router.get('/', async (req: Request, res: Response, next: NextFunction) => {
            try {
                const result = await this.service.findAll()
                res.json(result)
            } catch (err) {
                next(err)
            }
        })
    }
}