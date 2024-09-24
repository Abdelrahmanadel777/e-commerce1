import multer from "multer"
import { v4 as uuidv4 } from 'uuid';
const fileUpload = (folderName) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `uploads/${folderName}`)
        },
        filename: (req, file, cb) => {
            cb(null, uuidv4() + '_' + file.originalname)
        }
    })
    const upload = multer({ storage })
    return upload
}
export const uploadSingleFile = (fieldName, folderName) => fileUpload(folderName).single(fieldName)
export const uploadArrayFile = (arrayFileName, folderName) => fileUpload(folderName).fields(arrayFileName)