var expect = require('chai').expect;
var amazon = require('amazon-product-api');

describe("amazon api tests", function() {
    var client;

    before(function() {
        client = amazon.createClient({
            awsId: "AKIAIC7PZC3NLJZEHPVA",
            awsSecret: "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",
            awsTag: "aws Tag"
        });
    });

    it("attempt to connect to amazon product api", function(done) {
        done();
    });
});