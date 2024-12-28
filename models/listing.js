const mongoose=require("mongoose");
const { Schema } = mongoose; 
const Review = require("./review");
const User = require("./user");

const listingSchema=new mongoose.Schema({
    title :{
        type:String,
        required: true
    },
    description :{
        type:String,
    },
    image :{
        url:String,
        filename:String
    },
    price :{
        type:Number,
        required: true
    },
    location :{
        type: String
    },
    country :{
        type: String,
        required: true
    },
    genre:{
        type:String,
        required:true
    },
    reviews:[
        {
        type: Schema.Types.ObjectId,
        ref:"review",
    },
],
    owner:{
    type: Schema.Types.ObjectId,
    ref:"User",
},geometry:{
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
   await Review.deleteMany({_id :{$in:listing.reviews}});
}
});
const Listing = mongoose.model("Listing", listingSchema);
module.exports= Listing;
