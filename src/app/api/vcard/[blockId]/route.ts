import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { generateVCard } from "@/lib/vcard";
import { VCardData } from "@/lib/types/database";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ blockId: string }> }
) {
    const { blockId } = await params;

    // Optional: basic uuid validation to avoid malformed queries
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(blockId)) {
        return NextResponse.json({ error: "Invalid block ID format" }, { status: 400 });
    }

    const supabase = await createClient();

    // Fetch the block and strictly ensure it's a vcard type
    const { data: block, error } = await supabase
        .from("blocks")
        .select(`
            *,
            profiles:profile_id (
                is_published
            )
        `)
        .eq("id", blockId)
        .eq("type", "vcard")
        .single();

    if (error || !block) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Verify profile is published (type casting necessary due to join structure differences)
    const profile = block.profiles as unknown as { is_published: boolean };

    // Note: Due to RLS, unpublished blocks for unauthenticated users won't be returned by Supabase anyway,
    // but we can add this as an extra check or if bypassing RLS on server.
    if (profile && profile.is_published === false) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const vcardData = block.data as unknown as VCardData;
    const vcfString = generateVCard(vcardData);

    const filename = `${vcardData.firstName}_${vcardData.lastName}.vcf`.replace(/\s+/g, '_');

    return new NextResponse(vcfString, {
        status: 200,
        headers: {
            "Content-Type": "text/vcard; charset=utf-8",
            "Content-Disposition": `attachment; filename="${filename}"`,
        },
    });
}
