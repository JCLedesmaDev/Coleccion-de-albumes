import { Request, Response, NextFunction } from "express"
import { matchedData } from "express-validator"
import { IPagination } from "../../interface/IPagination"
import logic from './logic'
import { IBuyAlbumDto } from "./dto/IBuyAlbum.dto"
import { ICreateAlbumDto } from "./dto/ICreateAlbum.dto."
import { IDeleteAlbumDto } from "./dto/IDeleteAlbum.dto"
import { IGetAllPurchasedAlbumesDto } from "./dto/IGetAllPurchasedAlbumes.dto"
import { IUpdateAlbumDto } from "./dto/IUpdateAlbum.dto"
import { controllerWrapper } from "../../utils/controllerWrapper"


const createAlbum = controllerWrapper(async (req: Request) => {
    const payload: ICreateAlbumDto = matchedData(req) as ICreateAlbumDto

    req.locals.info = payload
    return await logic.createAlbum(payload)
})

const getListAlbumes = controllerWrapper(async (req: Request) => {
    const payload = {
        page: req.query.page || 1,
        filterText: req.query.filterText
    } as IPagination

    req.locals.info = payload
    return await logic.getListAlbumes(payload)
})

const deleteAlbum = controllerWrapper(async (req: Request) => {
    const payload: IDeleteAlbumDto = matchedData(req) as IDeleteAlbumDto

    req.locals.info = { idAlbum: payload }
    return await logic.deteleAlbum(payload)
})

const updateAlbum = controllerWrapper(async (req: Request) => {
    const payload: IUpdateAlbumDto = matchedData(req) as IUpdateAlbumDto

    req.locals.info = payload
    return await logic.updateAlbum(payload)
})

const buyAlbum = controllerWrapper( async (req: Request) => {
    const payload: IBuyAlbumDto = matchedData(req) as IBuyAlbumDto

    req.locals.info = payload
    return await logic.buyAlbum(payload)
})

const getAllPurchasedAlbumes = controllerWrapper( async (req: Request) => {
    const payload = {
        page: req.query.page || 1,
        userId: req.locals.usrId,
        filterText: req.query.filterText || ''
    } as IGetAllPurchasedAlbumesDto

    req.locals.info = payload
    return await logic.getAllPurchasedAlbumes(payload)
})

export {
    createAlbum,
    getListAlbumes,
    deleteAlbum,
    updateAlbum,
    buyAlbum,
    getAllPurchasedAlbumes
}