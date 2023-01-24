import { Request, Response, NextFunction } from "express"
import { matchedData } from "express-validator"
import { IPage } from "../../interface/IPage"
import { IAlbumDto } from "./dto/frontToBack/IAlbum.dto."
import logic from './logic'




const createAlbum = async (req: Request, res: Response, next: NextFunction) => {

    const payload: IAlbumDto = matchedData(req) as IAlbumDto
    req.locals.info = payload
    const data: any = await logic.createAlbum(payload)
    req.locals.result = data

    if (data?.error) return next(data.error)

    req.locals.finished = true
    res.json(data)
    next()
}

const getListAlbumes = async (req: Request, res: Response, next: NextFunction) => {

    const payload: IPage = { page: req.locals.page }
    req.locals.info = payload
    const data: any = await logic.getListAlbumes(payload)
    req.locals.result = data

    if (data?.error) return next(data.error)

    req.locals.finished = true
    res.json(data)
    next()
}

export {
    createAlbum,
    getListAlbumes
}