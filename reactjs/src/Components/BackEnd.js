const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const actionList = require('./Model/ActionListSchema');
const comedyList = require('./Model/ComedyListSchema');
const horrorList = require('./Model/HorrorListSchema');
const romanceList = require('./Model/RomanceListSchema');
const actionActor = require('./Model/ActionActorsSchema');
const comedyActor = require('./Model/ComedyActorsSchema');
const horrorActor = require('./Model/HorrorActorsSchema');
const romanceActor = require('./Model/RomanceActorsSchema');
const PaymentPost = require('./Model/paymentDB');
const nodemailer = require('nodemailer');
const LoginSignUp = require('./Model/loginDB');
const ComingSoon = require('./Model/comingsoon');
const Carousel = require('./Model/carouselDB');
const Blog = require('./Model/blog');

require('dotenv').config();
const Stripe = require('stripe')(process.env.SECRET_KEY);

const port = process.env.PORT || 3000;

// connect to DB
const dbURL = '' // Place here your DB URL to run the server;
mongoose.connect(dbURL)
  .then(() => app.listen(port, () => {
    console.log("Server is running on port 3000");
  }))
  .catch((err) => console.log(err));

// define a route to handle the post request for Payment
app.post('/submitPayment', (req, res) => {
  const { cardNumber, MonthYear, CVVCode, Name, price, moviename, seats } = req.body;

  // create a new instance of the model with the received data
  const myData = new PaymentPost({ cardNumber, MonthYear, CVVCode, Name, price, moviename, seats });

  // save the data to MongoDB
  myData.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => console.log(err))
});

// For getting action List movies
app.get('/get-all-actionList', (req, res) => {
  actionList.find()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => console.log(err));
});

// For getting comedy List movies
app.get('/get-all-comedyList', (req, res) => {
  comedyList.find()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => console.log(err));
});

// For getting horror List movies
app.get('/get-all-horrorList', (req, res) => {
  horrorList.find()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => console.log(err));
});

// For getting romance List movies
app.get('/get-all-romanceList', (req, res) => {
  romanceList.find()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => console.log(err));
});

// // For getting action Actors 
app.get('/get-all-actionActors/:movie', (req, res) => {
  const { movie } = req.params;
  var query = { movieName: movie }

  actionActor.find(query)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => console.log(err));
});

// // For getting comedy Actors 
app.get('/get-all-comedyActors/:movie', (req, res) => {
  const { movie } = req.params;
  var query = { movieName: movie }

  comedyActor.find(query)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => console.log(err));
});

// // For getting horror Actors 
app.get('/get-all-horrorActors/:movie', (req, res) => {
  const { movie } = req.params;
  var query = { movieName: movie }

  horrorActor.find(query)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => console.log(err));
});

// // For getting romance Actors 
app.get('/get-all-romanceActors/:movie', (req, res) => {
  const { movie } = req.params;
  var query = { movieName: movie }

  romanceActor.find(query)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => console.log(err));
});

// // ACTION_LIST DB
// app.get('/get-actionList', (req, res) => {

//   const actionmovie1 = new actionList({
//     picture: 'https://c4.wallpaperflare.com/wallpaper/329/449/244/5k-dwayne-johnson-karen-gillan-kevin-hart-wallpaper-preview.jpg',
//     name: 'Jumanji: The Next Level',
//     about: 'In Jumanji: The Next Level, the gang is back but the game has changed. As they return to rescue one of their own, the players will have to brave parts unknown from arid deserts to snowy mountains, to escape the world`s most dangerous game.',
//     link: "https://www.youtube.com/embed/lyHZzdhUKa8",
//     card_picture: "https://c4.wallpaperflare.com/wallpaper/595/475/583/dwayne-johnson-jumanji-welcome-to-the-jungle-jack-black-karen-gillan-wallpaper-preview.jpg",
//     IMDB: '9.8',
//   });

//   actionmovie1.save()
//     .then((result) => {
//       res.send(result)

//     })
//     .catch((err) => console.log(err))

//   const actionmovie2 = new actionList({
//     picture: 'https://c4.wallpaperflare.com/wallpaper/985/648/10/deadpool-marvel-heroes-marvel-comics-wallpaper-preview.jpg',
//     name: 'Deadpool 2',
//     about: 'Foul-mouthed mutant mercenary Wade Wilson (a.k.a. Deadpool) assembles a team of fellow mutant rogues to protect a young boy with supernatural abilities from the brutal, time-traveling cyborg Cable.',
//     link: "https://www.youtube.com/embed/PCf03KXyzIg",
//     card_picture: "https://c4.wallpaperflare.com/wallpaper/720/950/418/deadpool-2-4k-2018-wallpaper-preview.jpg",
//     IMDB: '9.7',
//   });

//   actionmovie2.save()
//     .then((result) => {
//       res.send(result)

//     })
//     .catch((err) => console.log(err))

//   const actionmovie3 = new actionList({
//     picture: 'https://c4.wallpaperflare.com/wallpaper/621/286/348/keanu-reeves-keanu-reeves-parabellum-john-wick-john-wick-hd-wallpaper-preview.jpg',
//     name: 'John Wick: Chapter 4',
//     about: 'John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.',
//     link: "https://www.youtube.com/embed/N_jx4BcZB6c",
//     card_picture: "https://w0.peakpx.com/wallpaper/205/787/HD-wallpaper-john-wick-john-keanu-movie-reeves-wick.jpg",
//     IMDB: '9.3',
//   });

//   actionmovie3.save()
//     .then((result) => {
//       res.send(result)

//     })
//     .catch((err) => console.log(err))

//   const actionmovie4 = new actionList({
//     picture: 'https://c4.wallpaperflare.com/wallpaper/275/717/310/avengers-infinity-war-superheroes-cast-4k-8k-wallpaper-preview.jpg',
//     name: 'Avengers: Infinity War',
//     about: 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.',
//     link: "https://www.youtube.com/embed/C4NGf35h_Ww",
//     card_picture: "https://e0.pxfuel.com/wallpapers/947/677/desktop-wallpaper-avengers-infinity-war-superheroes-marvel-movie-poster-2018.jpg",
//     IMDB: '9.1',
//   });

//   actionmovie4.save()
//     .then((result) => {
//       res.send(result)

//     })
//     .catch((err) => console.log(err))

//   const actionmovie5 = new actionList({
//     picture: 'https://c4.wallpaperflare.com/wallpaper/635/746/368/avatar-neytiri-na-vi-neytiri-wallpaper-thumb.jpg',
//     name: 'Avatar: The Way of Water',
//     about: 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na`vi race to protect their home.',
//     link: "https://www.youtube.com/embed/NdrknJJXAmM",
//     card_picture: "https://w0.peakpx.com/wallpaper/9/4/HD-wallpaper-avatar-the-way-of-water-2022-movie.jpg",
//     IMDB: '8.8',
//   });

//   actionmovie5.save()
//     .then((result) => {
//       res.send(result)

//     })
//     .catch((err) => console.log(err))

//   const actionmovie6 = new actionList({
//     picture: 'https://wallpapers.com/images/high/jungle-cruise-2021-adventure-film-v3umferuvwxn36bq.webp',
//     name: 'Jungle Cruise',
//     about: 'Based on Disneyland`s theme park ride where a small riverboat takes a group of travelers through a jungle filled with dangerous animals and reptiles but with a supernatural element.',
//     link: "https://www.youtube.com/embed/f_HvoipFcA8",
//     card_picture: "https://e0.pxfuel.com/wallpapers/419/966/desktop-wallpaper-jungle-cruise-hollywood-fictional-character.jpg",
//     IMDB: '8.1',
//   });

//   actionmovie6.save()
//     .then((result) => {
//       res.send(result)

//     })
//     .catch((err) => console.log(err))

//   const actionmovie7 = new actionList({
//     picture: 'https://c4.wallpaperflare.com/wallpaper/365/584/63/movie-doctor-strange-benedict-cumberbatch-marvel-comics-wallpaper-preview.jpg',
//     name: 'Doctor Strange in the Multiverse of Madness',
//     about: 'Doctor Strange teams up with a mysterious teenage girl from his dreams who can travel across multiverses, to battle multiple threats, including other-universe versions of himself, which threaten to wipe out millions across the multiverse. They seek help from Wanda the Scarlet Witch, Wong and others.',
//     link: "https://www.youtube.com/embed/NLTYw1s4e-8",
//     card_picture: "https://e0.pxfuel.com/wallpapers/58/880/desktop-wallpaper-doctor-strange-in-the-multiverse-of-madness-movie-poster-2022.jpg",
//     IMDB: '7.8',
//   });

//   actionmovie7.save()
//     .then((result) => {
//       res.send(result)

//     })
//     .catch((err) => console.log(err))

