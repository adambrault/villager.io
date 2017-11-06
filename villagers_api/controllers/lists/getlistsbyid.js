'use strict';

const Joi = require('joi');
const Boom = require('boom');

module.exports = {
    description: 'Returns items in list by id',
    tags: ['api', 'users'],
    validate: {
        params:{
            id: Joi.string().guid().required()
        } 
    },
    auth: false,  
    handler: async function (request, reply) {
        let exist = await this.db.lists.findOne({id: request.params.id});
        if (!exist) {
            throw Boom.notFound();
        }
        let foundlist = await this.db.list_items.by_list_id({id: request.params.id});
        
        return reply(foundlist);
    }
  };