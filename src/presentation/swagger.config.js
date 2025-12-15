const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'Documentation for the API',
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 8080}/api/v1`,
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      }
    },
    schemas: {
                      User: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string',
                            example: '60c72b2f9b1e8a001f8e4caa'
                          },
                          name: {
                            type: 'string',
                            example: 'John Doe'
                          },
                          email: {
                            type: 'string',
                            example: 'jhon.doe@example.com'
                          },
                          roles: {
                            type: 'array',
                            items: {
                              type: 'string'
                            },
                            example: ['user']
                          }
                        }
                      },
                      UserInput: {
                        type: 'object',
                        properties: {
                          name: {
                            type: 'string',
                            example: 'John Doe'
                          },
                          email: {
                            type: 'string',
                            example: 'jhon.doe@exmaple.com'
                          },
                          password: {
                            type: 'string',
                            example: 'password123'
                          },
                          roles: {
                            type: 'array',
                            items: {
                              type: 'string'
                            },
                            example: ['user']
                          }
                        }
                      },



                  Role: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        example: '60c72b2f9b1e8a001f8e4caa'
                      },
                      name: {
                        type: 'string',
                        example: 'Administrator'
                      }
                    }
                  },
                RoleInput: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                      example: 'Administrator'
                    }


                  }
                },


                

                  Product: {
                    type: 'object',
                    properties: 
                    {
                                            id: {
                                              type: 'string',
                                              example: '60c72b2f9b1e8a001f8e4caa'
                                                },
                                            name: {
                                              type: 'string',
                                              example: 'TV Sony 4K'
                                                  },
                                            description: {
                                              type: 'string',
                                              example: 'High-quality electronic product'
                                                          },
                                            price: {
                                              type: 'number',
                                              example: '19.59'
                                                  },
                                            stock: {
                                              type: 'number',
                                              example: '10'  
                                                  },
                                            category: {
                                              type: 'string',
                                              example: 'Electronics'  
                                                      },
                                            brand: {
                                              type: 'string',
                                              example: 'Sony'  
                                                    },
                                            imageUrl: {
                                              type: 'string',
                                              example: 'http://example.com/image.jpg'  
                                                      }
                  }
                  
                },
                ProductInput: {
                  type: 'object',
                  properties: 
                  {
                                          name: {
                                              type: 'string',
                                              example: 'TV Sony 4K'
                                            },
                                          description: {
                                            type: 'string',
                                            example: 'High-quality electronic product'
                                          },
                                          price: {
                                            type: 'number',
                                            example: '19.59'
                                          },
                                          stock: {
                                            type: 'number',
                                            example: '10'  
                                          },
                                          category: {
                                            type: 'string',
                                            example: 'Electronics'  
                                          },
                                          brand: {
                                            type: 'string',
                                            example: 'Sony'  
                                          },
                                          imageUrl: {
                                            type: 'string',
                                            example: 'http://example.com/image.jpg'  
                                          }


                  }
                },


                Cupon: 
                {
                    type: 'object',
                    properties: 
                    {
                                    id: {
                                      type: 'string',
                                      example: '60c72b2f9b1e8a001f8e4caa'
                                    },
                                    id_user: {
                                      type: 'string',
                                      example: '60c72b2f9b1e8a001f8e4caa'
                                    },
                                    inid_date: {
                                      type: 'string',
                                      example: '20251201 // must be YYYYMMDD'
                                    },
                                    end_date: {
                                      type: 'string',
                                      example: '20251231 // must be YYYYMMDD'
                                    },
                                    value: {
                                      type: 'number',
                                      example: '10.6'  
                                    }

                    }
                  
                },
                
                CuponInput: {
                  type: 'object',
                  properties: 
                  {
                                          id_user: {
                                                    type: 'string',
                                                    example: '60c72b2f9b1e8a001f8e4caa'
                                                  },
                                          inid_date: {
                                            type: 'string',
                                            example: '20251201 // must be YYYYMMDD'
                                          },
                                          end_date: {
                                            type: 'string',
                                            example: '20251231 // must be YYYYMMDD'
                                          },
                                          value: {
                                            type: 'number',
                                            example: '10.6'  
                                          }
                  }
                 },





Order: {
  type: 'object',
  properties: {
    id: { type: 'string', example: '60c72b2f9b1e8a001f8e4caa' },
    userId: { type: 'string', example: '60c72b2f9b1e8a001f8e4caa' },
    cuponId: { type: 'string', example: '60c72b2f9b1e8a001f8e4caa' },
    items: {
      type: 'array',
      items: {
        $ref: '#/components/schemas/OrderItem'
      },
      example: [
        { productId: '60c72b2f9b1e8a001f8e4caa', quantity: 2, unitPrice: 50.5, lineTotal: 101 },
        { productId: '60c72b2f9b1e8a001f8e4cab', quantity: 1, unitPrice: 99.99, lineTotal: 99.99 }
      ]
    },
    subtotal: { type: 'number', example: 200 },
    discount: { type: 'number', example: 0 },
    total: { type: 'number', example: 200 },
    status: { type: 'string', example: 'paid' },
    paidAt: { type: 'string', example: '20251231 // must be YYYYMMDD' }
  }
}

                 
                 
                 
                 ,OrderInput: {
                  type: 'object',
                  
                  

                  properties: {
    userId: { type: 'string', example: '60c72b2f9b1e8a001f8e4caa' },
    cuponId: { type: 'string', example: '60c72b2f9b1e8a001f8e4caa' },
    items: {
      type: 'array',
      items: {
        $ref: '#/components/schemas/OrderItem'
      },
      example: [
        { productId: '60c72b2f9b1e8a001f8e4caa', quantity: 2, unitPrice: 50.5, lineTotal: 101 },
        { productId: '60c72b2f9b1e8a001f8e4cab', quantity: 1, unitPrice: 99.99, lineTotal: 99.99 }
      ]
    },
    subtotal: { type: 'number', example: 200 },
    discount: { type: 'number', example: 0 },
    total: { type: 'number', example: 200 },
    status: { type: 'string', example: 'paid' },
    paidAt: { type: 'string', example: '20251231 // must be YYYYMMDD' }
  }


                 },



                 OrderItem: 
                {
                    type: 'object',
                    properties: 
                    {
                                    id: {
                                      type: 'string',
                                      example: '60c72b2f9b1e8a001f8e4caa'
                                    },
                                    productId: {
                                      type: 'string',
                                      example: '60c72b2f9b1e8a001f8e4caa'
                                    },
                                    quantity: {
                                      type: 'number',
                                      example: '50'
                                    },
                                    unitPrice: {
                                      type: 'number',
                                      example: '10.5'
                                    },
                                    lineTotal: {
                                      type: 'number',
                                      example: '50.5'  
                                    }

                    }
                  
                }










                 }
    },
  security: [{
    bearerAuth: []
  }]
}; // aca me esta mistrand error, del punto y coma

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./src/presentation/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
