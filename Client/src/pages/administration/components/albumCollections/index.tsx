import { Fragment, useEffect, useState } from "react";
import { useAdministrationStore } from "../../store";
import styleCSS from '../../index.module.css'
import { ModalContainer } from "../../../../components/PopupModal";
import { usePaginate } from "../../../../hooks/usePaginate";
import { useFormCustom } from "../../../../Hooks/useFormCustom";
import { InputsMockColeccion } from "./mocks/InputsColeccion";
import { Input } from "../../../../components/Input";
import { IInputs } from "../../../../components/Input/IInputs";
import { ICreateCollectionDto } from "../../interface/frontToBack/ICreateCollection.dto";
import { IAlbumCollectionModels } from "../../../../interface/models/IAlbumCollection.models";
import { useAppStore } from "../../../appStore";
// import appStore from "../../../appStore";

export const Collection: React.FC = () => {

    const store = useAdministrationStore()
    const appStore = useAppStore()

    const [statusAction, setStatusAction] = useState({ action: "", idColeccion: '' })

    const { form, handleChange, resetForm, setForm } = useFormCustom<ICreateCollectionDto>({
        title: ""
    });


    //METODOS
    const createCollection = async (event: any) => {
        event.preventDefault();

        const isCreate = await store.actions.createCollection(form)

        if (!isCreate) return
        await getAll();
        appStore.actions.setShowPopup(false)
        resetForm()
    };

    const getAll = async (page: number = 1) => {
        await store.actions.getAllAlbumCollections({ page })
    };

    const showPopup = () => {
        setForm({ title: "" })
        setStatusAction({
            action: "add",
            idColeccion: ''
        })
        appStore.actions.setShowPopup(true)
    }

    const openUpdateColeccion = (ColeccionAlbumes: IAlbumCollectionModels) => {
        setForm({ title: ColeccionAlbumes.title })
        setStatusAction({
            action: "update",
            idColeccion: ColeccionAlbumes.id
        })
        appStore.actions.setShowPopup(true)
    }

    const Put = async (event: any) => {

        //     try {
        //         event.preventDefault();
        //         storeGlobal.SetShowLoader(true)

        //         const { Result, MessageError } = await AdminCollectionService.updateAdminCollection(
        //             statusAction.idColeccion, formulario.Titulo
        //         );

        //         if (MessageError !== undefined) {
        //             throw new Error(MessageError);
        //         }

        //         storeGlobal.SetShowLoader(false);
        //         storeGlobal.SetMessageModalStatus(Result);
        //         storeGlobal.SetShowModalStatus(true);

        //         await getAll();
        //     } catch (error: any) {

        //         storeGlobal.SetShowLoader(false)
        //         storeGlobal.SetMessageModalStatus(`Uups... ha occurrido un ${error}. \n \n Intentelo nuevamente`)
        //         storeGlobal.SetShowModalStatus(true)

        //     } finally {
        //         resetForm()
        //         setTimeout(() => {
        //             storeGlobal.SetShowModalStatus(false)
        //         }, 5000);
        //         storeGlobal.SetShowModalContainer(false)
        //     }
    };

    const Delete = async (id: string) => {
        //     try {
        //         storeGlobal.SetShowLoader(true)

        //         const { Result, MessageError } = await AdminCollectionService.DeleteAdminCollection(id);

        //         if (MessageError !== undefined) {
        //             throw new Error(MessageError);
        //         }

        //         storeGlobal.SetShowLoader(false);
        //         storeGlobal.SetMessageModalStatus(Result);
        //         storeGlobal.SetShowModalStatus(true);

        //         await getAll();
        //     } catch (error: any) {

        //         storeGlobal.SetShowLoader(false)
        //         storeGlobal.SetMessageModalStatus(`Uups... ha occurrido un ${error}. \n \n Intentelo nuevamente`)
        //         storeGlobal.SetShowModalStatus(true)

        //     } finally {
        //         setTimeout(() => {
        //             storeGlobal.SetShowModalStatus(false)
        //         }, 5000);
        //     }
    };

    useEffect(() => {
        getAll();
    }, []);


    return (

        <Fragment>

            <table className={`${styleCSS.tableContainer}`} border={1}>
                <thead>
                    <tr>
                        <th>Selcciona la opcion deseada</th>
                        <th>
                            <button className={`${styleCSS.button}`} onClick={showPopup}>
                                Agregar coleccion
                            </button>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {
                        store.state.collection?.map((albumCollection: IAlbumCollectionModels, indexColeccion: number) => (
                            <tr key={indexColeccion}>
                                <th>{albumCollection.title}</th>
                                <th>
                                    <button className={`${styleCSS.buttonAdmin}`} onClick={
                                        () => openUpdateColeccion(albumCollection)
                                    }>Modificar</button>
                                    <button
                                        className={`${styleCSS.buttonAdmin}`}
                                        onClick={() => Delete(albumCollection.id)}
                                    >
                                        Eliminar
                                    </button>
                                </th>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <ModalContainer personCss={`${styleCSS.containerModalColeccion}`}>

                <p onClick={() => { appStore.actions.setShowPopup(false) }}
                    className={styleCSS.containerModalColeccion__closeBtn}
                >
                    <i className="fas fa-times"></i>
                </p>

                <h1>{statusAction.action === 'add' ? 'Crear' : 'Actualizar'}</h1>

                <form onSubmit={statusAction.action === 'add' ? createCollection : Put} >

                    {InputsMockColeccion.map((inputProps: IInputs, index: number) => (
                        <Input
                            key={index}
                            inputProps={inputProps}
                            value={form[inputProps.name]}
                            handleChange={handleChange}
                            errorMessage={inputProps.errorMessage}
                            pattern={inputProps.expReg}
                        />
                    ))}

                    <button type="submit">{statusAction.action === 'add' ? 'Crear' : 'Actualizar'}</button>
                </form>

            </ModalContainer>
        </Fragment >

    )
}