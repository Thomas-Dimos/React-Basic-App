
class HTTPRequest{

    sendHTTPRequest = (method,URL,token,data) => new Promise ((resolve,reject) => {
        const request = new XMLHttpRequest();
        request.onreadystatechange = async (e) => {
            if (request.readyState !== 4){
                return;
            }
            if (request.status === 200) {
               resolve({status: 200, response: request.response});
            }else{
                reject({status: request.status, response: request.response});
            }
        }
        request.open(method,URL,true);
        if(token){
            request.setRequestHeader('x-access-token',token);
            request.send();
        }else{
            request.setRequestHeader('Content-Type','application/json');
            request.setRequestHeader('Accept','application/json');
            const dataToSend = JSON.stringify(data);
            request.send(dataToSend);
        }
   });

}

const HttpRequest = new HTTPRequest();
export default HttpRequest;