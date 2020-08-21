import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from "graphql";
import { User } from "../../models";
import to from 'await-to-js';

export class IsHODDirective extends SchemaDirectiveVisitor {
    public visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field;
        field.resolve = async function(...args) {
          let userInfo;
          [, {}, {user: userInfo}] = args;
          if(!userInfo){
            throw new Error('User not authenticated');
          }
    
          let err, authUser;
          [err, authUser] = await to(User.findOne({where: {id: userInfo.id}}));
          if(!authUser){
             throw new Error('JWT token received, User not found, and not authenticated');
          }
          if (authUser.role !== 'HOD'){
              throw new Error("Person not HOD");
          }
          args[2].authUser = authUser;
          return resolve.apply(this, args);
        };
      }
}

export class IsDQADirective extends SchemaDirectiveVisitor {
    public visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field;
        field.resolve = async function(...args) {
          let userInfo;
          [, {}, {user: userInfo}] = args;
          if(!userInfo){
            throw new Error('User not authenticated');
          }
    
          let err, authUser;
          [err, authUser] = await to(User.findOne({where: {id: userInfo.id}}));
          if(!authUser){
             throw new Error('JWT token received, User not found, and not authenticated');
          }
          if (authUser.role !== 'DQA'){
              throw new Error("Person not DQA");
          }
          args[2].authUser = authUser;
          return resolve.apply(this, args);
        };
      }
}

export class IsAdminDirective extends SchemaDirectiveVisitor {
    public visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field;
        field.resolve = async function(...args) {
          let userInfo;
          [, {}, {user: userInfo}] = args;
          if(!userInfo){
            throw new Error('User not authenticated');
          }
    
          let err, authUser;
          [err, authUser] = await to(User.findOne({where: {id: userInfo.id}}));
          if(!authUser){
             throw new Error('JWT token received, User not found, and not authenticated');
          }
          if (authUser.role !== 'ADMIN'){
              throw new Error("Person not ADMIN");
          }
          args[2].authUser = authUser;
          return resolve.apply(this, args);
        };
      }
  }