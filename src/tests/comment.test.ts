import app from '../index';
import request from "supertest";

describe('GET /comment/:page ', ()=>{
    it("List comment simple", async()=>{
        const result= await request(app).get(`/comment/${1}`);
        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('comment');
    })
});

describe(`GET /comment/author/:page`, ()=>{
    it("List comment by author", async()=>{
        const result= await request(app).get(`/comment/author/${1}`).send({author:"cercatrova"});
        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('comment');
    })
});

describe(`GET /comment/date/:page`, ()=>{
    it("List comment by date", async()=>{
        const result= await request(app).get(`/comment/date/${1}`).send({date:"2022-02-18"});
        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('comment');
    })
});

describe('GET /comment/tag/:page', ()=>{
    it("List comment by Tag", async()=>{
        const result= await request(app).get(`/comment/tag/${1}`).send({tag:"story_30361850"});
        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('comment');
    })
});

describe('GET /comment/filter/page', ()=>{
    it("Filter list comment", async()=>{
        const result= await request(app).get(`/comment/filter/${1}`).send({author:"ot",tags:["author_ot","comment"]});
        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('comment');
    })
});

describe('DELETE /comment/:id', ()=>{
    it("Delete comment", async()=>{
        const result= await request(app).delete(`/comment/${1}`);
        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('comment');
    })
})