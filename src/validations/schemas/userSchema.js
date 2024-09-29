export const userSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 5,
      maxLength: 50,
    },
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 8,
      maxLength: 20,
    },
    role: {
      type: 'string',
      enum: ['admin', 'lector', 'usuario'],
    },
  },
  anyOf: [
    {
      required: ['email', 'password'],
    },
    {
      required: ['name', 'email', 'password'],
    },
    {
      required: ['name', 'email', 'password', 'role'],
    },
  ],
  additionalProperties: false,
};
// export const userSchema = {
//   $schema: 'http://json-schema.org/draft-07/schema#',
//   type: 'object',
//   properties: {
//     correo: {
//       type: 'string',
//       format: 'email',
//     },
//     contraseña: {
//       type: 'string',
//       minLength: 8,
//       maxLength: 20,
//     },
//   },
//   required: ['correo', 'contraseña'],
//   additionalProperties: false,
// };
