import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: NextRequest) {
    try {
        const { email, password, role } = await req.json();

        // Validate input
        if (!email || !password || !role) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Connect to the database
        await connectToDatabase();

        // Find user
        const user = await User.findOne({ email, role });
        if (!user) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.NEXTAUTH_SECRET || 'fallback_secret',
            { expiresIn: '1d' }
        );

        // Return user info and token
        const { password: _, ...userWithoutPassword } = user.toObject();

        return NextResponse.json({
            message: "Login successful",
            user: userWithoutPassword,
            token
        });

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Failed to login" }, { status: 500 });
    }
}