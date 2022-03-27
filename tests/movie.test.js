let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);
const { Movie } = require('../src/db')
const url= 'http://localhost:3001';
const idMovie = "9881cf69-d493-4763-9a8b-53047d994a56"
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

describe('get all movies: ',()=>{
    it('should get all movies', (done) => {
    chai.request(url)
    .get('/movies')
    .set({ "Authorization": `Bearer ${token}` })
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(200);
    done();
    });
    });
});

describe(`get the movie with id: ${idMovie}`,()=>{
    it(`should get the movie with id ${idMovie}`, (done) => {
    Movie.findByPk(idMovie)
        .then(mov => !mov && Movie.create({
            idMovie: idMovie,
            imgMovie: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648302110/Challenge%20NodeJs%20Alkemy/vqd3rsrey78fmfthqnqt.jpg",
            titleMovie: "MovieCreated",
            release: "2022-01-01",
            score: "5",
            genres: ["Action"],
            characters: ["Simba"]
        })).then(() => {
    chai.request(url)
    .get(`/movies/${idMovie}`)
    .set({ "Authorization": `Bearer ${token}` })
    .end( function(err,res){
    console.log(res.body);
    expect(res.body).to.have.property('idMovie').to.be.equal(idMovie);
    expect(res).to.have.status(200);
    done();
    });
    })
    });
});

describe(`get movies by name and order DESC: `,()=>{
    it(`should get movies filter by name and order DESC`, (done) => {
    chai.request(url)
    .get(`/movies?name=a&order=DESC`)
    .set({ "Authorization": `Bearer ${token}` })
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(200);
    done();
    });
    });
});

describe(`get the movie with id incorrect: `,()=>{
    it(`should receive an error`, (done) => {
    chai.request(url)
    .get(`/movies/1234`)
    .set({ "Authorization": `Bearer ${token}` })
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(500);
    done();
    });
    });
});

describe('post a movie: ',()=>{
    it('should insert a movie', (done) => {
    Movie.findOne({
        where: {
            titleMovie: "newMovie"
        }
    }).then(response => response.destroy().then())
    chai.request(url)
    .post('/movies')
    .set({ "Authorization": `Bearer ${token}` })
    .send({
        imgMovie: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648302110/Challenge%20NodeJs%20Alkemy/vqd3rsrey78fmfthqnqt.jpg",
        titleMovie: "newMovie",
        release: "2022-01-01",
        score: "5",
        genres: ["Action"],
        characters: ["Simba"]
    })
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(200);
    done();
    });
    });
});

describe('post a existent movie: ',()=>{
    it('should receive an error', (done) => {
    Movie.findOne({
        where: {
            titleMovie: "existentMovie"
        }
    }).then(response => !response && Movie.create({
        imgMovie: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648302110/Challenge%20NodeJs%20Alkemy/vqd3rsrey78fmfthqnqt.jpg",
        titleMovie: "existentMovie",
        release: "2022-01-01",
        score: "5",
        genres: ["Action"],
        characters: ["Simba"]
    })).then(() => {
        chai.request(url)
        .post('/movies')
        .set({ "Authorization": `Bearer ${token}` })
        .send({
            imgMovie: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648302110/Challenge%20NodeJs%20Alkemy/vqd3rsrey78fmfthqnqt.jpg",
            titleMovie: "existentMovie",
            release: "2022-01-01",
            score: "5",
            genres: ["Action"],
            characters: ["Simba"]
        })
        .end( function(err,res){
        console.log(res.body);
        expect(res).to.have.status(500);
        done();
    });
})
});
});

describe('post a movie with error in url image: ',()=>{
    it('should receive an error', (done) => {
    chai.request(url)
    .post('/movies')
    .set({ "Authorization": `Bearer ${token}` })
    .send({
        imgMovie: "notURL",
        titleMovie: "NotUrl",
        release: "2022-01-01",
        score: "5",
        genres: ["Action"],
        characters: ["Simba"]
    })
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(500);
    done();
    });
    });
});

describe(`delete the movie with id ${idMovie}`,()=>{
    it('should delete the movie with id 9881cf69-d493-4763-9a8b-53047d994a56', (done) => {
        Movie.findByPk(idMovie).then(mov => !mov &&
        Movie.create({
            idMovie: idMovie,
            imgMovie: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648302110/Challenge%20NodeJs%20Alkemy/vqd3rsrey78fmfthqnqt.jpg",
            titleMovie: "existentMovie",
            release: "2022-01-01",
            score: "5",
            genres: ["Action"],
            characters: ["Simba"]
        })).then(() => {
        chai.request(url)
        .del(`/movies/${idMovie}`)
        .set({ "Authorization": `Bearer ${token}` })
        .end( function(err,res){
        console.log(res.body);
        expect(res).to.have.status(200);
        done();
    });
    })});
});

describe(`delete the movie with incorrect id`,()=>{
    it(`should receive an error`, (done) => {
        chai.request(url)
        .del(`/movies/1234`)
        .set({ "Authorization": `Bearer ${token}` })
        .end( function(err,res){
        console.log(res.body);
        expect(res).to.have.status(500);
        done();
    })
    });
});

describe(`update score of movie with id ${idMovie}: `,()=>{
    it('should update score of movie with id', (done) => {
    Movie.findByPk(idMovie)
    .then((mov) =>{
            !mov && Movie.create({
            idMovie: idMovie,
            imgMovie: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648302110/Challenge%20NodeJs%20Alkemy/vqd3rsrey78fmfthqnqt.jpg",
            titleMovie: "Update",
            release: "2022-01-01",
            score: "5",
            genres: ["Action"],
            characters: ["Simba"]
        })})
        .then( () => {
            chai.request(url)
            .put(`/movies/${idMovie}`)
            .set({ "Authorization": `Bearer ${token}` })
            .send({
                score: "10"
            })
            .end( function(err,res){
            console.log(res.body);
            expect(res).to.have.status(200);
            done();
        })
        })
    });
});
    
describe(`update movie with incorrect url format: `,()=>{
    it('should receive an error', (done) => {
    Movie.findByPk(idMovie)
    .then((mov) =>{
            !mov && Movie.create({
                idMovie: idMovie,
                imgMovie: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648302110/Challenge%20NodeJs%20Alkemy/vqd3rsrey78fmfthqnqt.jpg",
                titleMovie: "Delete",
                release: "2022-01-01",
                score: "5",
                genres: ["Action"],
                characters: ["Simba"]
        })})
        .then( () => {
            chai.request(url)
            .put(`/movies/${idMovie}`)
            .set({ "Authorization": `Bearer ${token}` })
            .send({
                imgMovie: "notUrl"
            })
            .end( function(err,res){
            console.log(res.body);
            expect(res).to.have.status(500);
            done();
        })
        })
    });
});