export function normalizeHandle(s: string) {
    return s
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // remove combining diacritic marks
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .toLowerCase()
}

export default normalizeHandle
