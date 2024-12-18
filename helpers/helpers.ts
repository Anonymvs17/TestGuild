export function transformTextIntoId(text: string): string {
    return text.toLowerCase().replace(/\s+/g, '-');
}