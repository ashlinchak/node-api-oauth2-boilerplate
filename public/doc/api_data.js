define({ "api": [
  {
    "type": "post",
    "url": "/api/oauth2/token",
    "title": "Use Refresh Token to Request a New Access Token",
    "version": "1.0.0",
    "name": "ExchangeRefreshTokenOnAccessToken",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "client_id",
            "description": "<p>[Required] The client ID of the native client application.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "client_secret",
            "description": "<p>[Required] The client secret code of the native client application.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "grant_type",
            "description": "<p>[Required] Indicates the type of grant being used. In this case, the value must be <b>refresh_token</b>.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "refresh_token",
            "description": "<p>[Required] The refresh token that was included in the response that provided the access token.</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>[Required] Authorization value.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>AccessToken</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token_type",
            "description": "<p>Token type. Value is <b>Bearer</b></p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "expires_in",
            "description": "<p>Total seconds when Access Token will be expired.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "resource",
            "description": "<p>Resource where the Access Token is valid.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "refresh_token",
            "description": "<p>Refresh Token for generating a new Access Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n \t\"access_token\": \"b5a4f56a8fd082802159d9a55fb614fcdacfea1eb72ed8ffb772f46c4c7f2e65\",\n \t\"token_type\": \"Bearer\",\n \t\"expires_in\": \"3600\",\n \t\"resource\": \"node-api-oauth2-boilerplate\",\n \t\"refresh_token\": \"b5a4f56a8fd082802159d9a55fb614fcdacfea1eb72ed8ffb772f46c4c7f2e65\"\n }",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/oauth2_controller.js",
    "groupTitle": "Auth",
    "error": {
      "fields": {
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "InternalAPIServerError",
            "description": "<p>Something is broken.</p>"
          }
        ],
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnauthorizedError",
            "description": "<p>You are unauthorized for this action.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "InternalAPIServerError:",
          "content": "HTTP/1.1 500 InternalAPIServerError\n  {\n  \t\"error\": \"Something is broken.\",\n  \t\"id\": \"internal_server_error\"\n  }",
          "type": "json"
        },
        {
          "title": "Unauthorized:",
          "content": "HTTP/1.1 401 Unauthorized\n  Unauthorized",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/oauth2/token",
    "title": "Use Authorization Code to Request an Access Token",
    "version": "1.0.0",
    "name": "GetAccessToken",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "client_id",
            "description": "<p>[Required] The client ID of the native client application.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "client_secret",
            "description": "<p>[Required] The client secret code of the native client application.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "grant_type",
            "description": "<p>[Required] Indicated the type of grant you are using. For an authorization code grant, the value is <b>authorization_code</b>.</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>[Required] Authorization value.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>AccessToken</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token_type",
            "description": "<p>Token type. Value is <b>Bearer</b></p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "expires_in",
            "description": "<p>Total seconds when Access Token will be expired.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "resource",
            "description": "<p>Resource where the Access Token is valid.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "refresh_token",
            "description": "<p>Refresh Token for generating a new Access Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n \t\"access_token\": \"b5a4f56a8fd082802159d9a55fb614fcdacfea1eb72ed8ffb772f46c4c7f2e65\",\n \t\"token_type\": \"Bearer\",\n \t\"expires_in\": \"3600\",\n \t\"resource\": \"node-api-oauth2-boilerplate\",\n \t\"refresh_token\": \"b5a4f56a8fd082802159d9a55fb614fcdacfea1eb72ed8ffb772f46c4c7f2e65\"\n }",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/oauth2_controller.js",
    "groupTitle": "Auth",
    "error": {
      "fields": {
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "InternalAPIServerError",
            "description": "<p>Something is broken.</p>"
          }
        ],
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnauthorizedError",
            "description": "<p>You are unauthorized for this action.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "InternalAPIServerError:",
          "content": "HTTP/1.1 500 InternalAPIServerError\n  {\n  \t\"error\": \"Something is broken.\",\n  \t\"id\": \"internal_server_error\"\n  }",
          "type": "json"
        },
        {
          "title": "Unauthorized:",
          "content": "HTTP/1.1 401 Unauthorized\n  Unauthorized",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/oauth2/authorize",
    "title": "Request an Authorization Code",
    "version": "1.0.0",
    "name": "GetAuthorizationCode",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "client_id",
            "description": "<p>[Required] The client ID of the native client application.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "response_type",
            "description": "<p>[Required] Specifies the requested response type. In an authorization code grant request, the value must be <b>code</b>.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "redirect_uri",
            "description": "<p>[Not implemented] Specifies the reply URL of the application.</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>[Required] Authorization value.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>AuthorizationCode.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n \t\"code\": \"b5a4f56a8fd082802159d9a55fb614fcdacfea1eb72ed8ffb772f46c4c7f2e65\"\n }",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/oauth2_controller.js",
    "groupTitle": "Auth",
    "error": {
      "fields": {
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "InternalAPIServerError",
            "description": "<p>Something is broken.</p>"
          }
        ],
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnauthorizedError",
            "description": "<p>You are unauthorized for this action.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "InternalAPIServerError:",
          "content": "HTTP/1.1 500 InternalAPIServerError\n  {\n  \t\"error\": \"Something is broken.\",\n  \t\"id\": \"internal_server_error\"\n  }",
          "type": "json"
        },
        {
          "title": "Unauthorized:",
          "content": "HTTP/1.1 401 Unauthorized\n  Unauthorized",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/v1/users",
    "title": "Get list of users",
    "version": "1.0.0",
    "name": "GetUsers",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "defaultValue": "20",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "users",
            "description": "<p>List of users.</p>"
          },
          {
            "group": "Success 200",
            "type": "id",
            "optional": false,
            "field": "users.id",
            "description": "<p>User's id.</p>"
          },
          {
            "group": "Success 200",
            "type": "email",
            "optional": false,
            "field": "users.email",
            "description": "<p>User's email.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n [{\n   \"id\": \"1\",\n   \"email\": \"mail@mail.com\"\n }]",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/v1/users_controller.js",
    "groupTitle": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>[Required] Access Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"Bearer 6e6ba10f023e19bfca7353e2832d65529369943751e42ac6e7df34e530579d52\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "InternalAPIServerError",
            "description": "<p>Something is broken.</p>"
          }
        ],
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnauthorizedError",
            "description": "<p>You are unauthorized for this action.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "InternalAPIServerError:",
          "content": "HTTP/1.1 500 InternalAPIServerError\n  {\n  \t\"error\": \"Something is broken.\",\n  \t\"id\": \"internal_server_error\"\n  }",
          "type": "json"
        },
        {
          "title": "Unauthorized:",
          "content": "HTTP/1.1 401 Unauthorized\n  Unauthorized",
          "type": "json"
        }
      ]
    }
  }
] });
