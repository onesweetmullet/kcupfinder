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
        client.itemSearch({
            keywords: 'kcup',
            ProductGroup: 'Grocery',
            itemPage:'5'
        }, function(err, results, response) {
            if (err)
                console.log('err = ' + err);
            else {
                //console.log('results = ');
                //console.log(JSON.stringify(results));
                //console.log('response = ' + JSON.stringify(response));

                // calculate unit price

                console.log('Total pages found: ' + response.TotalPages[0]);
                console.log('Total items found: ' + response.TotalResults[0]);
                console.log('');

                for (var i = 0; i < results.length; i++) {
                    for (var j = 0; j < results[i].ItemAttributes.length; j++) {

                        var numberPattern = /\d+/g;
                        var title, formattedPrice, currencyCode, currencyPrefix, price, quantity, pricePerUnit, feature;


                        try {
                            title = results[i].ItemAttributes[j].Title;
                        } catch (ex) {}

                        try {
                            feature = results[i].ItemAttributes[j].Feature;
                        } catch(ex) {}

                        try {
                            formattedPrice = results[i].ItemAttributes[j].ListPrice[0].FormattedPrice;
                        } catch(ex) {}

                        try {
                            currencyCode = results[i].ItemAttributes[j].ListPrice[0].CurrencyCode[0];

                            if (currencyCode === "USD")
                                currencyPrefix = '$';
                            else
                                currencyPrefix = '';

                        } catch(ex) {}

                        try {
                            price = (results[i].ItemAttributes[j].ListPrice[0].Amount / 100).toFixed(2);
                        } catch (ex) {}

                        try {
                            quantity = results[i].ItemAttributes[j].Size.toString().match(numberPattern)
                        } catch (ex) {}

                        try {
                            pricePerUnit = Math.round((price / quantity) * 100) / 100;
                        } catch (ex) {}



                        console.log('Title: ' + title);
                        console.log('Description: ' + feature);
                        console.log('Price: ' + currencyPrefix + price);
                        console.log('Quantity: ' + quantity);
                        console.log('Price per Unit: ' + currencyPrefix + pricePerUnit);
                        console.log('');

                    }
                }
            }

            done();
        });

    });
});