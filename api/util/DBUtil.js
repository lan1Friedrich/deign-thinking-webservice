const mysql = require("mysql")
const dotenv = require("dotenv")
dotenv.config()


let connection = null;

module.exports = class DBUtil{

	async createConnection(){
		connection = mysql.createConnection({
			host: process.env.DB_HOST || "localhost",
			user: process.env.DB_USER || "root",
			password: process.env.DB_PASSWORD || "",
			database: process.env.DB_DATABASE || "solar"
		})
	}

	async getConnection(){
		return new Promise((resolve, reject) => {
			connection.connect(function(err) {
				if (err) {
					reject(err)
				}
				resolve(connection)
			});
		})
	}
	async query(query, params){
		return new Promise((resolve, reject) => {

			if(connection == null){
				this.createConnection()
			}

			connection.query(query, params, function (err, result) {
				if (err) {
					console.log(err)
					reject(err)
				}
				resolve(result)
			});
		})
	}
}