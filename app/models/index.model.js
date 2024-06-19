//schma is nothing but the creation of collection
//normal backend ko connect karneke li ye  use hota hai

// const { mongoose } = require(".");

// const {mongoose} = require(".");

// module.exports = mongoose => {
//     const CollectionData = mongoose.model(
//         "collectionData",
//         mongoose.Schema(
//             {
//                 title : String,
//                 discription : String,
//                 published : Boolean
//              },
//              {
//                 timestamps : true
//              }
//          )
//     );

//     return CollectionData;
// };

//front end ke sath connet karne ke liye is code ka use hota hai

module.exports = mongoose => {
    var schema = mongoose.Schema(
                     {
                            title : String,
                            discription : String,
                            published : Boolean
                         },
                         {
                            timestamps : true
                         }
    );
    schema.method("toJSON",()=>{
        const {__v,_id,...object} = this.toObject();
        object.id = _id;
        return object;
    });
    const CollectionData = mongoose.model(
        "collectionData",schema
    );
    return CollectionData;
}