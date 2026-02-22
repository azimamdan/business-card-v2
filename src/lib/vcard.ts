import { VCardData } from "./types/database";

export function escapeVCardValue(value: string): string {
    if (!value) return "";
    return value
        .replace(/\\/g, "\\\\")
        .replace(/;/g, "\\;")
        .replace(/,/g, "\\,")
        .replace(/\n/g, "\\n");
}

export function generateVCard(data: VCardData): string {
    const lines: string[] = [];

    lines.push("BEGIN:VCARD");
    lines.push("VERSION:3.0");

    const firstNameEscaped = escapeVCardValue(data.firstName);
    const lastNameEscaped = escapeVCardValue(data.lastName);

    // Name structure: FamilyName;GivenName;AdditionalNames;HonorificPrefixes;HonorificSuffixes
    lines.push(`N:${lastNameEscaped};${firstNameEscaped};;;`);

    // Formatted name
    lines.push(`FN:${firstNameEscaped} ${lastNameEscaped}`);

    if (data.company) {
        lines.push(`ORG:${escapeVCardValue(data.company)}`);
    }

    if (data.title) {
        lines.push(`TITLE:${escapeVCardValue(data.title)}`);
    }

    if (data.phone) {
        lines.push(`TEL;TYPE=CELL:${escapeVCardValue(data.phone)}`);
    }

    if (data.email) {
        lines.push(`EMAIL:${escapeVCardValue(data.email)}`);
    }

    lines.push("END:VCARD");

    // vCard spec requires \r\n line endings
    return lines.join("\r\n") + "\r\n";
}