//   const actionmovie8 = new actionList({
//     picture: 'https://c4.wallpaperflare.com/wallpaper/188/494/439/justice-league-2017-dc-comics-wonder-woman-aquaman-wallpaper-preview.jpg',
//     name: 'Zack Snyder`s Justice League',
//     about: 'Determined to ensure that Superman`s ultimate sacrifice wasn`t in vain, Bruce Wayne recruits a team of metahumans to protect the world from an approaching threat of catastrophic proportions.',
//     link: "https://www.youtube.com/embed/lPjF9sJcj4A",
//     card_picture: "https://mfiles.alphacoders.com/924/924191.jpg",
//     IMDB: '8.9',
//   });

//   actionmovie8.save()
//     .then((result) => {
//       res.send(result)

//     })
//     .catch((err) => console.log(err))

//   const actionmovie9 = new actionList({
//     picture: 'https://c4.wallpaperflare.com/wallpaper/464/460/2/movie-shazam-black-adam-dwayne-johnson-wallpaper-preview.jpg',
//     name: 'Black Adam',
//     about: 'Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods--and imprisoned just as quickly--Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.',
//     link: "https://www.youtube.com/embed/N73oTiIIJe0",
//     card_picture: "https://c4.wallpaperflare.com/wallpaper/628/216/890/movie-black-adam-dc-comics-hd-wallpaper-preview.jpg",
//     IMDB: '8.3',
//   });

//   actionmovie9.save()
//     .then((result) => {
//       res.send(result)

//     })
//     .catch((err) => console.log(err))
// });

// //  COMEDY_LIST DB
// app.get('/get-comedyList', (req, res) => {

//   const comedymovie1 = new comedyList({
//     picture: 'https://c4.wallpaperflare.com/wallpaper/627/646/538/johnny-english-strikes-again-poster-johnny-english-3-movies-wallpaper-preview.jpg',
//     name: 'Johnny English Strikes Again',
//     about: 'After a cyber-attack reveals the identity of all of the active undercover agents in Britain, Johnny English is forced to come out of retirement to find the mastermind hacker.',
//     link: "https://www.youtube.com/embed/kiF1Tw39Li8",
//     card_picture: "https://e0.pxfuel.com/wallpapers/742/420/desktop-wallpaper-johnny-english-strikes-again-u-8k.jpg",
//     IMDB: '7.9',
//   });

//   comedymovie1.save()
//     .then((result) => {
//       res.send(result)

//     })
//     .catch((err) => console.log(err))

//   const comedymovie2 = new comedyList({
//     picture: 'https://c4.wallpaperflare.com/wallpaper/746/84/41/puss-in-boots-dreamworks-animation-movies-wallpaper-preview.jpg',
//     name: 'Puss in Boots: The Last Wish',
//     about: 'When Puss in Boots discovers that his passion for adventure has taken its toll and he has burned through eight of his nine lives, he launches an epic journey to restore them by finding the mythical Last Wish.',
//     link: "https://www.youtube.com/embed/RqrXhwS33yc",
//     card_picture: "https://c4.wallpaperflare.com/wallpaper/335/996/26/puss-in-boots-hd-disney-puss-and-boots-movie-wallpaper-preview.jpg",
//     IMDB: '8.9',
//   });

//   comedymovie2.save()
//     .then((result) => {
//       res.send(result)

//     })
//     .catch((err) => console.log(err))

//   const comedymovie3 = new comedyList({
//     picture: 'https://c4.wallpaperflare.com/wallpaper/901/429/286/actors-brad-pitt-brad-pitt-poster-men-hd-wallpaper-preview.jpg',
//     name: 'Once Upon a Time... in Hollywood',
//     about: 'A faded television actor and his stunt double strive to achieve fame and success in the final years of Hollywood`s Golden Age in 1969 Los Angeles.',
//     link: "https://www.youtube.com/embed/LJ4Bnn6bBz8",
//     card_picture: "https://w0.peakpx.com/wallpaper/897/832/HD-wallpaper-movie-once-upon-a-time-in-hollywood-brad-pitt-leonardo-dicaprio-margot-robbie.jpg",
//     IMDB: '7.9',
//   });

//   comedymovie3.save()
//     .then((result) => {
//       res.send(result)

//     })
//     .catch((err) => console.log(err))

//   const comedymovie4 = new comedyList({
//     picture: 'https://w0.peakpx.com/wallpaper/111/668/HD-wallpaper-movie-everything-everywhere-all-at-once.jpg',
//     name: 'Everything Everywhere All at Once',
//     about: 'A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes and connecting with the lives she could have led.',
//     link: "https://www.youtube.com/embed/uAMsKHaqRfQ",
//     card_picture: "https://e0.pxfuel.com/wallpapers/927/343/desktop-wallpaper-everything-everywhere-all-at-once-and-background.jpg",
//     IMDB: '8.9',
//   });

//   comedymovie4.save()
//     .then((result) => {
//       res.send(result)

//     })
//     .catch((err) => console.log(err))

//   const comedymovie5 = new comedyList({
//     picture: 'https://c4.wallpaperflare.com/wallpaper/430/680/1019/movie-toy-story-4-bo-peep-buzz-lightyear-forky-toy-story-hd-wallpaper-preview.jpg',
//     name: 'Toy Story 4',
//     about: 'When a new toy called `Forky` joins Woody and the gang, a road trip alongside old and new friends reveals how big the world can be for a toy.',
//     link: "https://www.youtube.com/embed/wmiIUN-7qhE",
//     card_picture: "https://wallpaperaccess.com/full/2079731.jpg",
//     IMDB: '9.9',
//   });

//   comedymovie5.save()
//     .then((result) => {
//       res.send(result)

//     })
//     .catch((err) => console.log(err))

//   const comedymovie6 = new comedyList({
//     picture: 'https://e1.pxfuel.com/desktop-wallpaper/328/703/desktop-wallpaper-bruce-almighty.jpg',
//     name: 'Bruce Almighty',
//     about: 'A furious TV reporter demands an explanation from God for the injustice done to him. Soon, the Almighty gives him the power to run the world for a while, to teach him how difficult it is.',
//     link: "https://www.youtube.com/embed/rM3W04vbj0I",
//     card_picture: "https://cdn.wallpapersafari.com/38/2/87s0BZ.jpg",
//     IMDB: '8.8',
//   });

//   comedymovie6.save()
//     .then((result) => {
//       res.send(result)

//     })
//     .catch((err) => console.log(err))

//   const comedymovie7 = new comedyList({
//     picture: 'https://e0.pxfuel.com/wallpapers/823/946/desktop-wallpaper-the-mask-victorian-damask-pink-damask-and-mask-jim-carrey-the-mask.jpg',
//     name: 'The Mask',
//     about: 'Stanley, a meek bank employee, turns into an eccentric and maniacal green-skinned superhero who can bend reality, after wearing a wooden mask that was created by Loki, the Norse god of mischief.',
//     link: "https://www.youtube.com/embed/LT8kBr3TUvk",
//     card_picture: "https://e0.pxfuel.com/wallpapers/833/149/desktop-wallpaper-the-mask-movie-hq-the-mask-2019-jim-carrey-the-mask.jpg",
//     IMDB: '7.7',
//   });

//   comedymovie7.save()
//     .then((result) => {
//       res.send(result)

//     })
//     .catch((err) => console.log(err))

//   const comedymovie8 = new comedyList({
//     picture: 'https://e0.pxfuel.com/wallpapers/646/465/desktop-wallpaper-the-bad-guys-2022-movies-background-and.jpg',
//     name: 'The Bad Guys',
//     about: 'To avoid prison, a gang of notorious animal criminals pretends to seek being rehabilitated, only for their leader to realize that he genuinely wants to change his ways.',
//     link: "https://www.youtube.com/embed/HYVWf-PWxD8",
//     card_picture: "https://w0.peakpx.com/wallpaper/126/962/HD-wallpaper-2022-the-bad-guys-2022-movies-movies.jpg",
//     IMDB: '6.9',
//   });

//   comedymovie8.save()
//     .then((result) => {
//       res.send(result)

//     })
//     .catch((err) => console.log(err))

//   const comedymovie9 = new comedyList({
//     picture: 'https://w0.peakpx.com/wallpaper/1013/418/HD-wallpaper-tom-and-jerry-movie-poster-tom-and-jerry-2021-movies-movies-animated-movies-cartoons-tom-jerry.jpg',
//     name: 'Tom and Jerry',
//     about: 'A chaotic battle ensues between Jerry Mouse, who has taken refuge in the Royal Gate Hotel, and Tom Cat, who is hired to drive him away before the day of a big wedding arrives.',
//     link: "https://www.youtube.com/embed/kP9TfCWaQT4",
//     card_picture: "https://w0.peakpx.com/wallpaper/434/994/HD-wallpaper-tom-and-jerry-10k-tom-and-jerry-2021-movies-movies-animated-movies-cartoons-tom-jerry.jpg",
//     IMDB: '8.5',
//   });

//   comedymovie9.save()
//     .then((result) => {
//       res.send(result)

//     })
//     .catch((err) => console.log(err))
// });

