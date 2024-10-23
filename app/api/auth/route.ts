import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectDB from '@/app/lib/db';
import User from '@/app/models/user';
import bcrypt from 'bcrypt';
import { JWT } from 'next-auth/jwt';
import { Session } from 'next-auth';

// Define user and session interfaces
interface AuthUser {
    id: string;
    username: string;
    email: string;
}

interface CustomSession extends Session {
    user: {
        id: string;
        username: string;
        email: string;
    };
}

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: 'Enter your username' },
                password: { label: 'Password', type: 'password', placeholder: 'Enter your password' },
            },
            async authorize(credentials) {
                await connectDB();
                const user = await User.findOne({ username: credentials?.username });

                if (!user) throw new Error('No user found with this username');

                const isValid = await bcrypt.compare(credentials!.password, user.password);

                if (!isValid) throw new Error('Invalid password');

                // Return the user data if authentication is successful
                return { id: user._id, username: user.username, email: user.email } as AuthUser;
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        // Update JWT callback to handle the user type
        async jwt({ token, user }) {
            if (user) {
                // Cast the user as AuthUser to ensure types are correct
                const authUser = user as AuthUser;
                token.id = authUser.id;
                token.username = authUser.username;
            }
            return token;
        },
        // Update Session callback with the CustomSession interface
        async session({ session, token }) {
            const customSession = session as CustomSession;

            // Ensure the token has id and username before assigning
            if (token && token.id && token.username) {
                customSession.user = {
                    id: token.id as string,
                    username: token.username as string,
                    email: customSession.user?.email || '',
                };
            }
            return customSession;
        },
    },
});

export { handler as GET, handler as POST };
