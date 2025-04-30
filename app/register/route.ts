import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Student from '@/models/Student';

export async function POST(req: NextRequest) {
    try {
        const { name, email, password, confirmPassword, role, institutionId } = await req.json();

        // Validate input
        if (!name || !email || !password || !role || !institutionId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        if (password !== confirmPassword) {
            return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
        }

        // Connect to the database
        await connectToDatabase();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "Email already in use" }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            institutionId,
        });

        // If student, create student record
        if (role === 'student') {
            await Student.create({
                userId: user._id,
                courses: [],
            });
        }

        // Return success without sending password
        const { password: _, ...userWithoutPassword } = user.toObject();

        return NextResponse.json({
            message: "User registered successfully",
            user: userWithoutPassword
        }, { status: 201 });

    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ error: "Failed to register user" }, { status: 500 });
    }
}