import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "Documentacion de API-READ-HACKER-NEWS",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:5000",
    },
  ],
  components: {
    schemas: {
      comment: {
        type: "object",
        required: ["id_comment", "author", "comment_text"],
        properties: {
          id_comment:{
              type: "number"
          },
          author: {
            type: "string",
          },
          comment_text: {
            type: "string",
          },
          id_story:{
              type:"number"
          }
        },
      },
      FilterAuthor:{
        type: "object",
        required: ["author"],
        properties: {
          author: {
            type: "string",
          }
        },
      },
      FilterDate:{
        type: "object",
        required: ["date"],
        properties: {
          date: {
            type: "string",
          }
        },
      },
      FilterTag:{
        type: "object",
        required: ["tag"],
        properties: {
          tag: {
            type: "string",
          }
        },
      },
      FilterTitle:{
        type: "object",
        properties: {
          title: {
            type: "string",
          }
        },
      },
      commentFilter:{
        type: "object",
        properties: {
          author: {
            type: "string",
          },
          tag: {
            type: "array",
            items:{
              type:"string"
            }
          }
        },
      },
      storyFilter:{
        type: "object",
        properties: {
          author: {
            type: "string",
          },
          title: {
            type: "string",
          }
        },
      },
      story: {
        type: "object",
        required: ["id_story", "title","url"],
        properties: {
          id_story: {
            type: "number",
          },
          title: {
            type: "string",
          },
          author:{
              type:"string"
          },
          story_text:{
              type:"string"
          },
          url:{
              type:"string"
          }
        },
      },
      detailStory:{
        type: "object",
        required: ["id_story", "title","url","publication_date"],
        properties: {
          id_story: {
            type: "number",
          },
          title: {
            type: "string",
          },
          author:{
              type:"string"
          },
          story_text:{
              type:"string"
          },
          url:{
              type:"string"
          },
          publication_date:{
              type:"string"
          },
          tags:{
              type:"array",
              items:{
                  type:"string"
              }
          }
        },
      },
      tag:{
        type: "object",
        required: ["id_tag", "name"],
        properties: {
          id_tag:{
              type: "number"
          },
          name: {
            type: "string",
          }
        },
      },
      responseApi:{
        type:"object",
        properties: {
          status:{
              type: "number"
          },
          message: {
            type: "string",
          }
        }
      },
      responseComment:{
        type:"object",
        properties:{
          status:{
            type: "number"
        },
        comment:{
          type:"array",
          items:{
            type:"comment",
          }
        },
        message: {
          type: "string",
        }
        }
      },
      responseTag:{
        type:"object",
        properties:{
          status:{
            type: "number"
        },
        tags:{
          type:"array",
          items:{
            type:"tag"
          }
        },
        message: {
          type: "string",
        }
        }
      },
      responseStory:{
        type:"object",
        properties:{
          status:{
            type: "number"
        },
        storys:{
          type:"array",
          items:{
            type:"story"
          }
        },
        message: {
          type: "string",
        }
        }
      },
      error:{
        type:"object",
        properties: {
          status:{
              type: "number"
          },
          error:{
            type:"object"
          },
          message: {
            type: "string",
          }
        }
      }
    },
  },
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

export default swaggerJSDoc(swaggerOptions);