import {MongoClient} from "mongodb";

export const dbConnent = async (uri:string,name:string,collection:string)=>{
    try{
        console.log('Попытка подключения к MongoDB...');
        const client = await MongoClient.connect(uri);
        console.log('Успешное подключение к MongoDB');
        return client.db(name).collection(collection)
    }
    catch(err){
        console.error('Ошибка подключения к MongoDB:', err);
        throw err;
    }

}