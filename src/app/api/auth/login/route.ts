// import { NextRequest,NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import {neon} from '@neondatabase/serverless';
// const sql = neon(`${process.env.NEXT_PUBLIC_DATABASE_URL}`)


// export async function POST(req: NextRequest) {
//     try {
//       const { email, password } = await req.json();
  
//       // 1. Get user by email
//       const user = await sql`SELECT * FROM Users where email=${email}`
        
//       if (!user) {
//         return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
//       }
  
//       // 2. Compare passwords
//       const isCorrectPassword = await bcrypt.compare(password, user.password);
//       if (!isCorrectPassword) {
//         return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
//       }
  
//       // 3. Create JWT
//       const token = jwt.sign(
//         { userId: user.id, role: user.role },
//         process.env.JWT_SECRET!,
//         { expiresIn: '1h' }
//       );
  
//       // 4. Set cookie
//       cookies().set('authToken', token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         maxAge: 60 * 60,
//         path: '/',
//       });
  
//       return NextResponse.json({ message: 'Login successful' });
//     } catch (err) {
//       console.error('[LOGIN_ERROR]', err);
//       return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//     }
//   }
  