export function getDtoValues<T>(dto: T) {
    const keys = Object.keys(dto)

    return keys.map(key => (dto as any)[key])
}