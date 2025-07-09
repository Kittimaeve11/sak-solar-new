import nodemailer from 'nodemailer';

// OPTIONS handler รองรับ preflight request
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*', // เปลี่ยนเป็นโดเมน frontend คุณถ้าต้องการความปลอดภัย
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

// POST handler สำหรับส่งเมล
export async function POST(req) {
  const body = await req.json();
  const { topic, name, phone, email, message } = body;

  console.log("✅ EMAIL_PASS =", process.env.EMAIL_PASS ? "Exists" : "❌ Not Set");

  if (!topic || !name || !phone || !message) {
    return new Response(
      JSON.stringify({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' }),
      {
        status: 400,
        headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'sb.evesang@gmail.coื',
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: '"SAKSIAM SOLAR - Contact Form" <sb.evesang@gmail.com>',
      to: 'sb.evesang@gmail.com',
      subject: '📩 ข้อความใหม่จากแบบฟอร์มติดต่อ - SAKSIAM SOLAR',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #006699;">📨 รายละเอียดการติดต่อจากเว็บไซต์</h2>
          <p><strong>หัวข้อ:</strong> ${topic}</p>
          <p><strong>ชื่อผู้ติดต่อ:</strong> ${name}</p>
          <p><strong>เบอร์โทรศัพท์:</strong> ${phone}</p>
          ${email ? `<p><strong>อีเมล:</strong> <a href="mailto:${email}">${email}</a></p>` : ''}
          <p><strong>ข้อความที่ส่งมา:</strong></p>
          <div style="margin-left: 1em; padding: 0.5em; background-color: #f9f9f9; border-left: 4px solid #006699;">
            ${message.replace(/\n/g, '<br/>')}
          </div>
          <br/>
          <p style="font-size: 0.9em; color: #888;">-- ระบบอัตโนมัติจากเว็บไซต์ SAKSIAM SOLAR --</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: 'ส่งอีเมลเรียบร้อยแล้ว' }),
      {
        status: 200,
        headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error("❌ ส่งอีเมลไม่สำเร็จ:", error);
    return new Response(
      JSON.stringify({ message: 'เกิดข้อผิดพลาดภายในระบบ', error: error.message }),
      {
        status: 500,
        headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      }
    );
  }
}
