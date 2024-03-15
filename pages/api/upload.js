import multiparty from 'multiparty';
import {PutObjectCommand, S3Client, Type} from '@aws-sdk/client-s3';
import fs from 'fs'; // file system library to read the data of the file
import mime from 'mime-types';

const bucketName = 'livesh-next-ecommerce';

export default async function handler(req, res) {
    const form = new multiparty.Form()

    const {fields, files} = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({fields, files})
        })
    })

    const client = new S3Client({
        region: 'us-east-1',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        }
    })

    //console.log("now", files)
    const links = []

    /*
    for (const file of files.file) {    
        const extension = file.originalFilename.split('.').pop()
        const newFilename = Date.now() + '.' + extension

        client.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: newFilename,          // Key is the name the file will be stored in S3
            Body: fs.readFileSync(file.path),
            ACL: 'public-read',
            ContentType: mime.lookup(file.path),
        }))
        
        const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`

    }
    */

    const file = files.file[0]
    
    const extension = file.originalFilename.split('.').pop()
    const newFilename = Date.now() + '.' + extension

    await client.send(new PutObjectCommand({
        Bucket: bucketName,
        Key: newFilename,          // Key is the name the file will be stored in S3
        Body: fs.readFileSync(file.path),
        ACL: 'public-read',
        ContentType: mime.lookup(file.path),
    }))
    
    const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`

    res.json({link})
}

export const config = {
    api: {bodyParser: false} // To tell next js not to parse the req. Instead we want to parse it ourselves. Now req inside handler function will be raw data instead of json
}