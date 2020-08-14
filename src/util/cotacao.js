// USAR ATIVO DE EXEMPLO PETR3.BVMF
const request = require('request')
const cotacao = (symbol,callback) => {
    const api_token = '768349b0b612e978885a7ef8f2d5d249'

    const url =  `http://api.marketstack.com/v1/eod?access_key=${api_token}&symbols=${symbol}`
    request({url: url, json: true}, (err, response) => {

        if(err) {
            const error = {
                message:`Something went wrong: ${err}`
            }
           return callback(null, error)
          
        }
         
       //const parsedJSON = response.body
          if(response.body.data[0] === undefined){
            const error = {
                message:`No data found`
                
          }
          return callback(null,error)
        }
        const parsedJSON = response.body
          const data = {
            
              symbol: parsedJSON.data[0].symbol,
          
           open: parsedJSON.data[0].open,
           close: parsedJSON.data[0].close,
          high: parsedJSON.data[0].high,
            low: parsedJSON.data[0].low

            }
        callback(data, null)
  })
  }
 
  module.exports = cotacao