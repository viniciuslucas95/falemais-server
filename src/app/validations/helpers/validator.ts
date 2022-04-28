export interface Validator<T> {
    key: string
    validate(value: unknown): T
}