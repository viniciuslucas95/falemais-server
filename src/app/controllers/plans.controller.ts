import { Router, Request, Response, NextFunction } from "express";
import { STATUS_CODE } from "../constants/status-code.constant";
import { PlansService } from "../services/plans/plans.service";
import { idValidation } from "../validations/id.validation";
import { plansCreationValidation } from "../validations/plans/plans-creation.validation";
import { plansUpdateValidation } from "../validations/plans/plans-update.validation";

export class PlansController {
    constructor(private service: PlansService, public router: Router) {
        this.setupPost()
        this.setupPatch()
        this.setupDelete()
        this.setupGetAll()
        this.setupGetOne()
    }

    private setupPost() {
        this.router.post('/', plansCreationValidation, async (req: Request, res: Response, next: NextFunction) => {
            try {
                const result = await this.service.create(req.body)
                res.status(STATUS_CODE.CREATED).json(result)
            } catch (err) {
                next(err)
            }
        })
    }

    private setupPatch() {
        this.router.patch('/:id', idValidation, plansUpdateValidation, async (req: Request, res: Response, next: NextFunction) => {
            try {
                await this.service.update(parseInt(req.params.id), req.body)
                res.sendStatus(STATUS_CODE.NO_CONTENT)
            } catch (err) {
                next(err)
            }
        })
    }

    private setupDelete() {
        this.router.delete('/:id', idValidation, async (req: Request, res: Response, next: NextFunction) => {
            try {
                await this.service.delete(parseInt(req.params.id))
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

    private setupGetOne() {
        this.router.get('/:id', idValidation, async (req: Request, res: Response, next: NextFunction) => {
            try {
                const result = await this.service.findOne(parseInt(req.params.id))
                res.json(result)
            } catch (err) {
                next(err)
            }
        })
    }
}