const AWS = require('aws-sdk')
const sharp = require('sharp')

const s3 = new AWS.S3()

exports.handler = async (event, constext, callback)=>{

  const Bucket = event.Records[0].s3.bucket.name;
  const Key =decodeURIComponent(event.Records[0].s3.object.key)
  console.log('Bucket, Key: ', Bucket, Key)
  const filename = Key.split('/')[Key.split('/').length -1]
  const ext = Key.split('.')[Key.split('.').length -1].toLowerCase() //확장자

  const requiredFormat = ext === 'jpg' ? 'jpeg' : ext

  try {
    const s3Object = await s3.getObject({Bucket, Key}).promise();
    console.log('origin size: ', s3Object.Body.length)
    const resizedImage = await sharp(s3Object.Body)
      .resize(400,400,{fit: 'inside'})
      .toFormat(requiredFormat)
      .toBuffer()

    await s3.putObject({
      Bucket,
      Key: `thumb/${filename}`,
      Body: resizedImage
    }).promise()
    console.log(resizedImage)
    return callback(null, `thumb/${filename}`)
  }catch (err){
    console.log(err)
    return callback(err)
  }
  
}