var expect = require('chai').expect;
var amazon = require('amazon-product-api');
require('dotenv').config();

describe("amazon api tests", function() {
    var client;

    before(function() {
        client = amazon.createClient({
            awsId: process.env.AWS_ID,
            awsSecret: process.env.AWS_SECRET,
            awsTag: process.env.AWS_TAG
        });
    });

    it("attempt to connect to amazon product api", function(done) {
        done();
    });
});