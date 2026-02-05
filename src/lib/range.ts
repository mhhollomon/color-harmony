export function range(start: number, stop: number, step = 1): number[] {
    return Array.from(
        { length: (stop - start) / step },
        (_, i) => start + i * step
    );
}
