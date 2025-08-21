import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // ตรวจค่าวิธีง่าย ๆ
    const required = ['employeeId', 'fullName', 'status', 'location']
    for (const k of required) {
      if (!body?.[k]) {
        return NextResponse.json({ error: `Missing: ${k}` }, { status: 400 })
      }
    }

    const record = {
      id: crypto.randomUUID(),
      incident: body.incident ?? null,
      employeeId: String(body.employeeId),
      fullName: String(body.fullName),
      status: String(body.status),
      location: String(body.location),
      phone: body.phone ? String(body.phone) : null,
      notes: body.notes ? String(body.notes) : null,
      at: new Date().toISOString(),
      ua: req.headers.get('user-agent') ?? undefined,
    }

    // ⬇️ ปัจจุบัน: แค่ log (สำหรับ dev)
    // TODO: ต่อฐานข้อมูลจริง (Supabase/PlanetScale/Firestore/Sheets)
    console.log('[CHECKIN]', record)

    return NextResponse.json({ ok: true, id: record.id })
  } catch (err) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
}
