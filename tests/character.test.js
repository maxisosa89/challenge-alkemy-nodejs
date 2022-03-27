let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);
const { Character } = require('../src/db')
const url= 'http://localhost:3001';
const idCharacter = "9881cf69-d493-4763-9a8b-53047d994a57"
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
   
   

describe('get all characters: ',()=>{
    it('should get all characters', (done) => {
    chai.request(url)
    .get('/characters')
    .set({ "Authorization": `Bearer ${token}` })
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(200);
    done();
    });
    });
});

describe(`get the character with id: ${idCharacter}`,()=>{
    it(`should get the character with id ${idCharacter}`, (done) => {
    Character.findByPk(idCharacter)
        .then(char => !char && Character.create({
            idCharacter: idCharacter,
            imgCharacter: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648302110/Challenge%20NodeJs%20Alkemy/vqd3rsrey78fmfthqnqt.jpg",
            nameCharacter: "CharCreated",
            age: "3",
            weight: "1",
            story: "Timon is a comical meerkat and the life partner of Pumbaa the warthog who appears as a minor character in the 1994 Disney film The Lion King and its related universe, most notably the 2004 spin-off film The Lion King 1½. where he is the main protagonist.",
            movies: ["The Lion King"]
        })).then(() => {
    chai.request(url)
    .get(`/characters/${idCharacter}`)
    .set({ "Authorization": `Bearer ${token}` })
    .end( function(err,res){
    console.log(res.body);
    expect(res.body).to.have.property('idCharacter').to.be.equal(idCharacter);
    expect(res).to.have.status(200);
    done();
    });
    })
    });
});

describe(`get characters by name, age, and/or weight : `,()=>{
    it(`should get characters filter by name, age, and/or weight `, (done) => {
    chai.request(url)
    .get(`/characters?name=a&age=5&weight=150`)
    .set({ "Authorization": `Bearer ${token}` })
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(200);
    done();
    });
    });
});

describe(`get the character with id incorrect: `,()=>{
    it(`should receive an error`, (done) => {
    chai.request(url)
    .get(`/characters/1234`)
    .set({ "Authorization": `Bearer ${token}` })
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(500);
    done();
    });
    });
});

describe('post a character: ',()=>{
    it('should insert a character', (done) => {
    Character.findOne({
        where: {
            nameCharacter: "Timon"
        }
    }).then(response => response.destroy().then())
    chai.request(url)
    .post('/characters')
    .set({ "Authorization": `Bearer ${token}` })
    .send({
        imgCharacter: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648302110/Challenge%20NodeJs%20Alkemy/vqd3rsrey78fmfthqnqt.jpg",
        nameCharacter: "Timon",
        age: "3",
        weight: "1",
        story: "Timon is a comical meerkat and the life partner of Pumbaa the warthog who appears as a minor character in the 1994 Disney film The Lion King and its related universe, most notably the 2004 spin-off film The Lion King 1½. where he is the main protagonist.",
        movies: ["The Lion King"]
    })
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(200);
    done();
    });
    });
});

describe('post a existent character: ',()=>{
    it('should receive an error', (done) => {
    Character.findOne({
        where: {
            nameCharacter: "Timon"
        }
    }).then(response => !response && Character.create({
        imgCharacter: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648302110/Challenge%20NodeJs%20Alkemy/vqd3rsrey78fmfthqnqt.jpg",
        nameCharacter: "Timon",
        age: "3",
        weight: "1",
        story: "Timon is a comical meerkat and the life partner of Pumbaa the warthog who appears as a minor character in the 1994 Disney film The Lion King and its related universe, most notably the 2004 spin-off film The Lion King 1½. where he is the main protagonist.",
        movies: ["The Lion King"]
    })).then(() => {
        chai.request(url)
        .post('/characters')
        .set({ "Authorization": `Bearer ${token}` })
        .send({
        imgCharacter: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648302110/Challenge%20NodeJs%20Alkemy/vqd3rsrey78fmfthqnqt.jpg",
        nameCharacter: "Timon",
        age: "3",
        weight: "1",
        story: "Timon is a comical meerkat and the life partner of Pumbaa the warthog who appears as a minor character in the 1994 Disney film The Lion King and its related universe, most notably the 2004 spin-off film The Lion King 1½. where he is the main protagonist.",
        movies: ["The Lion King"]
        })
        .end( function(err,res){
        console.log(res.body);
        expect(res).to.have.status(500);
        done();
    });
})
});
});

