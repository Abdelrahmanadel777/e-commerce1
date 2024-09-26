import { connect } from "mongoose";

export const dbConnection = () => {
    connect('mongodb+srv://bedoadel201:7FnAadeWIuUItLU0@cluster0.whtfm.mongodb.net/e-commerce1').then(() => console.log('database is connected successfully')

    ).catch(() => console.log('database is not connected'))
}

