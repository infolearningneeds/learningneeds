import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET: Fetch all notices
export async function GET() {
  const { data, error } = await supabase
    .from("notices")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json({ notices: data || [] });
}

// POST: Create a new notice
export async function POST(req: Request) {
  const body = await req.json();

  const { error } = await supabase.from("notices").insert([
    {
      title: body.title,
      date: body.date,
      category: body.category,
      description: body.description,
    },
  ]);

  if (error)
    return NextResponse.json({ message: error.message }, { status: 400 });

  return NextResponse.json({ message: "Notice created successfully!" });
}

// PUT: Update a notice
export async function PUT(req: Request) {
  const body = await req.json();

  const { error } = await supabase
    .from("notices")
    .update({
      title: body.title,
      date: body.date,
      category: body.category,
      description: body.description,
    })
    .eq("id", body.id);

  if (error)
    return NextResponse.json({ message: error.message }, { status: 400 });

  return NextResponse.json({ message: "Notice updated successfully!" });
}

// DELETE: Delete a notice
export async function DELETE(req: Request) {
  const body = await req.json();

  const { error } = await supabase.from("notices").delete().eq("id", body.id);

  if (error)
    return NextResponse.json({ message: error.message }, { status: 400 });

  return NextResponse.json({ message: "Notice deleted successfully!" });
}
