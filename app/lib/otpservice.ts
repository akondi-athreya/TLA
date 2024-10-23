import otpSchema from '@/app/models/otp';
import connectDB from '@/app/lib/db';

export const generateOTP = (): string => {
  return Math.floor(1000 + Math.random() * 9000).toString(); // 4 digit OTP
};

// Function to store OTP (This is just an example, implement your own storage)
export const storeOTP = async (email: string, otp: string) => {
  connectDB();
  const expirationTime = new Date(Date.now() + 5 * 60 * 1000);
  console.log(`Storing OTP ${otp} for email ${email}`);
  await otpSchema.create({ email: email, otp: otp, expiresAt: expirationTime });
};
