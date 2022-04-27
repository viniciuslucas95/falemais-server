import { STATUS_CODE } from "../../constants/status-code.constant";
import { HttpRequestException } from "./http-request-exception.error";

export class NotFoundException extends HttpRequestException {
    constructor(name: string, message?: string) {
        super(name, STATUS_CODE.NOT_FOUND, message)
    }
}