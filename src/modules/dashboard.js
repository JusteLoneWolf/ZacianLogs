const express = require("express"),
    dashboard = express(),
    path = require("path"),
    passport = require("passport"),
    Strategy = require("passport-discord").Strategy,
    session = require("express-session"),
    MemoryStore = require("memorystore")(session);

module.exports = async client => {

    const dashboardDir = path.resolve(`${process.cwd()}${path.sep}src${path.sep}web`);
    const templateDir = path.resolve(`${dashboardDir}${path.sep}template`);
    dashboard.use("/public", express.static(path.resolve(`${dashboardDir}${path.sep}public`)));

    passport.use(new Strategy({
            clientID: client.fetchApplication().then((data) => data.id),
            clientSecret: client.web.oauthSecret,
            callbackURL: client.web.callbackURL,
            application: await client.fetchApplication().then((data) => data),
            scope: ["identity", "guilds"]
        },
        (accesToken, refreshToken, profile, done) => {
            process.nextTick(() => done(null, profile))
        }
    ));

    dashboard.use(session({
        store: new MemoryStore({
            checkPeriod: 99999999
        }),
        secret: client.web.sSecret,
        resave: false,
        saveUninitialized: false,
    }));

    dashboard.use(passport.initialize());
    dashboard.use(passport.session());
    dashboard.engine("html', require("ejs").renderFile);
    dashboard.set("view engine", "html');

    const renderTemplate = (res, req, template, data = {}) => {
        const baseData = {
            bot: client,
            path: req.path,
            user: req.isAuthenticated() ? req.user : null,
            moment: require("moment")
        };
        res.render(
            path.resolve(`${templateDir}${path.sep}${template}`),
            Object.assign(baseData, data)
        )
    };

    dashboard.get("/", (req, res) => {
        renderTemplate(res, req, "home.ejs")
    });
    dashboard.get("/commands", (req, res) => {
        renderTemplate(res, req, "command.ejs")
    });
    dashboard.get("/stats", (req, res) => {
        renderTemplate(res, req, "stats.ejs")
    });
    dashboard.get("/", (req, res) => {
        renderTemplate(res, req, "stats.ejs")
    });
    dashboard.get("/login", (req, res, next) => {
            req.session.backURL = "/";
            next();
        },
        passport.authenticate("discord")
    );
    dashboard.get("/callback", passport.authenticate("discord"), (req, res) => {
        res.redirect("/");
    });
    dashboard.get("/logout", (req, res) => {
        req.session.destroy(() => {
            req.logout();
            res.redirect("/");
        });
    });

    client.dash = dashboard.listen(client.web.port)
};