// //  HORROR_LIST DB
// app.get('/get-horrorList', (req, res) => {

//   const horrormovie1 = new horrorList({
//     picture: 'https://w0.peakpx.com/wallpaper/719/514/HD-wallpaper-movie-renfield.jpg',
//     name: 'Renfield',
//     about: 'Renfield, Dracula`s henchman and inmate at the lunatic asylum for decades, longs for a life away from the Count, his various demands, and all of the bloodshed that comes with them.',
//     link: "https://www.youtube.com/embed/0w48B2-k8Uo",
//     card_picture: "https://w0.peakpx.com/wallpaper/54/311/HD-wallpaper-renfield-movie.jpg",
//     IMDB: '7.9',
//   });

//   horrormovie1.save()
//     .then((result) => {
//       res.send(result)

//     })
//     .catch((err) => console.log(err))

//   const horrormovie2 = new horrorList({
//     picture: 'https://c4.wallpaperflare.com/wallpaper/921/397/168/5c1cb103ab885-wallpaper-preview.jpg',
//     name: 'Hereditary',
//     about: 'After her mother passes away, Annie and the rest of the family are grief-stricken. Soon, strange things start occurring and the horrifying truth about Annie`s ancestry begins to come to light.',
//     link: "https://www.youtube.com/embed/IS6oZOHsxxw",
//     card_picture: "https://w0.peakpx.com/wallpaper/776/259/HD-wallpaper-hereditary-1-art-cinematography.jpg",
//     IMDB: '8.1',
//   });

//   horrormovie2.save()
//     .then((result) => {
//       res.send(result)

//     })
//     .catch((err) => console.log(err))

//   const horrormovie3 = new horrorList({
//     picture: 'https://w0.peakpx.com/wallpaper/806/155/HD-wallpaper-movie-scream.jpg',
//     name: 'Scream VI',
//     about: 'Four survivors of the Ghostface murders leave Woodsboro behind for a fresh start in New York City. However, they soon find themselves in a fight for their lives when a new killer embarks on a bloody rampage.',
//     link: "https://www.youtube.com/embed/mW0WZgniw30",
//     card_picture: "https://wallpapercrafter.com/desktop/427941-Movie-Scream-Phone-Wallpaper.png",
//     IMDB: '9.2',
//   });

//   horrormovie3.save()
//     .then((result) => {
//       res.send(result)

//     })
//     .catch((err) => console.log(err))

//   const horrormovie4 = new horrorList({
//     picture: 'https://w0.peakpx.com/wallpaper/433/102/HD-wallpaper-evil-dead-rise-movie-2023.jpg',
//     name: 'Evil Dead Rise',
//     about: 'A twisted tale of two estranged sisters whose reunion is cut short by the rise of flesh-possessing demons, thrusting them into a primal battle for survival as they face the most nightmarish version of family imaginable.',
//     link: "https://www.youtube.com/embed/GTHkS5vxpsI",
//     card_picture: "https://wallpapercave.com/wp/wp12117918.jpg",
//     IMDB: '8.8',
//   });

//   horrormovie4.save()
//     .then((result) => {
//       res.send(result)

//     })
//     .catch((err) => console.log(err))

//   const horrormovie5 = new horrorList({
//     picture: 'https://w0.peakpx.com/wallpaper/838/472/HD-wallpaper-disney-the-new-mutants-movies.jpg',
//     name: 'The New Mutants',
//     about: 'Five young mutants, just discovering their abilities while held in a secret facility against their will, fight to escape their past sins and save themselves.',
//     link: "https://www.youtube.com/embed/s7JdB-TiQTM",
//     card_picture: "https://w0.peakpx.com/wallpaper/74/910/HD-wallpaper-new-mutants-movie-cover.jpg",
//     IMDB: '9.4',
//   });

//   horrormovie5.save()
//     .then((result) => {
//       res.send(result)

//     })
//     .catch((err) => console.log(err))

//   const horrormovie6 = new horrorList({
//     picture: 'https://w0.peakpx.com/wallpaper/370/955/HD-wallpaper-m3gan-2023.jpg',
//     name: 'M3GAN',
//     about: 'Designed by Gemma, a brilliant roboticist, M3GAN can listen, watch and learn as it plays the role of friend and teacher, playmate and protector. When Gemma becomes the unexpected caretaker of her 8-year-old niece, she decides to give the girl an M3GAN prototype, a decision that leads to unimaginable consequences.',
//     link: "https://www.youtube.com/embed/s7JdB-TiQTM",
//     card_picture: "https://img4-film.spielfilm.de/3009809-263595/megan.jpg",
//     IMDB: '6.8',
//   });

//   horrormovie6.save()
//     .then((result) => {
//       res.send(result)

//     })
//     .catch((err) => console.log(err))

//   const horrormovie7 = new horrorList({
//     picture: 'https://w0.peakpx.com/wallpaper/375/588/HD-wallpaper-movie-knock-at-the-cabin.jpg',
//     name: 'Knock at the Cabin',
//     about: 'While vacationing, a girl and her parents are taken hostage by armed strangers who demand that the family make a choice to avert the apocalypse.',
//     link: "https://www.youtube.com/embed/sPzGSs5KK6w",
//     card_picture: "https://images.justwatch.com/poster/290727746/s718/knock-at-the-cabin.%7Bformat%7D",
//     IMDB: '7.5',
//   });

//   horrormovie7.save()
//     .then((result) => {
//       res.send(result)

//     })
//     .catch((err) => console.log(err))

//   const horrormovie8 = new horrorList({
//     picture: 'https://w0.peakpx.com/wallpaper/727/706/HD-wallpaper-terrifier-2.jpg',
//     name: 'Terrifier 2',
//     about: 'After being resurrected by a sinister entity, Art the Clown returns to the timid town of Miles County where he targets a teenage girl and her younger brother on Halloween night.',
//     link: "https://www.youtube.com/embed/ig42J6-Kjjk",
//     card_picture: "https://fsa.zobj.net/crop.php?r=85gI5rRO4eykNo9tvtKEq11UqSqLFpTMZKR8Sn3MhPNd5OVUo7yMZDw-6XwZB03kabinLaZdsBh6wygUeuX-nRpbjoFcQK-Jqr3YYGMyHYXfS9e1NP-W3xVWNfKAsoAy3yupl_QtVvRO7pFvURCDRyWxE4ouoJWK2FNljEZFzLBxAYM-iOFsmk2eiwjoFrMY9Ub3q700uSkGhM8c",
//     IMDB: '9.6',
//   });

//   horrormovie8.save()
//     .then((result) => {
//       res.send(result)

//     })
//     .catch((err) => console.log(err))

//   const horrormovie9 = new horrorList({
//     picture: 'https://w0.peakpx.com/wallpaper/170/847/HD-wallpaper-the-first-purge-movie-poster-2018-the-first-purge-movies-2018-movies.jpg',
//     name: 'The Forever Purge',
//     about: 'All the rules are broken as a sect of lawless marauders decides that the annual Purge does not stop at daybreak and instead should never end.',
//     link: "https://www.youtube.com/embed/-6_lokvozTE",
//     card_picture: "https://w0.peakpx.com/wallpaper/70/641/HD-wallpaper-movie-the-forever-purge.jpg",
//     IMDB: '8.2',
//   });

//   horrormovie9.save()
//     .then((result) => {
//       res.send(result)

//     })
//     .catch((err) => console.log(err))
// });

// //  ROMANCE_LIST DB
// app.get('/get-romanceList', (req, res) => {

//   const romancemovie1 = new romanceList({
//     picture: 'https://w0.peakpx.com/wallpaper/104/679/HD-wallpaper-emilia-clarke-last-christmas.jpg',
//     name: 'Last Christmas',
//     about: 'Kate is a young woman subscribed to bad decisions. Working as an elf in a year-round Christmas store is not good for the wannabe singer. However, she meets Tom there. Her life takes a new turn--that seems too good to be true.',
//     link: "https://www.youtube.com/embed/jhHg4ezH16k",
//     card_picture: "https://c4.wallpaperflare.com/wallpaper/182/31/814/movie-last-christmas-emilia-clarke-henry-golding-hd-wallpaper-preview.jpg",
//     IMDB: '9.9',
//   });

//   romancemovie1.save()
//     .then((result) => {
//       res.send(result)

//     })
//     .catch((err) => console.log(err))

//   const romancemovie2 = new romanceList({
//     picture: 'https://e1.pxfuel.com/desktop-wallpaper/633/145/desktop-wallpaper-5120x2880-five-feet-apart-movie-movies-and-backgrounds.jpg',
//     name: 'Five Feet Apart',
//     about: 'Seventeen-year-old Stella spends most of her time in the hospital as a cystic fibrosis patient. Her life is full of routines, boundaries and self-control -- all of which get put to the test when she meets Will, an impossibly charming teen who has the same illness. There`s an instant flirtation, though restrictions dictate that they must maintain a safe distance between them. As their connection intensifies, so does the temptation to throw the rules out the window and embrace that attraction.',
//     link: "https://www.youtube.com/embed/ZBKKHKqEGv0",
//     card_picture: "https://cdn.wallpapersafari.com/32/28/iyC50J.jpg",
//     IMDB: '8.9',
//   });

