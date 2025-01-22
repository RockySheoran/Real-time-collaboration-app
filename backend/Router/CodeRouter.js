
import express from "express"
import { getCode, setSet } from "../Cont/codeController.js";


export const CodeRouter = express.Router();

CodeRouter.post("/post",setSet);
CodeRouter.get("/get",getCode ) ;  