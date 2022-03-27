let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);
const { Genre } = require('../src/db')
const url= 'http://localhost:3001';
const idGenre = "9881cf69-d493-4763-9a8b-53047d994a51"
var agent = chai.request.agent(url)
var token = ""
const { AUTH_PASSWORD } = process.env;

describe('Authenticate a user: ',()=>{
    it('should receive an OK and a cookie with the authentication token', (done) => {
    agent
    .post('/auth/login')
    .send({email:'msosa89@outlook.com', password:AUTH_PASSWORD})
    .end( function(err,res){
    token = res.body.token
    expect(res).to.have.status(200);
    done();
    });
    });
});

describe('get all genres: ',()=>{
    it('should get all genres', (done) => {
    chai.request(url)
    .get('/genres')
    .set({ "Authorization": `Bearer ${token}` })
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(200);
    done();
    });
    });
});

describe(`get the genre with id: ${idGenre}`,()=>{
    it(`should get the genre with id ${idGenre}`, (done) => {
    Genre.findByPk(idGenre)
        .then(gen => !gen && Genre.create({
            idGenre: idGenre,
            imgGenre: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648302110/Challenge%20NodeJs%20Alkemy/vqd3rsrey78fmfthqnqt.jpg",
            nameGenre: "genreCreated"
        })).then(() => {
    chai.request(url)
    .get(`/genres/${idGenre}`)
    .set({ "Authorization": `Bearer ${token}` })
    .end( function(err,res){
    console.log(res.body);
    expect(res.body).to.have.property('idGenre').to.be.equal(idGenre);
    expect(res).to.have.status(200);
    done();
    });
    })
    });
});

describe(`get the genre with id incorrect: `,()=>{
    it(`should receive an error`, (done) => {
    chai.request(url)
    .get(`/genres/1234`)
    .set({ "Authorization": `Bearer ${token}` })
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(500);
    done();
    });
    });
});

describe('post a genre: ',()=>{
    it('should insert a genre', (done) => {
    Genre.findOne({
        where: {
            nameGenre: "newGenre"
        }
    }).then(response => response.destroy().then())
    chai.request(url)
    .post('/genres')
    .set({ "Authorization": `Bearer ${token}` })
    .send({
        imgGenre: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648302110/Challenge%20NodeJs%20Alkemy/vqd3rsrey78fmfthqnqt.jpg",
        nameGenre: "newGenre",
        movies:["Hercules"]
    })
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(200);
    done();
    });
    });
});

describe('post a existent genre: ',()=>{
    it('should receive an error', (done) => {
    Genre.findOne({
        where: {
            nameGenre: "existentGenre"
        }
    }).then(response => !response && Genre.create({
        imgGenre: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648302110/Challenge%20NodeJs%20Alkemy/vqd3rsrey78fmfthqnqt.jpg",
        nameGenre: "existentGenre",
        movies: ["Hercules"]
    })).then(() => {
        chai.request(url)
        .post('/genres')
        .set({ "Authorization": `Bearer ${token}` })
        .send({
            imgGenre: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648302110/Challenge%20NodeJs%20Alkemy/vqd3rsrey78fmfthqnqt.jpg",
            nameGenre: "existentGenre",
            movies: ["Hercules"]

        })
        .end( function(err,res){
        console.log(res.body);
        expect(res).to.have.status(500);
        done();
    });
})
});
});

describe('post a genre with error in url image: ',()=>{
    it('should receive an error', (done) => {
    chai.request(url)
    .post('/genres')
    .set({ "Authorization": `Bearer ${token}` })
    .send({
        imgGenre: "NotURL",
        nameGenre: "noturl",
        movies:["Hercules"]
    })
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(500);
    done();
    });
    });
});

describe(`delete the genre with id ${idGenre}`,()=>{
    it('should delete the genre with id 9881cf69-d493-4763-9a8b-53047d994a56', (done) => {
        Genre.findByPk(idGenre).then(gen => !gen &&
        Genre.create({
            idGenre: idGenre,
            imgGenre: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648302110/Challenge%20NodeJs%20Alkemy/vqd3rsrey78fmfthqnqt.jpg",
            nameGenre: "deleteGenre"
        })).then(() => {
        chai.request(url)
        .del(`/genres/${idGenre}`)
        .set({ "Authorization": `Bearer ${token}` })
        .end( function(err,res){
        console.log(res.body);
        expect(res).to.have.status(200);
        done();
    });
    })});
});

describe(`delete the genre with incorrect id`,()=>{
    it(`should receive an error`, (done) => {
        chai.request(url)
        .del(`/genres/1234`)
        .set({ "Authorization": `Bearer ${token}` })
        .end( function(err,res){
        console.log(res.body);
        expect(res).to.have.status(500);
        done();
    })
    });
});

describe(`update name of genre with id ${idGenre}: `,()=>{
    it('should update name of genre with id', (done) => {
    Genre.findByPk(idGenre)
    .then((gen) =>{
            !gen && Genre.create({
            idGenre: idGenre,
            imgGenre: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648302110/Challenge%20NodeJs%20Alkemy/vqd3rsrey78fmfthqnqt.jpg",
            nameGenre: "updateGenre"
        })})
        .then( () => {
            chai.request(url)
            .put(`/genres/${idGenre}`)
            .set({ "Authorization": `Bearer ${token}` })
            .send({
                name: "Updated"
            })
            .end( function(err,res){
            console.log(res.body);
            expect(res).to.have.status(200);
            done();
        })
        })
    });
});
    
describe(`update genre with incorrect url format: `,()=>{
    it('should receive an error', (done) => {
    Genre.findByPk(idGenre)
    .then((gen) =>{
            !gen && Genre.create({
                idGenre: idGenre,
                imgGenre: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648302110/Challenge%20NodeJs%20Alkemy/vqd3rsrey78fmfthqnqt.jpg",
                nameGenre: "genreNotUrl"
        })})
        .then( () => {
            chai.request(url)
            .put(`/genres/${idGenre}`)
            .set({ "Authorization": `Bearer ${token}` })
            .send({
                imgGenre: "notUrl"
            })
            .end( function(err,res){
            console.log(res.body);
            expect(res).to.have.status(500);
            done();
        })
        })
    });
});