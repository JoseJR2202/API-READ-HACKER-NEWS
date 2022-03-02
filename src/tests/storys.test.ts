import app from '../index';
import request from "supertest";

describe('GET /story/:page', ()=>{
    it('List story simple', async()=>{
        const result= await request(app).get(`/story/${1}`);
        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('storys');
    })
});

describe(`GET /story/author/:page`, ()=>{
    it("List story by author", async()=>{
        const result= await request(app).get(`/story/author/${1}`).send({author:"jerrygoyal"});
        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('storys');
    })
});

describe(`GET /story/title/:page`, ()=>{
    it("List story by title", async()=>{
        const result= await request(app).get(`/story/title/${1}`).send({title:"Covid"});
        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('storys');
    })
});

describe(`GET /story/date/:page`, ()=>{
    it("List story by date", async()=>{
        const result= await request(app).get(`/story/date/${1}`).send({date:"2022-02-18"});
        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('storys');
    })
});

describe('GET /story/tag/:page', ()=>{
    it("List story by Tag", async()=>{
        const result= await request(app).get(`/story/tag/${1}`).send({tag:"story"});
        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('storys');
    })
});

describe('GET /story/filter/page', ()=>{
    it("Filter list story", async()=>{
        const result= await request(app).get(`/story/filter/${1}`).send({author:"jerrygoyal ", title:"Node"});
        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('storys');
    })
});

describe('DELETE /story/:id', ()=>{
    it("Delete story", async()=>{
        const result= await request(app).delete(`/story/${1}`);
        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('storys');
    })
})