describe('post a character with error in url image: ',()=>{
    it('should receive an error', (done) => {
    chai.request(url)
    .post('/characters')
    .set({ "Authorization": `Bearer ${token}` })
    .send({
        imgCharacter: "notUrl",
        nameCharacter: "CharWithErrorUrl",
        age: "3",
        weight: "1",
        story: "Timon is a comical meerkat and the life partner of Pumbaa the warthog who appears as a minor character in the 1994 Disney film The Lion King and its related universe, most notably the 2004 spin-off film The Lion King 1½. where he is the main protagonist.",
        movies: ["The Lion King"]
    })
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(500);
    done();
    });
    });
});

describe(`delete the character with id ${idCharacter}`,()=>{
    it('should delete the character with id 9881cf69-d493-4763-9a8b-53047d994a57', (done) => {
        Character.findByPk(idCharacter).then(char => !char &&
        Character.create({
            idCharacter: idCharacter,
            imgCharacter: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648302110/Challenge%20NodeJs%20Alkemy/vqd3rsrey78fmfthqnqt.jpg",
            nameCharacter: "CharToDelete",
            age: "3",
            weight: "1",
            story: "Timon is a comical meerkat and the life partner of Pumbaa the warthog who appears as a minor character in the 1994 Disney film The Lion King and its related universe, most notably the 2004 spin-off film The Lion King 1½. where he is the main protagonist.",
            movies: ["The Lion King"]
        })).then(() => {
        chai.request(url)
        .del(`/characters/${idCharacter}`)
        .set({ "Authorization": `Bearer ${token}` })
        .end( function(err,res){
        console.log(res.body);
        expect(res).to.have.status(200);
        done();
    });
    })});
});

describe(`delete the character with incorrect id`,()=>{
    it(`should receive an error`, (done) => {
        chai.request(url)
        .del(`/characters/1234`)
        .set({ "Authorization": `Bearer ${token}` })
        .end( function(err,res){
        console.log(res.body);
        expect(res).to.have.status(500);
        done();
    })
    });
});

describe(`update age, weight and movies of character with id ${idCharacter}: `,()=>{
    it('should update the age, weight and movies', (done) => {
    Character.findByPk(idCharacter)
    .then((char) =>{
            !char && Character.create({
            idCharacter: idCharacter,
            imgCharacter: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648302110/Challenge%20NodeJs%20Alkemy/vqd3rsrey78fmfthqnqt.jpg",
            nameCharacter: "CharToUpdate",
            age: "3",
            weight: "1",
            story: "Timon is a comical meerkat and the life partner of Pumbaa the warthog who appears as a minor character in the 1994 Disney film The Lion King and its related universe, most notably the 2004 spin-off film The Lion King 1½. where he is the main protagonist.",
            movies: ["The Lion King"]
        })})
        .then( () => {
            chai.request(url)
            .put(`/characters/${idCharacter}`)
            .set({ "Authorization": `Bearer ${token}` })
            .send({
                age: "300",
                weight: "100",
                removeMovies: ["The Lion King"]
            })
            .end( function(err,res){
            console.log(res.body);
            expect(res).to.have.status(200);
            done();
        })
        })
    });
});
    
describe(`update character with incorrect url format: `,()=>{
    it('should receive an error', (done) => {
    Character.findByPk(idCharacter)
    .then((char) =>{
            !char && Character.create({
            idCharacter: idCharacter,
            imgCharacter: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648302110/Challenge%20NodeJs%20Alkemy/vqd3rsrey78fmfthqnqt.jpg",
            nameCharacter: "CharToUpdate",
            age: "3",
            weight: "1",
            story: "Timon is a comical meerkat and the life partner of Pumbaa the warthog who appears as a minor character in the 1994 Disney film The Lion King and its related universe, most notably the 2004 spin-off film The Lion King 1½. where he is the main protagonist.",
            movies: ["The Lion King"]
        })})
        .then( () => {
            chai.request(url)
            .put(`/characters/${idCharacter}`)
            .set({ "Authorization": `Bearer ${token}` })
            .send({
                imgCharacter: "notUrl"
            })
            .end( function(err,res){
            console.log(res.body);
            expect(res).to.have.status(500);
            done();
        })
        })
    });
});