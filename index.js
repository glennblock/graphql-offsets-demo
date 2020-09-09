const { ApolloServer, gql } = require('apollo-server');
const { readFileSync } = require('fs');
const { brotliCompressSync } = require('zlib');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
    description: String
    published: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books(offset: Int, limit: Int = 5): [Book]
  }
`;

//from https://gist.githubusercontent.com/nanotaboada/6396437/raw/82dca67cc3b6a5ccfcf8af012664cdaa0025d999/books.json
var books = JSON.parse(readFileSync('books.json')).books;
books.sort((a,b)=>a.title.localeCompare(b.title));

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: (parent, args, context, info) => {
      if (args.limit < 1 || args.limit > 5) {
        throw new Error("limit but be between 0 and 7");
      }
      var offset = args.offset;
      if (args.offset == undefined) {
        args.offset = 0;
      }
      return books.slice(args.offset, args.offset + args.limit);
    }
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

