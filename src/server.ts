import { MikroORM } from "@mikro-orm/core";
import { User } from "./modules/user/user.entity.js";

const orm = await MikroORM.init();

await orm.schema.refreshDatabase();

const user = new User();
user.email = "foo@bar.com";
user.fullName = "Foo Bar";
user.password = "123456";

const em = orm.em.fork();

await em.persist(user).flush();

console.log("User id is: ", user.id);

const myUser = await em.findOne(User, user.id);
console.log("Users are the same? ", user === myUser);

user.bio = "...";
await em.flush();

const em2 = em.fork();
console.log("Verify the EM ids are different", em.id, em2.id);
const myUser2 = await em2.findOneOrFail(User, user.id);
console.log(
  "Users are no longer the same, as they came from different EM: ",
  user === myUser2
);

myUser2.bio = "changed";

await em2.refresh(myUser2);
console.log("Changes are lost", myUser2);

myUser2!.bio = "Some change, will be saved";
await em2.flush();

await em2.remove(myUser2).flush();

await orm.close();
