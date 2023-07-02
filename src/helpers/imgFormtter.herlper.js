const multer = require('multer');

const imgformat = multer.diskStorage({
    filename: (req, file, cb)=>{
        const {originalname} = file;
        const formatName = originalname.toLowerCase().replace(/\s+/g, '-');
        const currentDate = new Date();
        const finalName= currentDate.getTime() +'-'+ formatName;
    cb(null, finalName); 
    }
})

module.exports = {
    imgformat
}