//   romancemovie2.save()
//     .then((result) => {
//       res.send(result)

//     })
//     .catch((err) => console.log(err))

//   const romancemovie3 = new romanceList({
//     picture: 'https://c4.wallpaperflare.com/wallpaper/277/989/81/movie-dear-john-wallpaper-preview.jpg',
//     name: 'Dear John',
//     about: 'John is a soldier who loves Savannah, a college student. He re-enlists post the 9/11 attack but the two continue to be in touch over letters. Fate tests their love many times over the next few years.',
//     link: "https://www.youtube.com/embed/SSMR8BKNYGs",
//     card_picture: "https://e1.pxfuel.com/desktop-wallpaper/4/80/desktop-wallpaper-dear-john-movie-characters-dear-john.jpg",
//     IMDB: '9.7',
//   });

//   romancemovie3.save()
//     .then((result) => {
//       res.send(result)

//     })
//     .catch((err) => console.log(err))

//   const romancemovie4 = new romanceList({
//     picture: 'https://w0.peakpx.com/wallpaper/650/659/HD-wallpaper-a-star-is-born-movie-a-star-is-born-2018-movies-movies-lady-gaga-bradley-cooper.jpg',
//     name: 'A Star is Born',
//     about: 'After falling in love with struggling artist Ally, Jackson, a musician, coaxes her to follow her dreams, while he battles with alcoholism and his personal demons.',
//     link: "https://www.youtube.com/embed/bkjPVpOTJRQ",
//     card_picture: "https://e1.pxfuel.com/desktop-wallpaper/763/959/desktop-wallpaper-exclusive-details-from-the-set-of-lady-gaga-and-bradley-cooper-s-a-a-star-is-born.jpg",
//     IMDB: '8.9',
//   });

//   romancemovie4.save()
//     .then((result) => {
//       res.send(result)

//     })
//     .catch((err) => console.log(err))

//   const romancemovie5 = new romanceList({
//     picture: 'https://e0.pxfuel.com/wallpapers/179/477/desktop-wallpaper-midnight-sun-2018-movie-poster-movies.jpg',
//     name: 'Midnight Sun',
//     about: 'Sheltered since childhood, 17-year-old Katie Price lives with a life-threatening sensitivity to sunlight. Her world opens up after dark when she ventures out to play her guitar for random travelers. One night, Katie encounters Charlie, a young man she`s secretly admired for years. As fate leads to a budding romance, Katie desperately tries to hide her condition from her unsuspecting new beau.',
//     link: "https://www.youtube.com/embed/DTIcHvXlbYQ",
//     card_picture: "https://c4.wallpaperflare.com/wallpaper/273/255/743/bellathorne-and-patrick-schwarzenegger-midnight-sun-movie-wallpaper-preview.jpg",
//     IMDB: '8.8',
//   });

//   romancemovie5.save()
//     .then((result) => {
//       res.send(result)

//     })
//     .catch((err) => console.log(err))

//   const romancemovie6 = new romanceList({
//     picture: 'https://c4.wallpaperflare.com/wallpaper/296/765/193/movie-the-proposal-ryan-reynolds-sandra-bullock-wallpaper-preview.jpg',
//     name: 'The Proposal',
//     about: 'When New York editor Margaret faces deportation, she convinces her assistant Andrew to marry her in return for a promotion. However, when she visits his hometown, it changes her in many ways.',
//     link: "https://www.youtube.com/embed/ig6uQWjkYLo",
//     card_picture: "https://wallpapers.moviemania.io/phone/movie/18240/5d927a/the-proposal-phone-wallpaper.jpg?w=1536&h=2732",
//     IMDB: '8.9',
//   });

//   romancemovie6.save()
//     .then((result) => {
//       res.send(result)

//     })
//     .catch((err) => console.log(err))

//   const romancemovie7 = new romanceList({
//     picture: 'https://e0.pxfuel.com/wallpapers/623/641/desktop-wallpaper-50-first-dates-2022-movie.jpg',
//     name: '50 First Dates',
//     about: 'Henry Roth is a man afraid of commitment until he meets the beautiful Lucy. They hit it off and Henry think he`s finally found the girl of his dreams until discovering she has short-term memory loss and forgets him the next day.',
//     link: "https://www.youtube.com/embed/KqlgL7hnoS8",
//     card_picture: "https://images-0.wuaki.tv/system/artworks/48643/original/50-first-dates-1611407312-width317-quality60.jpeg",
//     IMDB: '9.9',
//   });

//   romancemovie7.save()
//     .then((result) => {
//       res.send(result)

//     })
//     .catch((err) => console.log(err))

//   const romancemovie8 = new romanceList({
//     picture: 'https://w0.peakpx.com/wallpaper/478/833/HD-wallpaper-felicity-jones-nabhaan-rizwan-last-letter-from-your-lover.jpg',
//     name: 'The Last Letter from Your Lover',
//     about: 'A pair of interwoven stories set in the past and present follow an ambitious journalist determined to solve the mystery of a forbidden love affair at the center of a trove of secret love letters from 1965.',
//     link: "https://www.youtube.com/embed/wR71k6kNQ3g",
//     card_picture: "https://e1.pxfuel.com/desktop-wallpaper/271/399/desktop-wallpaper-the-last-letter-from-your-lover-an-english-romantic-drama-film-last-letter-from-your-lover-netflix.jpg",
//     IMDB: '9.8',
//   });

//   romancemovie8.save()
//     .then((result) => {
//       res.send(result)

//     })
//     .catch((err) => console.log(err))

//   const romancemovie9 = new romanceList({
//     picture: 'https://e1.pxfuel.com/desktop-wallpaper/884/915/desktop-wallpaper-the-longest-ride.jpg',
//     name: 'The Longest Ride',
//     about: 'The spark between Luke and Sophia fades away owing to their conflicting career paths. Subsequently, an older man, Ira, tries to show them the rewards of resolving relationship barriers.',
//     link: "https://www.youtube.com/embed/RyNCzg1Oa5c",
//     card_picture: "https://c4.wallpaperflare.com/wallpaper/1002/178/324/romance-2015-britt-robertson-scott-eastwood-wallpaper-preview.jpg",
//     IMDB: '8.1',
//   });

//   romancemovie9.save()
//     .then((result) => {
//       res.send(result)

//     })
//     .catch((err) => console.log(err))
// });

// //  ACTION_ACTORS DB
// app.get('/get-actionActors', (req, res) => {

//   const actor11 = new actionActor({
//     movieName: 'Jumanji: The Next Level',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/262/524/836/movie-jumanji-the-next-level-dwayne-johnson-hd-wallpaper-preview.jpg',
//     actorName: 'Dwayne Johnson',
//     gender: 'Male',
//   });

//   actor11.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor12 = new actionActor({
//     movieName: 'Jumanji: The Next Level',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/870/922/476/movie-jumanji-the-next-level-kevin-hart-hd-wallpaper-preview.jpg',
//     actorName: 'Kevin Hart',
//     gender: 'Male',
//   });

//   actor12.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor13 = new actionActor({
//     movieName: 'Jumanji: The Next Level',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/780/375/735/movie-jumanji-the-next-level-karen-gillan-hd-wallpaper-preview.jpg',
//     actorName: 'Karen Gillan',
//     gender: 'Female',
//   });

//   actor13.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor21 = new actionActor({
//     movieName: 'Jungle Cruise',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/537/120/935/movie-hostiles-jesse-plemons-hd-wallpaper-preview.jpg',
//     actorName: 'Jesse Plemons',
//     gender: 'Male',
//   });

//   actor21.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor22 = new actionActor({
//     movieName: 'Jungle Cruise',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/268/454/552/dwayne-johnson-actor-smile-face-wallpaper-preview.jpg',
//     actorName: 'Dwayne Johnson',
//     gender: 'Male',
//   });

//   actor22.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor23 = new actionActor({
//     movieName: 'Jungle Cruise',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/713/53/174/emily-blunt-edge-of-tomorrow-photocall-for-the-film-wallpaper-preview.jpg',
//     actorName: 'Emily Blunt',
//     gender: 'Female',
//   });

//   actor23.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor31 = new actionActor({
//     movieName: 'John Wick: Chapter 4',
//     picture: 'https://w0.peakpx.com/wallpaper/552/513/HD-wallpaper-baba-yaga-john-wick-keanu-keanu-reeves-reeves.jpg',
//     actorName: 'Keanu Reeves',
//     gender: 'Male',
//   });

//   actor31.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor32 = new actionActor({
//     movieName: 'John Wick: Chapter 4',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/652/490/549/assassination-games-scott-adkins-roland-flint-wallpaper-preview.jpg',
//     actorName: 'Scott Adkins',
//     gender: 'Male',
//   });

