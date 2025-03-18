"use server"
import bcrypt from 'bcrypt';

const saltRounds = 10;  // Number of hashing rounds

export async function hashPassword(password : string) {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}

