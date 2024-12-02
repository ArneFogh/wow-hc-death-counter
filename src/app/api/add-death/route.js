// In /api/add-death/route.js

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, level, reason, characterClass, player } = body;

    if (!name || !level || !reason || !characterClass || !player) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    await addDeath({ name, level, reason, characterClass, player });
    return NextResponse.json(
      { message: "Character added successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