//   actor32.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor33 = new actionActor({
//     movieName: 'John Wick: Chapter 4',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/553/423/639/pose-actor-actor-producer-pose-hd-wallpaper-preview.jpg',
//     actorName: 'Donnie Yen',
//     gender: 'Male',
//   });

//   actor33.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor41 = new actionActor({
//     movieName: 'Doctor Strange in the Multiverse of Madness',
//     picture: 'https://e0.pxfuel.com/wallpapers/731/1014/desktop-wallpaper-sherlock-season-4-benedict-cumberbatch-sherlock-holmes-martin-man-tv-series-for-iphone-android-mobile-and.jpg',
//     actorName: 'Benedict Cumberbatch',
//     gender: 'Male',
//   });

//   actor41.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor42 = new actionActor({
//     movieName: 'Doctor Strange in the Multiverse of Madness',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/927/666/544/girl-actress-scarlet-witch-elizabeth-olsen-wallpaper-preview.jpg',
//     actorName: 'Elizabeth Olsen',
//     gender: 'Female',
//   });

//   actor42.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor43 = new actionActor({
//     movieName: 'Doctor Strange in the Multiverse of Madness',
//     picture: 'https://w0.peakpx.com/wallpaper/200/768/HD-wallpaper-xochitl-gomez-doctor-strange-in-the-multiverse-of-madness.jpg',
//     actorName: 'Xochitl Gomez',
//     gender: 'Female',
//   });

//   actor43.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor51 = new actionActor({
//     movieName: 'Deadpool 2',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/209/601/239/face-portrait-actor-male-ryan-reynolds-hd-wallpaper-preview.jpg',
//     actorName: 'Ryan Reynolds',
//     gender: 'Male',
//   });

//   actor51.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor52 = new actionActor({
//     movieName: 'Deadpool 2',
//     picture: 'https://w0.peakpx.com/wallpaper/361/817/HD-wallpaper-deadpool-2-josh-brolin-as-cable-cable-deadpool-2-2017-movies-movies.jpg',
//     actorName: 'Josh Brolin',
//     gender: 'Male',
//   });

//   actor52.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor53 = new actionActor({
//     movieName: 'Deadpool 2',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/517/247/597/actresses-zazie-beetz-actress-girl-woman-hd-wallpaper-preview.jpg',
//     actorName: 'Zazie Beetz',
//     gender: 'Female',
//   });

//   actor53.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor61 = new actionActor({
//     movieName: 'Avengers: Infinity War',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/489/664/38/redhead-scarlett-johansson-black-widow-portrait-display-wallpaper-preview.jpg',
//     actorName: 'Scarlett Johansson',
//     gender: 'Female',
//   });

//   actor61.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor62 = new actionActor({
//     movieName: 'Avengers: Infinity War',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/447/178/403/actor-portrait-white-robert-downey-jr-wallpaper-preview.jpg',
//     actorName: 'Robert Downey Jr.',
//     gender: 'Male',
//   });

//   actor62.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor63 = new actionActor({
//     movieName: 'Avengers: Infinity War',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/980/737/84/chris-hemsworth-actor-face-smile-wallpaper-preview.jpg',
//     actorName: 'Chris Hemsworth',
//     gender: 'Male',
//   });

//   actor63.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor71 = new actionActor({
//     movieName: 'Avatar: The Way of Water',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/221/756/967/sam-worthington-actor-face-beard-wallpaper-preview.jpg',
//     actorName: 'Sam Worthington',
//     gender: 'Male',
//   });

//   actor71.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor72 = new actionActor({
//     movieName: 'Avatar: The Way of Water',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/242/475/651/zoe-saldana-beautiful-hd-wallpaper-preview.jpg',
//     actorName: 'Zoe Saldana',
//     gender: 'Female',
//   });

//   actor72.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor73 = new actionActor({
//     movieName: 'Avatar: The Way of Water',
//     picture: 'https://w0.peakpx.com/wallpaper/398/647/HD-wallpaper-sigourney-weaver-model-skirt-blouse-beautiful-heels-2018-actress-weaver-sigourney.jpg',
//     actorName: 'Sigourney Weaver',
//     gender: 'Female',
//   });

//   actor73.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor81 = new actionActor({
//     movieName: 'Black Adam',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/678/635/769/dwayne-johnson-the-rock-weights-workout-wallpaper-preview.jpg',
//     actorName: 'Dwayne Johnson',
//     gender: 'Male',
//   });

//   actor81.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor82 = new actionActor({
//     movieName: 'Black Adam',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/330/355/806/sarah-shahi-actress-celebrity-hd-wallpaper-preview.jpg',
//     actorName: 'Sarah Shahi',
//     gender: 'Female',
//   });

//   actor82.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor83 = new actionActor({
//     movieName: 'Black Adam',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/423/229/153/actors-henry-cavill-actor-black-and-white-wallpaper-preview.jpg',
//     actorName: 'Henry Cavill',
//     gender: 'Male',
//   });

//   actor83.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor91 = new actionActor({
//     movieName: 'Zack Snyder`s Justice League',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/356/356/933/jared-leto-oscar-2014-best-supporting-actor-wallpaper-preview.jpg',
//     actorName: 'Jared Leto',
//     gender: 'Male',
//   });

//   actor91.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor92 = new actionActor({
//     movieName: 'Zack Snyder`s Justice League',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/964/154/322/gal-gadot-women-actress-red-lipstick-wallpaper-preview.jpg',
//     actorName: 'Gal Gadot',
//     gender: 'Female',
//   });

//   actor92.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor93 = new actionActor({
//     movieName: 'Zack Snyder`s Justice League',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/821/928/937/amber-heard-actress-women-blonde-wallpaper-preview.jpg',
//     actorName: 'Amber Heard',
//     gender: 'Female',
//   });


//   actor93.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))
// });

// //  COMEDY_ACTORS DB
// app.get('/get-comedyActors', (req, res) => {

//   const actor11 = new comedyActor({
//     movieName: 'Johnny English Strikes Again',
//     picture: 'https://nationaltoday.com/wp-content/uploads/2022/03/Rowan-Atkinson-Birthday-.jpg.webp',
//     actorName: 'Rowan Atkinson',
//     gender: 'Male',
//   });

//   actor11.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor12 = new comedyActor({
//     movieName: 'Johnny English Strikes Again',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/285/428/849/olga-kurylenko-women-actress-brunette-wallpaper-preview.jpg',
//     actorName: 'Olga Kurylenko',
//     gender: 'Female',
//   });

//   actor12.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor13 = new comedyActor({
//     movieName: 'Johnny English Strikes Again',
//     picture: 'https://e1.pxfuel.com/desktop-wallpaper/59/143/desktop-wallpaper-emma-thompson-backgrounds-emma-thompson.jpg',
//     actorName: 'Emma Thompson',
//     gender: 'Female',
//   });

//   actor13.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor21 = new comedyActor({
//     movieName: 'Toy Story 4',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/921/774/547/tv-show-last-man-standing-tim-allen-wallpaper-preview.jpg',
//     actorName: 'Tim Allen',
//     gender: 'Male',
//   });

//   actor21.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor22 = new comedyActor({
//     movieName: 'Toy Story 4',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/892/110/435/tom-hanks-actor-face-smile-wallpaper-preview.jpg',
//     actorName: 'Tom Hanks',
//     gender: 'Male',
//   });

//   actor22.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor23 = new comedyActor({
//     movieName: 'Toy Story 4',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/771/263/760/john-wick-chapter-2-2017-movies-movies-keanu-reeves-wallpaper-preview.jpg',
//     actorName: 'Keanu Reeves',
//     gender: 'Male',
//   });

//   actor23.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor31 = new comedyActor({
//     movieName: 'Once Upon a Time... in Hollywood',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/116/894/489/leonardo-dicaprio-american-actor-4k-5k-wallpaper-preview.jpg',
//     actorName: 'Leonardo DiCaprio',
//     gender: 'Male',
//   });

//   actor31.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor32 = new comedyActor({
//     movieName: 'Once Upon a Time... in Hollywood',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/738/201/94/brad-pitt-actor-men-suits-wallpaper-preview.jpg',
//     actorName: 'Brad Pitt',
//     gender: 'Male',
//   });

//   actor32.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor33 = new comedyActor({
//     movieName: 'Once Upon a Time... in Hollywood',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/155/294/383/margot-robbie-wallpaper-preview.jpg',
//     actorName: 'Margot Robbie',
//     gender: 'Female',
//   });

//   actor33.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor41 = new comedyActor({
//     movieName: 'Puss in Boots: The Last Wish',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/421/644/865/antonio-banderas-men-actor-portrait-wallpaper-preview.jpg',
//     actorName: 'Antonio Banderas',
//     gender: 'Male',
//   });

//   actor41.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor42 = new comedyActor({
//     movieName: 'Puss in Boots: The Last Wish',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/66/710/329/actresses-salma-hayek-actress-brown-eyes-wallpaper-preview.jpg',
//     actorName: 'Salma Hayek',
//     gender: 'Female',
//   });

