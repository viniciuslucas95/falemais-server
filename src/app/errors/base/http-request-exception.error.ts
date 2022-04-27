export class HttpRequestException extends Error {
    constructor(public name: string, public statusCode: number, message?: string) {
        super(message)
    }
}