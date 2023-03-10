import express from "express";
import { createAlbum, getListAlbumes, deleteAlbum, updateAlbum, buyAlbum, getAllPurchasedAlbumes } from './controller'
import { checkRolesHandler } from '../../middlewares/checkRolesHandler'
import { mockHandler } from "../../middlewares/mockHandler";
import { authHandler } from "../../middlewares/authHandler";
import { validatorCreateAlbum } from "./validators/createAlbum";
import { validatorUpdateAlbum } from "./validators/updateAlbum";
import { validatorDeleteAlbum } from "./validators/deleteAlbum";
import { validatorBuyAlbum } from "./validators/buyAlbum";

const router = express.Router();

router.use(authHandler)
router.use(mockHandler)

/** 
 * @swagger
 * /api/albumes/createAlbum:
 *    post:
 *      tags: [Albumes]  
 *      summary: "Crear un nuevo Album"
 *      description: Este endpoint es para crear un Album.  
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemasDto/createAlbumData" 
 *      responses:
 *        '200':
 *          description: .
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemasDto/createAlbumSuccess"
 *        '400':
 *          description: .
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemasDto/createAlbumError"
 *      security:
 *       - bearerAuth: []
 *       - idSecurity: []
 */
router.post('/createAlbum', checkRolesHandler(), validatorCreateAlbum, createAlbum)

/** 
 * @swagger
 * /api/albumes/getAllAlbumes:
 *    get:
 *      tags: [Albumes]  
 *      summary: "Obtener listado de albumes"
 *      description: Este endpoint es para obtener un listado paginado de todos los albumes con sus respectivas figuritas.  
 *      parameters:
 *        - name: page
 *          in: query
 *          description: 'El numero de la pagina a traer'
 *          required: false
 *          schema:
 *            type: integer
 *            format: int64   
 *        - name: filterText
 *          in: query
 *          description: 'Texto por el cual se filtraran los albumes'
 *          required: false
 *          schema:
 *            type: string 
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      security:
 *       - bearerAuth: []
 *       - idSecurity: []
 */
router.get('/getAllAlbumes', checkRolesHandler(['User']), getListAlbumes)

/** 
 * @swagger
 * /api/albumes/deleteAlbum/{id}:
 *    delete:
 *      tags: [Albumes]  
 *      summary: "Eliminar un Album"
 *      description: Recibe como parametro el Id del Album a eliminar.  
 *      parameters:
 *        - name: id
 *          in: path
 *          description: 'Id del Album'
 *          required: true
 *          schema:
 *            type: string 
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      security:
 *       - bearerAuth: []
 *       - idSecurity: []
 */
router.delete('/deleteAlbum/:id', checkRolesHandler(), validatorDeleteAlbum, deleteAlbum)

router.put('/updateAlbum/:id', checkRolesHandler(), validatorUpdateAlbum, updateAlbum)

router.post('/buyAlbum', checkRolesHandler(['User']), validatorBuyAlbum, buyAlbum)

router.get('/getAllPurchasedAlbumes', checkRolesHandler(['User']), getAllPurchasedAlbumes)



export default router