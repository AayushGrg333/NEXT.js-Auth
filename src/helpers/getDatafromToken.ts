import jwt from "jsonwebtoken";
import {NextRequest} from "next/server"

export const getDataFromToken = (request: NextRequest) => {
    const cookieToken = request.cookies.get("token")?.value || "";

    if (!cookieToken) {
        return null;
    }

    try {
        const secretKey = process.env.JWT_SECRET_KEY;

        const payload: any = jwt.verify(cookieToken, secretKey!);

        console.log("Decoded JWT payload:", payload);

        return payload.id;
    } catch (error: any) {
        // Log error details
        console.error("JWT verification failed:", error.message);
        return null;
    }
};
