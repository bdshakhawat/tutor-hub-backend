
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: number
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};
// ------checking token payload start------
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4xQGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIiLCJpZCI6IjY4MDViYzQxYjg4OGVjMTg4Y2NlMzgyNiIsImlhdCI6MTc0NTczMDEzMywiZXhwIjoxNzQ5MzMwMTMzfQ.D6M__kbTg8X3QB9z33NtVg5V3m0twL1u5MnV3uBpeh8';

// Decode the token to inspect the payload
// const decodedPayload = jwt.decode(token);

// Log the decoded payload to check the contents
// console.log('Decoded Payload:', decodedPayload);
// ------checking token payload end------

// const verifyToken = (token: string, secret: Secret): JwtPayload => {
//   return jwt.verify(token, secret) as JwtPayload;
// };

const verifyToken = (token: string, secret: Secret): JwtPayload | null => {
  try {
    // Attempt to verify the token using the provided secret
    const decoded = jwt.verify(token, secret) as JwtPayload;
    return decoded;
  } catch (error) {
    // Log the error for debugging purposes
    console.error("JWT Verification Error: ", error);

    // Return null if the token is invalid or expired
    return null;
  }
};


export const jwtHelpers = {
  createToken,
  verifyToken,
};





