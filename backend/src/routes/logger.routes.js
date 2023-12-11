import { Router } from "express";
import { addLogger } from "../config/logger.js";

const loggerRouter= Router();

loggerRouter.use(addLogger);

loggerRouter.get('/fatal', (req, res)=>{
    req.logger.fatal("mensaje fatal"),
    res.send("logger")
});

loggerRouter.get('/error', (req, res)=>{
    req.logger.error("mensaje error"),
    res.send("logger")
});

loggerRouter.get('/warning', (req, res)=>{
    req.logger.warning("mensaje warning"),
    res.send("logger")
});

loggerRouter.get('/info', (req, res)=>{
    req.logger.info("mensaje info"),
    res.send("logger")
});

loggerRouter.get('/http', (req, res)=>{
    req.logger.http("mensaje http"),
    res.send("logger")
});

loggerRouter.get('/debug', (req, res)=>{
    req.logger.debug("mensaje debug"),
    res.send("logger")
});

export default loggerRouter