//   actor42.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor43 = new comedyActor({
//     movieName: 'Puss in Boots: The Last Wish',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/576/717/246/florence-pugh-lady-macbeth-actress-portrait-wallpaper-preview.jpg',
//     actorName: 'Florence Pugh',
//     gender: 'Female',
//   });

//   actor43.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor51 = new comedyActor({
//     movieName: 'Everything Everywhere All at Once',
//     picture: 'https://w0.peakpx.com/wallpaper/958/859/HD-wallpaper-celebrity-michelle-yeoh.jpg',
//     actorName: 'Michelle Yeoh',
//     gender: 'Female',
//   });

//   actor51.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor52 = new comedyActor({
//     movieName: 'Everything Everywhere All at Once',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/335/224/942/movie-mother-s-boys-jamie-lee-curtis-wallpaper-preview.jpg',
//     actorName: 'Jamie Lee Curtis',
//     gender: 'Female',
//   });

//   actor52.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor53 = new comedyActor({
//     movieName: 'Everything Everywhere All at Once',
//     picture: 'https://e1.pxfuel.com/desktop-wallpaper/429/495/desktop-wallpaper-jenny-slate-is-in-talks-to-join-tom-hardy-in-sony-s-venom-jenny-slate.jpg',
//     actorName: 'Jenny Slate',
//     gender: 'Female',
//   });

//   actor53.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor61 = new comedyActor({
//     movieName: 'The Bad Guys',
//     picture: 'https://e1.pxfuel.com/desktop-wallpaper/352/933/desktop-wallpaper-sam-rockwell.jpg',
//     actorName: 'Sam Rockwell',
//     gender: 'Male',
//   });

//   actor61.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor62 = new comedyActor({
//     movieName: 'The Bad Guys',
//     picture: 'https://e1.pxfuel.com/desktop-wallpaper/1015/832/desktop-wallpaper-awkwafina-on-ocean-s-8-asian-stereotypes-my-vag-awkwafina.jpg',
//     actorName: 'Awkwafina',
//     gender: 'Female',
//   });

//   actor62.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor63 = new comedyActor({
//     movieName: 'The Bad Guys',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/517/247/597/actresses-zazie-beetz-actress-girl-woman-hd-wallpaper-preview.jpg',
//     actorName: 'Zazie Beetz',
//     gender: 'Female',
//   });

//   actor63.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor71 = new comedyActor({
//     movieName: 'Tom and Jerry',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/313/938/438/chloe-grace-moretz-actress-women-blonde-wallpaper-preview.jpg',
//     actorName: 'Chloë Grace Moretz',
//     gender: 'Female',
//   });

//   actor71.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor72 = new comedyActor({
//     movieName: 'Tom and Jerry',
//     picture: 'https://e1.pxfuel.com/desktop-wallpaper/980/284/desktop-wallpaper-pallavi-sharda-australian-actress-portrait-hoot-brunettes-beautiful-woman-with-resolution-1920x1200-high-quality.jpg',
//     actorName: 'Pallavi Sharda',
//     gender: 'Female',
//   });

//   actor72.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor73 = new comedyActor({
//     movieName: 'Tom and Jerry',
//     picture: 'https://e1.pxfuel.com/desktop-wallpaper/231/670/desktop-wallpaper-watch-late-night-with-seth-meyers-interview-colin-jost-was-a-child-colin-jost.jpg',
//     actorName: 'Colin Jost',
//     gender: 'Male',
//   });

//   actor73.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor81 = new comedyActor({
//     movieName: 'Bruce Almighty',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/305/881/91/4k-photo-jennifer-aniston-wallpaper-preview.jpg',
//     actorName: 'Jennifer Aniston',
//     gender: 'Female',
//   });

//   actor81.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor82 = new comedyActor({
//     movieName: 'Bruce Almighty',
//     picture: 'https://e0.pxfuel.com/wallpapers/514/931/desktop-wallpaper-jim-carrey.jpg',
//     actorName: 'Jim Carrey',
//     gender: 'Male',
//   });

//   actor82.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor83 = new comedyActor({
//     movieName: 'Bruce Almighty',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/437/1002/410/morgan-freeman-morgan-freeman-wallpaper-preview.jpg',
//     actorName: 'Morgan Freeman',
//     gender: 'Male',
//   });

//   actor83.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor91 = new comedyActor({
//     movieName: 'The Mask',
//     picture: 'https://e0.pxfuel.com/wallpapers/514/931/desktop-wallpaper-jim-carrey.jpg',
//     actorName: 'Jim Carrey',
//     gender: 'Male',
//   });

//   actor91.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor92 = new comedyActor({
//     movieName: 'The Mask',
//     picture: 'https://w0.peakpx.com/wallpaper/403/494/HD-wallpaper-cameron-diaz-american-actress-hollywood-star-hoot-portrait-smile-beautiful-woman.jpg',
//     actorName: 'Cameron Diaz',
//     gender: 'Female',
//   });

//   actor92.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor93 = new comedyActor({
//     movieName: 'The Mask',
//     picture: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/l00IDn897RHTbTB7GcU1Pm9dKsO.jpg',
//     actorName: 'Tim Bagley',
//     gender: 'Male',
//   });

//   actor93.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))
// });

// //  HORROR_ACTORS DB
// app.get('/get-horrorActors', (req, res) => {

//   const actor11 = new horrorActor({
//     movieName: 'Scream VI',
//     picture: 'https://w0.peakpx.com/wallpaper/962/682/HD-wallpaper-actress-jenna-ortega-2022.jpg',
//     actorName: 'Jenna Ortega',
//     gender: 'Female',
//   });

//   actor11.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor12 = new horrorActor({
//     movieName: 'Scream VI',
//     picture: 'https://e1.pxfuel.com/desktop-wallpaper/390/70/desktop-wallpaper-melissa-barrera-on-behance-melissa-barrera.jpg',
//     actorName: 'Melissa Barrera',
//     gender: 'Female',
//   });

//   actor12.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor13 = new horrorActor({
//     movieName: 'Scream VI',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/933/103/812/courteney-cox-01-courtney-cox-wallpaper-preview.jpg',
//     actorName: 'Courteney Cox',
//     gender: 'Female',
//   });

//   actor13.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor21 = new horrorActor({
//     movieName: 'Hereditary',
//     picture: 'https://assets.teenvogue.com/photos/62e29b5ad683db2342bd33db/16:9/w_2560%2Cc_limit/Mallory_Bechtel3166_1.jpg',
//     actorName: 'Mallory Bechtel',
//     gender: 'Female',
//   });

//   actor21.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor22 = new horrorActor({
//     movieName: 'Hereditary',
//     picture: 'https://wwd.com/wp-content/uploads/2017/11/alex-wolff-03.jpg',
//     actorName: 'Alex Wolff',
//     gender: 'Male',
//   });

//   actor22.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor23 = new horrorActor({
//     movieName: 'Hereditary',
//     picture: 'https://wallpapers.com/images/hd/toni-collette-muriel-s-wedding-25th-anniversary-cqjzdtllqizt501e.jpg',
//     actorName: 'Toni Collette',
//     gender: 'Female',
//   });

//   actor23.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor31 = new horrorActor({
//     movieName: 'Renfield',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/595/578/559/actor-season-of-the-witch-nicolas-cage-wallpaper-preview.jpg',
//     actorName: 'Nicolas Cage',
//     gender: 'Male',
//   });

//   actor31.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor32 = new horrorActor({
//     movieName: 'Renfield',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/574/1020/905/jenna-kanell-actress-brunette-women-looking-over-shoulder-hd-wallpaper-preview.jpg',
//     actorName: 'Jenna Kanell',
//     gender: 'Female',
//   });

//   actor32.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor33 = new horrorActor({
//     movieName: 'Renfield',
//     picture: 'https://media.vanityfair.com/photos/58d01dae099007343762097c/4:3/w_1280,h_960,c_limit/Ben-Schwartz-instagrams.jpg',
//     actorName: 'Ben Schwartz',
//     gender: 'Male',
//   });

//   actor33.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor41 = new horrorActor({
//     movieName: 'Knock at the Cabin',
//     picture: 'https://www.itl.cat/pngfile/big/322-3228539_batista-wallpaper-david-batista-batista-dave-bautista.jpg',
//     actorName: 'Dave Bautista',
//     gender: 'Male',
//   });

//   actor41.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor42 = new horrorActor({
//     movieName: 'Knock at the Cabin',
//     picture: 'https://m.media-amazon.com/images/S/pv-target-images/7e77e078b7e2ea1c183371dc816e9eb79363c83a9250e5451171bdcfe00805da.jpg',
//     actorName: 'Ben Aldridge',
//     gender: 'Male',
//   });

