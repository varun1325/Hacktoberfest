var searchTerm = "Oracle expenses routed to previous manager incorrectly";
var searchPayload = JSON.stringify({
    "rpSysId": "3f1dd0320a0a0b99000a53f7604a2ef9",
    "searchContextConfigId": "2e74f9b077e40210694782c79f5a99e8",
    "searchTerm": searchTerm
});
var aiClient = new sn_ws.RESTMessageV2();
aiClient.setEndpoint("https://nowops.service-now.com/api/now/aisa/search");
aiClient.setHttpMethod("POST");
 
aiClient.setRequestHeader("Content-Type", "application/json");
aiClient.setRequestHeader("Accept", "application/json");
 
// 🔐 FIXED: credentials must be string: "username:password"
var encodedAuth = GlideStringUtil.base64Encode("username:password");
aiClient.setRequestHeader("Authorization", "Basic " + encodedAuth);
aiClient.setRequestBody(searchPayload);
 
var aiResponse = aiClient.execute();
var aiResponseBody = aiResponse.getBody();
 
gs.info("✅ AI Search KB Status: " + aiResponse.getStatusCode());
 
var aiResult = JSON.parse(aiResponseBody);
var searchResults = aiResult.result && aiResult.result.search && aiResult.result.search.searchResults;
 var numbers1 = [];
        for (var i = 0; i < searchResults.length; i++) {
            var cols = searchResults[i].columns;
            for (var j = 0; j < cols.length; j++) {
                if (cols[j].fieldName == "number") numbers1.push(cols[j].value);
            }
        }
        gs.info("Top 10 Articles: " + numbers1.join(", "));
