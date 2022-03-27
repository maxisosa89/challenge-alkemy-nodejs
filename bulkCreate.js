const { Genre, User, Role, Movie, Character } = require('./src/db.js');
const bcrypt = require('bcryptjs')
const { AUTH_PASSWORD } = process.env;

module.exports = async function createInfo() {
    const genres = [{
        nameGenre: "Action",
        imgGenre: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648044202/Challenge%20NodeJs%20Alkemy/pct0zogyvbmsp0kbncr2.png"
      },
      {
        nameGenre: "Adventure",
        imgGenre: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648044292/Challenge%20NodeJs%20Alkemy/pinjbayhozuxeznhfssx.png"
      },
      {
        nameGenre: "Comedy",
        imgGenre: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648044322/Challenge%20NodeJs%20Alkemy/edgxadlytvo1jgdonbnk.jpg"
      }]
    const genresValidate = await Genre.findAll();
    genresValidate.length === 0 &&
    await Genre.bulkCreate(genres)

    let password = bcrypt.hashSync(AUTH_PASSWORD, 10)
    const user = {
      nameUser: "Maxi",
      email: "msosa89@outlook.com",
      password: password
    }
    const userValidate = await User.findAll();
    if (userValidate.length === 0){
      const userDev = await User.create(user)
    }

    const movies = [
      {
          imgMovie: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648236839/Challenge%20NodeJs%20Alkemy/1699953239962179215_juh2ex.jpg",
          titleMovie: "Snow White and the Seven Dwarfs",
          release: "1937-12-21",
          score: "3",
          genres: ["Adventure"]
      },
      {
          imgMovie: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648236857/Challenge%20NodeJs%20Alkemy/The-Jungle-Book-Poster_lipsit.jpg",
          titleMovie:  "The Jungle Book",
          release: "1967-10-14",
          score: "4",
          genres: ["Adventure", "Action"]
      },
      {
          imgMovie: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648236875/Challenge%20NodeJs%20Alkemy/61sJaBqGxZL._AC_SY741__omwmdj.jpg",
          titleMovie:  "The Lion King",
          release: "1994-07-07",
          score: "5",
          genres: ["Action", "Adventure"]
      },
      {
          imgMovie: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648236892/Challenge%20NodeJs%20Alkemy/81WpENETnyS._AC_SY879__cj6w0x.jpg",
          titleMovie:  "Hercules",
          release: "1997-07-03",
          score: "4",
          genres: ["Adventure", "Comedy", "Action"]
      },
      {
          imgMovie: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648236915/Challenge%20NodeJs%20Alkemy/51DhSWMzZlL._AC__b6vli1.jpg",
          titleMovie:  "Peter Pan",
          release: "1953-07-07",
          score: "3",
          genres: ["Adventure", "Comedy", "Action"]
      },
    ]
    const moviesValidate = await Movie.findAll();
    moviesValidate.length === 0 &&
    await Movie.bulkCreate(movies)
    movies.map(async (e) => {
      const movie = await Movie.findOne({
        where: {
          titleMovie: e.titleMovie
        }
      })
      e.genres.map(async (genre) => {
        const genreDb = await Genre.findOne({
          where: {
            nameGenre: genre
          }
        })
        movie.addGenre(genreDb)
      } )
    })

    const characters = [
    {
        imgCharacter: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648043359/Challenge%20NodeJs%20Alkemy/Profile_-_Snow_White_i7qiy3.jpg",
        nameCharacter: "Snow White",
        age: "14",
        weight: "46",
        story: "Snow White's evil stepmother cannot bear that the young woman's beauty is superior to her own and decides to end her life. The beautiful Snow White manages to take refuge in a tiny cabin in the woods where seven cute dwarfs live. Despite everything, the cruel stepmother manages to find her whereabouts and poisons her with an apple. Her poison will plunge the young woman into an eternal sleep from which only a Prince Charming can wake her up.",
        movies: ["Snow White and the Seven Dwarfs"]
    },
    {
        imgCharacter: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648043378/Challenge%20NodeJs%20Alkemy/Profile_-_The_Evil_Queen_wcul28.jpg",
        nameCharacter: "The Evil Queen",
        age: "50",
        weight: "50",
        story: "The Queen's life is framed by loss, abandonment and heartbreak, which is why she is forced to survive by creating a barrier around her heart. Day after day the regent seeks refuge in the Mirror, she wants him to fill the void in her heart and make up for the love she doesn't feel for herself.",
        movies: ["Snow White and the Seven Dwarfs"]
    },
    {
        imgCharacter: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648043385/Challenge%20NodeJs%20Alkemy/Profile_-_Bashful_aooioy.png",
        nameCharacter: "Bashful",
        age: "60",
        weight: "64",
        story: "He wears a pointed white beard, has brown eyes and black eyebrows. He is dressed in a turquoise hat, with an ocher shirt with brown elbow patches girded by a black belt with a gold buckle, his orange pants and his shoes are beige.",
        movies: ["Snow White and the Seven Dwarfs"]
    },
    {
        imgCharacter: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648043399/Challenge%20NodeJs%20Alkemy/Profile_-_Mowgli_iazya0.jpg",
        nameCharacter: "Mowgli",
        age: "10",
        weight: "30",
        story: "Mowgli is a boy raised in the jungle among animals, but not everyone accepts him there, since the tiger Shere Khan will do everything possible to kill the boy. However, there are dangers in the world even worse than Shere Khan.",
        movies: ["The Jungle Book"]
    },
    {
        imgCharacter: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648043404/Challenge%20NodeJs%20Alkemy/Profile_-_Baloo_f306md.jpg",
        nameCharacter: "Baloo",
        age: "15",
        weight: "300",
        story: "Baloo is a calm and sleepy bear that feeds on honey and nuts. He is one of Mowgli's great friends and is the one who makes sure that he learns the law of the jungle, along with the rest of the wolves in the pack.",
        movies: ["The Jungle Book"]
    },
    {
        imgCharacter: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648043517/Challenge%20NodeJs%20Alkemy/Profile_-_King_Louie_oakrsu.jpg",
        nameCharacter: "King Louie",
        age: "35",
        weight: "80",
        story: "King Louie is the obstreperous ruler of the Ancient Ruins with an affinity for swing music. Having grown tired of his simian lifestyle, Louie hopes to learn the secret of man's red flower to fulfill his dream of becoming a man.",
        movies: ["The Jungle Book"]
    },
    {
        imgCharacter: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648043533/Challenge%20NodeJs%20Alkemy/Profile_-_Nala_hou29y.jpg",
        nameCharacter: "Nala",
        age: "5",
        weight: "90",
        story: "Nala is a lioness, one of the main characters in Walt Disney's animated saga, The Lion King. Nala means in Swahili. Her character appears to be based on Ophelia from the Shakespearean tragedy Hamlet, on which the film is based. Nala is Sarafina daughter. Her first appearance in the movie, she plays as a sleeping little puppy next to her mother.",
        movies: ["The Lion King"]
    },
    {
        imgCharacter: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648043550/Challenge%20NodeJs%20Alkemy/Profile_-_Simba_smcird.jpg",
        nameCharacter: "Simba",
        age: "5",
        weight: "150",
        story: "Simba, a young lion who after the death of his father, king of the Pride Lands, is exiled from his home by his uncle, who usurps the throne. With the help of his friends and the teachings of his father, Simba is later encouraged to return and reclaim his place in the kingdom.",
        movies: ["The Lion King"]
    },
    {
        imgCharacter: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648043564/Challenge%20NodeJs%20Alkemy/Profile_-_Pumbaa_ysdsxo.jpg",
        nameCharacter: "Pumba",
        age: "8",
        weight: "75",
        story: "Pumba is Simba and Timon's best friend. He is a chubby and endearing boar, what stands out the most is that he is always happy and eager to eat insects. He goes looking for them underground to absorb and devour them since he is recognized because his hunger is voracious.",
        movies: ["The Lion King"]
    },
    {
        imgCharacter: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648043579/Challenge%20NodeJs%20Alkemy/Profile_-_Hades_eavktu.jpg",
        nameCharacter: "Hades",
        age: null,
        weight: null,
        story: "Hades has bluish-grayish skin having a blue flame instead of hair. When he becomes furious both his skin and the flame on his head turn red and surround themselves with fire. As lord of the dead, he dwells in the Underworld alongside his two demons Grief and Panic, who test his patience by failing or being unable to carry out his orders.",
        movies: ["Hercules"]
    },
    {
        imgCharacter: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648043637/Challenge%20NodeJs%20Alkemy/Profile_-_Hercules_ihr7bq.jpg",
        nameCharacter: "Hercules",
        age: "18",
        weight: "60",
        story: "Hercules: Based on the mythological deity Heracles. The main character of the movie. Son of Zeus and Hera, kidnapped after his birth by Hades, who must get him out of the way in order to carry out his plan to conquer Olympus. His mission is to become a true hero so he can return to Mount Olympus.",
        movies: ["Hercules"]
    },
    {
        imgCharacter: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648043657/Challenge%20NodeJs%20Alkemy/Zeus_Hercules_97_yne4je.jpg",
        nameCharacter: "Zeus",
        age: null,
        weight: null,
        story: "Zeus is the father and king of the gods and goddesses of the Greek pantheon, ruling Mount Olympus, and being considered a father both by his children and by the gods who are not his descendants. He is also considered the god of the sky and thunder, being depicted numerous times with a thunderbolt in his hand.",
        movies: ["Hercules"]
    },
    {
        imgCharacter: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648043675/Challenge%20NodeJs%20Alkemy/Profile_-_Peter_Pan_yfv6x6.jpg",
        nameCharacter: "Peter Pan",
        age: "10",
        weight: "40",
        story: "Peter Pan is a flying boy who, accompanied by the fairy Tinker Bell, invites the girl Wendy and her two brothers to fly to Neverland Island and meet the Lost Boys who live with him, with the intention that Wendy be the mother of all of them.",
        movies: ["Peter Pan"]
    },
    {
        imgCharacter: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648043699/Challenge%20NodeJs%20Alkemy/Profile_-_Tinker_Bell_m23jie.jpg",
        nameCharacter: "Tinker Bell",
        age: null,
        weight: null,
        story: "In World of Winx, Tinker Bell is a powerful fairy from the world of dreams (also called Neverland) and a friend of Peter Pan. When Peter Pan eventually left her for Wendy Darling, she became dark and cold, turning into the evil Queen.",
        movies: ["Peter Pan"]
    },
    {
        imgCharacter: "https://res.cloudinary.com/dg7fmdsmw/image/upload/v1648043722/Challenge%20NodeJs%20Alkemy/Profile_-_Captain_Hook_wst755.jpg",
        nameCharacter: "Captain Hook",
        age: "50",
        weight: "75",
        story: "Captain James Hook is a fictional character, the main antagonist of J. M. Barrie's 1904 play Peter Pan; or, the Boy Who Wouldn't Grow Up and its various adaptations, in which he is Peter Pan's archenemy. The character is a pirate captain of the brig Jolly Roger. His two principal fears are the sight of his own blood (supposedly an unnatural colour) and the crocodile who pursues him after eating the hand cut off by Pan. An iron hook replaced his severed hand, which gave the pirate his name.",
        movies: ["Peter Pan"]
    },
    ]
    const charactersValidate = await Character.findAll();
    charactersValidate.length === 0 &&
    await Character.bulkCreate(characters).then().catch(err => console.log(err))
    characters.map(async (e) => {
      const char = await Character.findOne({
        where: {
          nameCharacter: e.nameCharacter
        }
      })
      e.movies.map(async (movie) => {
        const movieDb = await Movie.findOne({
          where: {
            titleMovie: movie
          }
        })
        char.addMovie(movieDb)
      })
    })
}