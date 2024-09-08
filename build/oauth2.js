function introspectAccessToken(r) {
    r.subrequest("/_oauth2_send_request",
        function(reply) {
            if (reply.status == 200) {
                var response = JSON.parse(reply.responseText);
                r.log("--------------------------------------------------");
                if (response.active == true) {
                    r.return(204); // Token is valid, return success code
                } else {
                    r.return(403); // Token is invalid, return forbidden code
                }
            } else {
                r.return(401); // Unexpected response, return 'auth required'
            }
        }
    );
}

export default { introspectAccessToken }


// function introspectAccessToken(r) {
//     r.subrequest("/_oauth2_send_request",
//         function(reply) {
//             try {
//                 r.log('Subrequest status: ' + reply.status);
//                 r.log('Subrequest response body: ' + (reply.responseBody || 'null'));
                
//                 if (reply.status == 200) {
//                     var response = reply.responseBody.Value || '';
//                     response = response.trim();
                    
//                     if (response) {
//                         var jsonResponse = JSON.parse(response);
//                         if (jsonResponse.Active == true) { // Update to match the casing
//                             r.return(204); // Token is valid, return success code
//                         } else {
//                             r.return(403); // Token is invalid, return forbidden code
//                         }
//                     } else {
//                         r.return(400); // Bad Request, empty response body
//                     }
//                 } else {
//                     r.return(401); // Unexpected response, return 'auth required'
//                 }
//             } catch (e) {
//                 r.log('JSON parse error: ' + e.message);
//                 r.return(500); // Internal Server Error for JSON parsing issues
//             }
//         }
//     );
// }
