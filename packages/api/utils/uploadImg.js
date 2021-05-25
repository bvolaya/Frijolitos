const cloudinary = require('../config/cloudinary')
const path = require("path");
async function uploadPicture(files) {
    let urlFiles= {}

    for await(let img of Object.keys(files)) {

        if (process.env.NODE_ENV === 'prod'){
            let result = await upload(files[img][0].buffer)
            urlFiles[img] = result.secure_url

        }else {
            urlFiles[img] = path.resolve(__dirname,"..",files[img][0].destination + files[img][0].filename)
        }
    }
    return urlFiles
}

function upload(content){
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                folder: 'profile_pictures',
                eager : [{ width : 400, height : 400, crop : 'crop', gravity : 'face'}]
            }, (error, result) => {
                if (error) {
                    throw Exception('Upload failed')
                } else {
                    resolve(result)
                }
            }
        ).end(content)
    })
}

module.exports = {
    uploadPicture
}