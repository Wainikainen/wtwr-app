function headersWithToken (){
 const token = localStorage.getItem("jwt");
 return  {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
}

function processResponse(res) {
return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

export {
    processResponse, headersWithToken
}