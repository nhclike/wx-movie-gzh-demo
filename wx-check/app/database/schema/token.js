const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const TokenSchema=new Schema({
    name:String, //access_token
    token:String,
    expires_in:Number,
    meta:{
        createdAt:{
            type:Date,
            default:Date.now()
        },
        updatedAt:{
            type:Date,
            default:Date.now()
        }
    }
});


TokenSchema.pre('save',function (next) {
    if(this.isNew){
        this.meta.createdAt=this.meta.updatedAt=Date.now()
    }
    else{
        this.meta.updatedAt=Date.now();
    }

    next()
});

//model可以直接使用statics的方法
TokenSchema.statics={
    async getAccessToken () {
        const token = await this.findOne({
            name: 'access_token'
        });

        if (token && token.token) {
            token.access_token = token.token
        }

        return token
    },

    async saveAccessToken(data) {
        let token = await this.findOne({
            name: 'access_token'
        });

        if (token) {
            token.token = data.access_token;
            token.expires_in = data.expires_in;
        } else {
            //token即为通过模型new 出来的实体
            token = new Token({
                name: 'access_token',
                token: data.access_token,
                expires_in: data.expires_in
            })
        }

        await token.save();
        return data
    }
};

//指定schema建模
const Token=mongoose.model('Token',TokenSchema);
