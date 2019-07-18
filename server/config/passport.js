import { Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { ExtractJwt } from "passport-jwt";
import User from "../models/User";
import mongoose from "../lib/mongoose";

const configPassport = async passport => {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.SECRET_OR_KEY;

  console.log("your in passport config");

  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      await mongoose();
      User.findById(jwt_payload.id)
        .then(user => {
          console.log(user);
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};

export default configPassport;
