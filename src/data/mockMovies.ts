import type { Genre, Movie } from "../tipes/movie";

export const mockGenres: Genre[] = [
  { id: 28, name: "Ação" },
  { id: 12, name: "Aventura" },
  { id: 16, name: "Animação" },
  { id: 35, name: "Comédia" },
  { id: 80, name: "Crime" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Família" },
  { id: 14, name: "Fantasia" },
  { id: 36, name: "História" },
  { id: 27, name: "Terror" },
  { id: 10402, name: "Música" },
  { id: 9648, name: "Mistério" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Ficção científica" },
  { id: 53, name: "Thriller" },
];

export const mockMovies: Movie[] = [
  {
    id: 1,
    title: "Vingadores: Ultimato",
    poster_path: "/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    backdrop_path: "/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    overview:
      "Após Thanos eliminar metade das criaturas vivas, os Vingadores têm de lidar com a perda de amigos e entes queridos. Com Tony Stark vagando perdido no espaço sem água e comida, Steve Rogers e Natasha Romanov lideram a resistência contra o titã louco.",
    release_date: "2019-04-24",
    vote_average: 8.3,
    genre_ids: [12, 28, 878],
    genres: mockGenres.filter((g) => [12, 28, 878].includes(g.id)),
  },
  {
    id: 2,
    title: "John Wick 4: Baba Yaga",
    poster_path: "/r2NcIZ1FPMlxCty3vRITVTgGNVS.jpg",
    backdrop_path: "/h8gHn0OzBoaefsYseUByqsmEDMY.jpg",
    overview:
      "John Wick descobre um caminho para derrotar a Alta Cúpula. Mas antes que ele possa ganhar sua liberdade, Wick deve enfrentar um novo inimigo com alianças poderosas em todo o mundo e forças que transformam velhos amigos em inimigos.",
    release_date: "2023-03-22",
    vote_average: 7.8,
    genre_ids: [28, 53, 80],
    genres: mockGenres.filter((g) => [28, 53, 80].includes(g.id)),
  },
  {
    id: 3,
    title: "Toy Story 4",
    poster_path: "/tK1zy5BsCt1J4OzoDicXmr0UTFH.jpg",
    backdrop_path: "/m67smI1IIMmYzCl9axvKNULVKLr.jpg",
    overview:
      "Woody, Buzz Lightyear e o resto da turma embarcam em uma viagem com Bonnie e um novo brinquedo chamado Forky. A aventura logo se transforma em uma reunião inesperada quando o ligeiro desvio que Woody faz o leva até seu amigo há muito perdido, Bo Peep. À medida que Woody e Bo discutem os velhos tempos, eles logo começam a perceber que são mundos diferentes quando se trata do que querem da vida como um brinquedo.",
    release_date: "2019-06-19",
    vote_average: 7.6,
    genre_ids: [16, 35, 10751],
    genres: mockGenres.filter((g) => [16, 35, 10751].includes(g.id)),
  },
  {
    id: 4,
    title: "Coringa",
    poster_path: "/xLxgVxFWvb9hhUyCDDXxRPPnFck.jpg",
    backdrop_path: "/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg",
    overview:
      "Isolado, intimidado e desconsiderado pela sociedade, o fracassado comediante Arthur Fleck inicia seu caminho como uma mente criminosa após assassinar três homens em pleno metrô. Sua ação inicia um movimento popular contra a elite de Gotham City, da qual Thomas Wayne é seu maior representante.",
    release_date: "2019-10-02",
    vote_average: 8.3,
    genre_ids: [80, 18, 53],
    genres: mockGenres.filter((g) => [80, 18, 53].includes(g.id)),
  },
  {
    id: 5,
    title: "Parasita",
    poster_path: "/igw938inb6Fy0YVcwIyxQ7Lu5FO.jpg",
    backdrop_path: "/TU9NIjwzjoKPwQHoRvshDB5z1BE.jpg",
    overview:
      "Toda a família de Ki-taek está desempregada, vivendo em um porão sujo e apertado. Uma obra do acaso faz com que o filho adolescente da família comece a dar aulas de inglês à garota de uma família rica. Fascinados com a vida luxuosa destas pessoas, pai, mãe, filho e filha bolam um plano para se infiltrarem também na família burguesa, um a um. No entanto, os segredos e mentiras necessários à ascensão social custarão caro a todos.",
    release_date: "2019-05-30",
    vote_average: 8.5,
    genre_ids: [35, 18, 53],
    genres: mockGenres.filter((g) => [35, 18, 53].includes(g.id)),
  },
  {
    id: 6,
    title: "1917",
    poster_path: "/iZf0KyrE25z1sage4SYFLCCrMi9.jpg",
    backdrop_path: "/2lBOQK6tlpOKyBRYfqUBkLZXtTq.jpg",
    overview:
      "Na Primeira Guerra Mundial, dois soldados britânicos, Schofield e Blake, recebem uma missão aparentemente impossível. Em uma corrida contra o tempo, eles precisam atravessar o território inimigo e entregar uma mensagem que pode salvar 1.600 de seus companheiros.",
    release_date: "2019-12-25",
    vote_average: 8.2,
    genre_ids: [18, 28, 36],
    genres: mockGenres.filter((g) => [18, 28, 36].includes(g.id)),
  },
  {
    id: 7,
    title: "Duna",
    poster_path: "/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
    overview:
      "Paul Atreides é um jovem brilhante de grande destino, além de sua compreensão, que deve viajar para o planeta mais perigoso do universo para garantir o futuro de seu povo.",
    release_date: "2021-09-15",
    vote_average: 8.0,
    genre_ids: [878, 12],
    genres: mockGenres.filter((g) => [878, 12].includes(g.id)),
  },
  {
    id: 8,
    title: "Top Gun: Maverick",
    poster_path: "/1e6Q5nLkG1HqLec1Z2Z21m45dD9.jpg",
    backdrop_path: "/2FYzxgLNuNVwncG7MPsK8x4Si1W.jpg",
    overview:
      'Depois de mais de 30 anos de serviço como um dos principais aviadores da Marinha, Pete "Maverick" Mitchell está de volta, rompendo os limites como um piloto de testes corajoso.',
    release_date: "2022-05-24",
    vote_average: 8.2,
    genre_ids: [28, 18],
    genres: mockGenres.filter((g) => [28, 18].includes(g.id)),
  },
  {
    id: 9,
    title: "Oppenheimer",
    poster_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    backdrop_path: "/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
    overview:
      "A história do físico J. Robert Oppenheimer, seu papel no desenvolvimento da bomba atômica durante a Segunda Guerra Mundial e as consequências morais de suas ações.",
    release_date: "2023-07-19",
    vote_average: 8.1,
    genre_ids: [18, 36],
    genres: mockGenres.filter((g) => [18, 36].includes(g.id)),
  },
  {
    id: 10,
    title: "Avatar: O Caminho da Água",
    poster_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    backdrop_path: "/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
    overview:
      "Jake Sully e Neytiri formaram uma família e fazem de tudo para ficarem juntos. No entanto, eles devem sair de casa e explorar as regiões de Pandora quando uma antiga ameaça ressurge.",
    release_date: "2022-12-14",
    vote_average: 7.6,
    genre_ids: [878, 12, 14],
    genres: mockGenres.filter((g) => [878, 12, 14].includes(g.id)),
  },
];

export const simulateApiDelay = (ms: number = 500) => new Promise((resolve) => setTimeout(resolve, ms));