//   actor42.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor43 = new horrorActor({
//     movieName: 'Knock at the Cabin',
//     picture: 'https://64.media.tumblr.com/29d0635174b50363b1f5366db7e040e9/tumblr_pbaxv8lXb51smsoc8o1_1280.jpg',
//     actorName: 'Jonathan Groff',
//     gender: 'Male',
//   });

//   actor43.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor51 = new horrorActor({
//     movieName: 'M3GAN',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/197/441/278/allison-williams-actress-celebrity-women-wallpaper-preview.jpg',
//     actorName: 'Allison Williams',
//     gender: 'Female',
//   });

//   actor51.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor52 = new horrorActor({
//     movieName: 'M3GAN',
//     picture: 'https://cdn.tatlerasia.com/tatlerasia/i/2021/11/25160601-ronny-chieng-supplied-photo-credit-phil-provencio_cover_1350x1800.jpg',
//     actorName: 'Ronny Chieng',
//     gender: 'Male',
//   });

//   actor52.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor53 = new horrorActor({
//     movieName: 'M3GAN',
//     picture: 'https://e1.pxfuel.com/desktop-wallpaper/837/792/desktop-wallpaper-jenna-davis.jpg',
//     actorName: 'Jenna Davis',
//     gender: 'Female',
//   });

//   actor53.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor61 = new horrorActor({
//     movieName: 'Terrifier 2',
//     picture: 'https://m.media-amazon.com/images/M/MV5BM2VkM2M2Y2MtY2U3NC00ZTY0LWIyNmQtMjYxODQ0OTA5NmY5XkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_.jpg',
//     actorName: 'samantha scaffidi',
//     gender: 'Female',
//   });

//   actor61.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor62 = new horrorActor({
//     movieName: 'Terrifier 2',
//     picture: 'https://mosaicrm.com/wp-content/uploads/2022/07/EDITED-20380_HH-59452213_Casey_Hartnett_IMG_8009_c-1080x675.jpeg',
//     actorName: 'Casey Hartnett',
//     gender: 'Female',
//   });

//   actor62.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor63 = new horrorActor({
//     movieName: 'Terrifier 2',
//     picture: 'https://m.media-amazon.com/images/M/MV5BY2NiODlmZDktYzg4MS00MmMwLTliMTItOTQ2MDJhMDNkYjVmXkEyXkFqcGdeQXVyODk5NTM4NTM@._V1_.jpg',
//     actorName: 'elliott fullam',
//     gender: 'Male',
//   });

//   actor63.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor71 = new horrorActor({
//     movieName: 'The Forever Purge',
//     picture: 'https://st4.depositphotos.com/10073228/26581/i/600/depositphotos_265815996-stock-photo-tff-2019-yesterday-closing-night.jpg',
//     actorName: 'Josh Lucas',
//     gender: 'Male',
//   });

//   actor71.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor72 = new horrorActor({
//     movieName: 'The Forever Purge',
//     picture: 'https://3.bp.blogspot.com/-dr4Bv7qx7r8/VwtV0IlIfVI/AAAAAAAAFwk/VB6Xm6xUUDcy-jpcv61dC5QxOYHmk0s1g/s1600/Leven%2BRambin%2B4k%2BUltra%2BHD%2BWallpaper2.jpg',
//     actorName: 'Leven Rambin',
//     gender: 'Female',
//   });

//   actor72.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor73 = new horrorActor({
//     movieName: 'The Forever Purge',
//     picture: 'https://static.standard.co.uk/s3fs-public/thumbnails/image/2015/04/01/09/ethan-hawke.jpg?width=1200&height=1200&fit=crop',
//     actorName: 'Ethan Hawke',
//     gender: 'Male',
//   });

//   actor73.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor81 = new horrorActor({
//     movieName: 'The New Mutants',
//     picture: 'https://wallpapercave.com/wp/wp2250305.jpg',
//     actorName: 'Charlie Heaton',
//     gender: 'Male',
//   });

//   actor81.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor82 = new horrorActor({
//     movieName: 'The New Mutants',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/18/186/416/alice-braga-brunette-brown-eyes-curly-hair-brazilian-hd-wallpaper-preview.jpg',
//     actorName: 'Alice Braga',
//     gender: 'Female',
//   });

//   actor82.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor83 = new horrorActor({
//     movieName: 'The New Mutants',
//     picture: 'https://wallpaperaccess.com/full/1640330.jpg',
//     actorName: 'Maisie Williams',
//     gender: 'Female',
//   });

//   actor83.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor91 = new horrorActor({
//     movieName: 'Evil Dead Rise',
//     picture: 'https://wallpapercave.com/wp/wp4359268.jpg',
//     actorName: 'Lily Sullivan',
//     gender: 'Female',
//   });

//   actor91.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor92 = new horrorActor({
//     movieName: 'Evil Dead Rise',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/856/715/624/celebrity-alyssa-sutherland-actress-girl-model-hd-wallpaper-preview.jpg',
//     actorName: 'Alyssa Sutherland',
//     gender: 'Female',
//   });

//   actor92.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor93 = new horrorActor({
//     movieName: 'Evil Dead Rise',
//     picture: 'https://darkflix.blog.br/wp-content/uploads/2021/07/bruce-campbeel-1-e1626444932266-1024x719.png',
//     actorName: 'Bruce Campbell',
//     gender: 'Male',
//   });

//   actor93.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))
// });

// //  ROMANCE_ACTORS DB
// app.get('/get-romanceActors', (req, res) => {

//   const actor11 = new romanceActor({
//     movieName: 'A Star is Born',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/205/710/506/bradley-cooper-actor-man-wallpaper-preview.jpg',
//     actorName: 'Bradley Cooper',
//     gender: 'Male',
//   });

//   actor11.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor12 = new romanceActor({
//     movieName: 'A Star is Born',
//     picture: 'https://w0.peakpx.com/wallpaper/965/110/HD-wallpaper-tv-show-sam-elliott-1883.jpg',
//     actorName: 'Sam Elliott',
//     gender: 'Male',
//   });

//   actor12.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor13 = new romanceActor({
//     movieName: 'A Star is Born',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/393/937/316/lady-gaga-mother-monster-singer-makeup-wallpaper-preview.jpg',
//     actorName: 'Lady Gaga',
//     gender: 'Female',
//   });

//   actor13.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor21 = new romanceActor({
//     movieName: 'The Proposal',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/935/776/835/best-movies-ryan-reynolds-the-hitmans-bodyguard-wallpaper-preview.jpg',
//     actorName: 'Ryan Reynolds',
//     gender: 'Male',
//   });

//   actor21.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor22 = new romanceActor({
//     movieName: 'The Proposal',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/501/166/411/sandra-bullock-desktop-wallpaper-preview.jpg',
//     actorName: 'Sandra Bullock',
//     gender: 'Female',
//   });

//   actor22.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor23 = new romanceActor({
//     movieName: 'The Proposal',
//     picture: 'https://www.imagebee.org/celebrities/zoe-bell/12_Zoe-Bell-1710x1140.jpg',
//     actorName: 'Mary Steenburgen',
//     gender: 'Female',
//   });

//   actor23.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor31 = new romanceActor({
//     movieName: '50 First Dates',
//     picture: 'https://e1.pxfuel.com/desktop-wallpaper/632/768/desktop-wallpaper-adam-sandler-adam-sandler.jpg',
//     actorName: 'Adam Sandler',
//     gender: 'Male',
//   });

//   actor31.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor32 = new romanceActor({
//     movieName: '50 First Dates',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/495/253/102/barrymore-drew-models-women-wallpaper-preview.jpg',
//     actorName: 'Drew Barrymore',
//     gender: 'Female',
//   });

//   actor32.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor33 = new romanceActor({
//     movieName: '50 First Dates',
//     picture: 'https://e1.pxfuel.com/desktop-wallpaper/601/267/desktop-wallpaper-pic-blake-shelton-and-rob-schneider-in-character-on-their-movie-blake-shelton.jpg',
//     actorName: 'Rob Schneider',
//     gender: 'Male',
//   });

//   actor33.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor41 = new romanceActor({
//     movieName: 'Last Christmas',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/277/659/607/actress-women-brunette-emilia-clarke-wallpaper-preview.jpg',
//     actorName: 'Emilia Clarke',
//     gender: 'Female',
//   });

//   actor41.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor42 = new romanceActor({
//     movieName: 'Last Christmas',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/113/38/341/emma-thompson-actress-emotions-bw-wallpaper-preview.jpg',
//     actorName: 'Emma Thompson',
//     gender: 'Female',
//   });

//   actor42.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor43 = new romanceActor({
//     movieName: 'Last Christmas',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/137/359/786/movie-last-christmas-henry-golding-hd-wallpaper-preview.jpg',
//     actorName: 'Henry Golding',
//     gender: 'Male',
//   });

//   actor43.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor51 = new romanceActor({
//     movieName: 'Five Feet Apart',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/746/867/596/5c1fad78b7abb-wallpaper-preview.jpg',
//     actorName: 'Cole Sprouse',
//     gender: 'Male',
//   });

