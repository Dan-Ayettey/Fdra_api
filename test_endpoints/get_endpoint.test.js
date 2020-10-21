const fetch=require('nodejs-fetch')
fetch.Promise = global.Promise;
describe('Testing get methods',()=>{
    let url='http://13.48.136.153/';
    let data= {

        "id":"5f8ddea43c761f082f55c564",  "age":"20","email":"danno.dotte@gmail.com","firstName":"Ayettey" ,
        "lastName":"Gate",
        "password":"Motherd_30",
        "telephoneNumber":"",
        "tagName":"Ictan",
        "role":"admin"


    }
    it('authenticate-user',async (done) => {

       const fetcher=new fetcher(url+'v1/users/auth',data)
        expect(fetcher).toBe(200)
        done();
    })

});
 function fetcher(url,data){
     (async () => {
        return await fetch(url, {
            method: 'GET',
            headers: 'Content-Type:application/json',
            body: JSON.stringify(data)
        }).then((response) => response.statusCode).then(value => value)
    })();
}


