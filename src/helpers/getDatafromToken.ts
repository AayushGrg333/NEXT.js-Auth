import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    const cookieToken = request.cookies.get("token")?.value || "";
        try {
            const secretKey = process.env.JWT_SECRET_KEY;
            const payload :any = jwt.verify(cookieToken, secretKey!);
            
            return payload.id
        } catch (error: any) {
            throw new Error(error.message);
        }
};