//   actor51.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor52 = new romanceActor({
//     movieName: 'Five Feet Apart',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/444/331/807/claire-forlani-actress-brunette-smile-wallpaper-preview.jpg',
//     actorName: 'Claire Forlani',
//     gender: 'Female',
//   });

//   actor52.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor53 = new romanceActor({
//     movieName: 'Five Feet Apart',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/102/807/607/haley-lu-richardson-women-actress-brunette-green-eyes-hd-wallpaper-preview.jpg',
//     actorName: 'Haley Lu Richardson',
//     gender: 'Female',
//   });

//   actor53.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor61 = new romanceActor({
//     movieName: 'Dear John',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/195/818/402/channing-tatum-wallpaper-preview.jpg',
//     actorName: 'Channing Tatum',
//     gender: 'Male',
//   });

//   actor61.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor62 = new romanceActor({
//     movieName: 'Dear John',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/657/870/499/amanda-seyfried-actress-blonde-women-wallpaper-preview.jpg',
//     actorName: 'Amanda Seyfried',
//     gender: 'Female',
//   });

//   actor62.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor63 = new romanceActor({
//     movieName: 'Dear John',
//     picture: 'https://e1.pxfuel.com/desktop-wallpaper/351/40/desktop-wallpaper-pin-on-celebrity-news-scott-porter.jpg',
//     actorName: 'Scott Porter',
//     gender: 'Male',
//   });

//   actor63.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor71 = new romanceActor({
//     movieName: 'Midnight Sun',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/590/879/811/bella-thorne-wallpaper-preview.jpg',
//     actorName: 'Bella Thorne',
//     gender: 'Female',
//   });

//   actor71.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor72 = new romanceActor({
//     movieName: 'Midnight Sun',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/765/1/176/quinn-shephard-celebrities-girls-hd-wallpaper-preview.jpg',
//     actorName: 'Quinn Shephard',
//     gender: 'Female',
//   });

//   actor72.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor73 = new romanceActor({
//     movieName: 'Midnight Sun',
//     picture: 'https://e1.pxfuel.com/desktop-wallpaper/330/616/desktop-wallpaper-patrick-schwarzenegger-wants-to-be-known-for-more-than-just-who-young-ma-iphone.jpg',
//     actorName: 'Patrick Schwarzenegger',
//     gender: 'Male',
//   });

//   actor73.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor81 = new romanceActor({
//     movieName: 'The Last Letter from Your Lover',
//     picture: 'https://w0.peakpx.com/wallpaper/163/802/HD-wallpaper-movie-fantastic-beasts-the-secrets-of-dumbledore-callum-turner.jpg',
//     actorName: 'Callum Turner',
//     gender: 'Male',
//   });

//   actor81.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor82 = new romanceActor({
//     movieName: 'The Last Letter from Your Lover',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/25/776/841/shailene-woodley-hd-wallpaper-preview.jpg',
//     actorName: 'Shailene Woodley',
//     gender: 'Female',
//   });

//   actor82.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor83 = new romanceActor({
//     movieName: 'The Last Letter from Your Lover',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/299/62/405/felicity-jones-actress-women-green-eyes-wallpaper-preview.jpg',
//     actorName: 'Felicity Jones',
//     gender: 'Female',
//   });

//   actor83.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor91 = new romanceActor({
//     movieName: 'The Longest Ride',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/154/735/719/scott-eastwood-actor-look-jacket-wallpaper-preview.jpg',
//     actorName: 'Scott Eastwood',
//     gender: 'Male',
//   });

//   actor91.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor92 = new romanceActor({
//     movieName: 'The Longest Ride',
//     picture: 'https://e1.pxfuel.com/desktop-wallpaper/486/844/desktop-wallpaper-britt-robertson-actress-54045-1920x1200-px-wallsource-britt-robertson.jpg',
//     actorName: 'Britt Robertson',
//     gender: 'Female',
//   });

//   actor92.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))

//   const actor93 = new romanceActor({
//     movieName: 'The Longest Ride',
//     picture: 'https://c4.wallpaperflare.com/wallpaper/197/912/915/actresses-oona-chaplin-actress-girl-spanish-hd-wallpaper-preview.jpg',
//     actorName: 'Oona Chaplin',
//     gender: 'Female',
//   });

//   actor93.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => console.log(err))
// });


//-----------------------------for Handling Mail-----------------------------------------

// define route to handle POST request from form
app.post('/send-email', (req, res) => {
  // get form data from request body
  const { price, seat, moviename, name, email, subject, message } = req.body;

  // create nodemailer transport object
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'muhammad.anas159@gmail.com', // replace with your Gmail email address
      pass: '' // Place here your Gmail key
    }
  });

  // define email options
  const mailOptions = {
    from: 'muhammad.anas159@gmail.com', // replace with your Gmail email address
    to: email, 
    subject: subject,
    html: `
      <h1>Thank You for Ordering ${moviename} Ticket on ScreenSizzle</h1>
      <h1>Account Details</h1>
      <table style="border-collapse: collapse; width: 100%; border: 1px solid #fff; background: linear-gradient(to right, #16222a, #3a6073); color: #00a67d; font-family: Arial, sans-serif;">
        
        <tr>
          <th style="border-bottom: 1px solid #000; padding: 12px; text-align: left;">Account Holder Name:</td>
          <td style="border-bottom: 1px solid #000; padding: 12px; text-align: left;">${name}</td>
        </tr>
        <tr>
          <th style="border-bottom: 1px solid #000; padding: 12px; text-align: left;">Email:</td>
          <td style="border-bottom: 1px solid #000; padding: 12px; text-align: left;">${email}</td>
        </tr>
        <tr>
          <th style="border-bottom: 1px solid #000; padding: 12px; text-align: left;">Message:</td>
          <td style="border-bottom: 1px solid #000; padding: 12px; text-align: left;">${message}</td>
        </tr>
      </table>
  
      <h1>Summary</h1>
      <table style="border-collapse: collapse; width: 100%; border: 1px solid #fff; background: linear-gradient(to right, #16222a, #3a6073); color: #00a67d; font-family: Arial, sans-serif;">
        
        <tr>
          <th style="border-bottom: 1px solid #000; padding: 12px; text-align: left;">Movie:</td>
          <td style="border-bottom: 1px solid #000; padding: 12px; text-align: left;">${moviename}</td>
        </tr>
        <tr>
          <th style="border-bottom: 1px solid #000; padding: 12px; text-align: left;">Price:</td>
          <td style="border-bottom: 1px solid #000; padding: 12px; text-align: left;">${price}</td>
        </tr>
        <tr>
          <th style="border-bottom: 1px solid #000; padding: 12px; text-align: left;">Seats Booked:</td>
          <td style="border-bottom: 1px solid #000; padding: 12px; text-align: left;">${seat}</td>
        </tr>
      </table>
    `
  };

  // send email using nodemailer
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error: Could not send email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email Sent');
    }
  });
});


// -------------------------------------------- for Payment---------------------------


app.post('/payment', async (req, res) => {
  let status, error;
  const { token, amount } = req.body;
  try {
    await Stripe.charges.create({
      source: token.id,
      amount,
      currency: 'usd',
    });
    status = 'success';
  } catch (error) {
    console.log(error);
    status = 'Failure';
  }
  res.json({ error, status });
});

//-----------------------------Login SignUp----------------------------


// define a route to handle the post request to handle SignUp
app.post('/submitSignUp', (req, res) => {
  const { username, email, password } = req.body;

  // create a new instance of the model with the received data
  const myData = new LoginSignUp({ username, email, password });

  // save the data to MongoDB
  myData.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => console.log(err))
});

// define a route to handle the post request to handle Login
app.post('/submitLogin', (req, res) => {
  const { email, password } = req.body;

  LoginSignUp.findOne({ email, password })
    .then((user) => {
      if (user) {
        console.log('User found');
        res.sendStatus(200);
      } else {
        console.log('User not found');
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});


//-----------------------------------------------

// For Carousel
app.get('/get-all-Car', (req, res) => {
  Carousel.find()
    .then((result) => {
      // res.render('index', { blogs: result });
      res.send(result)
    })
    .catch((err) => console.log(err));
});

// For Payment Hostory
app.get('/get-all-admin', (req, res) => {
  PaymentPost.find()
    .then((result) => {
      // res.render('index', { blogs: result });
      res.send(result)
    })
    .catch((err) => console.log(err));
});

// For Coming Soon Movies
app.get('/get-all-CS', (req, res) => {
  ComingSoon.find()
    .then((result) => {
      // res.render('index', { blogs: result });
      res.send(result)
    })
    .catch((err) => console.log(err));
});

// for Now Showing
app.get('/get-all', (req, res) => {
  Blog.find()
    .then((result) => {
      // res.render('index', { blogs: result });
      res.send(result)
    })
    .catch((err) => console.log(err));
});


app.get('/get-single', (req, res) => {

  Blog.findById("644e78564b03666ed7fee2e5")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err))

})