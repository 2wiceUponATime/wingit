import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const supabase = await createClient();
    const code = searchParams.get('code');

    if (!code) {
        redirect('/error');
    }

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
        redirect('/error');
    }

    redirect("/private");
}