var { buildSchema } = require('graphql');

export var schema = buildSchema(`
  type Query {
    getAstronauts: [Astronaut],
    getMissions: [Mission]
    getAstronautById(id: Int): Astronaut
  }
  type Mutation {
    addMission(name: String, insignia: String, date: String, description: String, astronauts: [ID]): Mission,
    deleteMission(id: ID): [Mission],
    addAstronaut(name: String, picture: String, nationality: String): Astronaut
    deleteAstronaut(id:ID): [Astronaut]
  }
  type Mission {
    id: ID,
    name: String,
    insignia: String,
    date: String,
    description: String,
    astronauts: [Astronaut]
  }
  type Astronaut {
    id: ID,
    name: String,
    picture: String,
    nationality: String,
    short_bio: String,
  }
`);