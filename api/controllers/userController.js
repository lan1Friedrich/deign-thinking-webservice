const AuthUtil = require("../util/AuthUtil");
const UserUtil = require("../util/UserUtil");
module.exports = class API{
	addUser(data){

	}

	async getUsers(){
		let resp = await new UserUtil().getUsers();
		if(resp.error){
			return {status: 500, message: {message: "Error",error: resp.error}}
		}
		return {status: 200, message: {message: "Success",data: resp}}
	}

	async deleteUser(data){
		let resp = await new UserUtil().deleteUser(data.body.email);
		if(resp.error){
			return {status: 500, message: {message: "Error",error: resp.error}}
		}
		return {status: 200, message: {message: "Success",data: resp}}
	}

	async settings(data){

		let decoded = await new AuthUtil().decodeToken(data.auth)
		data.body.email = decoded.decoded.data.email

		let resp = await new UserUtil().settings(data.body);
		console.log(resp)
		if(resp.error){
			return {status: 500, message: {message: "Error",error: resp.error}}
		}

		let token = await new AuthUtil().encodeToken(resp.result);
		if(token.error){
			return {status: 500, message: {message: "Error",error: token.error}}
		}
		return {status: 200, message: {message: "success",token: token.result}}
	}



}