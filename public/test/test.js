var supertest = require("supertest");
var should = require("should");
var assert = require("assert");

var server = supertest.agent("http://localhost:8080");

describe("SAMPLE unit test" , function(done) {
    /**
     * Below Test Case for Check Return Home Page
     */
    it("should return home page",function(done) {
        server
        .get("/")
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err,res) {
            
            res.status.should.equal(200);
           // res.body.error.should.equal(false);
            done();
        });
    });

    /**
     * Below Test Case is added for Create Record
     */
    it("should add new ToDO",function(done){
        server
        .post('/api/todos')
        .send({text : 'Test1'})
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err,response){
            
            response.status.should.equal(200);
            assert.equal(response.status,'200','Response status is not 200');
            assert.notEqual(response.body[0].id,'','Record Is Not Created');           
            done();
        });
    });

    /**
     * Below Test Case for Check get call working or not
     */
    it("Get List of Todo", function(done) {
        server
            .get('/api/todos')
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(error,response){
                assert.equal(response.status,'200','Response status is not 200');
                assert.notEqual(response.body,'','Data is not getting');
                done();
            });
    });
    /**
     * Check 404 Error
     */
    it("should return 404", function(done) {
        server
            .get('/api/GetDetails')
            .expect('Content-type',/json/)
            .expect(404)
            .end(function(error,response){
                assert.equal(response.status,'404','404 status is not returned');
                done();
            });

    })
});