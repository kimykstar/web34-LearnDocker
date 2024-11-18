import { ContainerSession } from "./session";
import { Request } from "express";

export interface RequestWithSession extends Request {
    session: ContainerSession;
}