const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    name :{
        type : String,
        require : true,
    },
    imagedata : {
        type: Buffer,
        require : true,
    },
    useremail : {
        type:String,
        require : false,
    }
},{collection:'imgbucket'})  //to specify the name of the collection.Otherwise it Mongoose ODM will create collection with plural name adding 's' at end like "imagebuckets"

module.exports = mongoose.model("imgbucket",imageSchema);

