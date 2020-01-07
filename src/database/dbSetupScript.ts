import { MongoClient, ObjectId } from 'mongodb';
import * as _ from 'lodash';
import * as data from './db_json.json'

const DB_NAME = "serverapp";
const COLLECTION_NAME = "users";

let _mongoDBURL = "";
export let usersCollection: any;

export function getObjectID(_id: string) {
    return new ObjectId(_id);
}

export function initDB (mongoDBURL: string) {
    _mongoDBURL = mongoDBURL;
    MongoClient.connect(_mongoDBURL, async (err: any, client: any) => {
        if (err) { throw err; }
        console.log("Database created!");

        const DATA_BASE = client.db(DB_NAME);

        DATA_BASE.createCollection(COLLECTION_NAME, (err: any, collection: any) => {
            if (err) { throw err; }
            console.log("Collection created!");

            collection.estimatedDocumentCount((err: any, count: number) => {
                if (!err && count === 0) {
                    let filledData = _.map(data, (item: any) => {
                        let dataForMerge = {
                            "firstName": `First Name ${item._id}`,
                            "secondName": `Second Name ${item._id}`,
                            "lastName": `Last Name ${item._id}`,
                            "address": `Person Address ${item._id}`
                        };
                        return {...item, ...dataForMerge}
                    });

                    collection.insertMany(filledData, (err: any, res: any) => {
                        if (err) { throw err; }
                        console.log("Number of documents inserted: " + res.insertedCount);
                        client.close();
                    });
                }
            });
        });

        usersCollection = DATA_BASE.collection(COLLECTION_NAME);
    })
}

