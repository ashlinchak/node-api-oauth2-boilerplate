/**
* @apiDefine ResourceNotFoundError
* @apiError (Error 4xx) ResourceNotFoundError The resource you were accessing cannot be found.
* @apiErrorExample {json} ResourceNotFoundError:
*   HTTP/1.1 404 Not Found
*     {
*       "error": "The resource you were accessing cannot be found."
*       "id": "not_found"
*     }
**/

/**
* @apiDefine BadRequestError
* @apiError (Error 4xx) BadRequestError The request was invalid or cannot be otherwise served.
* @apiErrorExample {json} BadRequestError:
*   HTTP/1.1 400 Bad Request
*     {
*       "error": "The request was invalid or cannot be otherwise served."
*       "id": "bad_request"
*     }
**/

/**
* @apiDefine UnauthorizedError
* @apiError (Error 4xx) UnauthorizedError You are unauthorized for this action.
* @apiErrorExample {json} Unauthorized:
* HTTP/1.1 401 Unauthorized
*   Unauthorized
**/

/**
* @apiDefine ForbiddenError
* @apiError (Error 4xx) ForbiddenError You do not have access for the attempted action.
* @apiErrorExample {json} ForbiddenError:
*   HTTP/1.1 403 ForbiddenError
*     {
*       "error": "You do not have access for the attempted action."
*       "id": "forbidden"
*     }
**/

/**
* @apiDefine InternalAPIServerError
* @apiError (Error 5xx) InternalAPIServerError Something is broken.
* @apiErrorExample {json} InternalAPIServerError:
*   HTTP/1.1 500 InternalAPIServerError
*     {
*     	"error": "Something is broken.",
*     	"id": "internal_server_error"
*     }
**/

// Headers

/**
* @apiDefine AuthorizationByAccessToken
* @apiHeader {String} Authorization [Required] Access Token.
* @apiHeaderExample {json} Header-Example:
*     {
*       "Authorization": "Bearer 6e6ba10f023e19bfca7353e2832d65529369943751e42ac6e7df34e530579d52"
*     }
**/
