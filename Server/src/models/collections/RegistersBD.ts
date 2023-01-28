import { model, Schema, Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'


export interface IRegisterBDSchema extends Document {
    type: string;
    user: string;
    date: Date;
    request: any;
    response: any;
}

const RegisterDbSchema = new Schema<IRegisterBDSchema>({
    type: { type: String, required: true },
    date: { type: Date, required: true },
    request: { type: Object, required: true },
    response: { type: Object, required: true },
    user: { type: String },

}, {
    timestamps: true, // Nos crea un campo mas con la fecha de creacion y actualizacion del registro
    versionKey: false // Desactivamos la version del dato dentro de mongoose  
})

// Le indicamos a nuestro modelo, que va a poder paginar
RegisterDbSchema.plugin(mongoosePaginate)

export default model<IRegisterBDSchema>('RegistersDb', RegisterDbSchema);