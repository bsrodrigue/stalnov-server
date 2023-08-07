import { User } from "@prisma/client"
import { Request as BaseRequest } from "express"

export type Request = BaseRequest & {
    jwt?: {
        user: User
    };
}